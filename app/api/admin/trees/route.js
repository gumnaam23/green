import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tree from "@/models/Tree";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { location: { $regex: search, $options: 'i' } },
        { species: { $regex: search, $options: 'i' } },
        { projectLead: { $regex: search, $options: 'i' } },
        { projectCode: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const trees = await Tree.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Tree.countDocuments(query);

    // Calculate stats
    const totalTrees = await Tree.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    const plantedTrees = await Tree.aggregate([
      { $match: { ...query, status: 'planted' } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    const pendingTrees = await Tree.aggregate([
      { $match: { ...query, status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    const stats = {
      totalTrees: totalTrees[0]?.total || 0,
      plantedTrees: plantedTrees[0]?.total || 0,
      pendingTrees: pendingTrees[0]?.total || 0,
      totalProjects: total,
      averageSurvivalRate: 87.5 // Placeholder
    };

    return NextResponse.json({
      trees: trees.map(tree => ({
        id: tree._id,
        projectCode: tree.projectCode,
        location: tree.location,
        coordinates: tree.coordinates,
        species: tree.species,
        count: tree.count,
        plantingDate: tree.plantingDate,
        status: tree.status,
        survivalRate: tree.survivalRate,
        volunteers: tree.volunteers,
        projectLead: tree.projectLead,
        photos: tree.photos,
        impact: tree.impact,
        createdAt: tree.createdAt,
        updatedAt: tree.updatedAt
      })),
      stats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Admin trees API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch trees", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate project code if not provided
    if (!body.projectCode) {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      body.projectCode = `TREE-${timestamp}-${random}`;
    }

    // Calculate impact if not provided
    if (!body.impact && body.count) {
      const count = parseInt(body.count);
      body.impact = {
        co2Absorbed: count * 20, // 20kg CO2 per tree per year
        oxygenProduced: count * 118, // 118kg oxygen per tree per year
        waterFiltered: count * 100, // 100L water filtered per tree per year
        biodiversityIndex: count * 0.5 // Biodiversity index
      };
    }

    // Set default values
    if (!body.status) body.status = 'planted';
    if (!body.survivalRate) body.survivalRate = 85;
    if (!body.photos) body.photos = 0;

    const tree = await Tree.create(body);

    return NextResponse.json({ success: true, data: tree });

  } catch (error) {
    console.error('Admin trees POST error:', error);
    return NextResponse.json(
      { message: "Failed to create tree", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    const tree = await Tree.findByIdAndUpdate(id, updateData, { new: true });

    if (!tree) {
      return NextResponse.json(
        { message: "Tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tree });

  } catch (error) {
    console.error('Admin trees PUT error:', error);
    return NextResponse.json(
      { message: "Failed to update tree", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const tree = await Tree.findByIdAndDelete(id);

    if (!tree) {
      return NextResponse.json(
        { message: "Tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin trees DELETE error:', error);
    return NextResponse.json(
      { message: "Failed to delete tree", error: error.message },
      { status: 500 }
    );
  }
}
