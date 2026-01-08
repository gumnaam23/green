import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Location from "@/models/Location";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const province = searchParams.get('province');
    const search = searchParams.get('search');

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by province if provided
    if (province && province !== 'all') {
      query.province = province;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { province: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const locations = await Location.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Location.countDocuments(query);

    // Calculate stats
    const stats = {
      totalLocations: total,
      activeLocations: await Location.countDocuments({ ...query, status: 'active' }),
      plannedLocations: await Location.countDocuments({ ...query, status: 'planned' }),
      totalTrees: await Location.aggregate([
        { $match: query },
        { $group: { _id: null, total: { $sum: '$trees' } } }
      ]).then(result => result[0]?.total || 0),
      totalVolunteers: await Location.aggregate([
        { $match: query },
        { $group: { _id: null, total: { $sum: '$volunteers' } } }
      ]).then(result => result[0]?.total || 0),
      provincesCount: await Location.distinct('province', query).then(result => result.length)
    };

    // Get province distribution
    const provinceDistribution = await Location.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$province',
          locations: { $sum: 1 },
          trees: { $sum: '$trees' }
        }
      },
      { $sort: { locations: -1 } }
    ]);

    return NextResponse.json({
      locations: locations.map(location => ({
        id: location._id,
        name: location.name,
        province: location.province,
        trees: location.trees || 0,
        status: location.status || 'planned',
        volunteers: location.volunteers || 0,
        progress: location.completion || 0,
        type: location.type || 'plantation',
        impact: location.impact || 'High environmental impact',
        images: location.images || 0,
        isFeatured: location.isFeatured || false,
        createdAt: location.createdAt,
        updatedAt: location.updatedAt
      })),
      stats,
      provinceDistribution,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Admin locations API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch locations", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const location = await Location.create(body);

    return NextResponse.json({ success: true, data: location });

  } catch (error) {
    console.error('Admin locations POST error:', error);
    return NextResponse.json(
      { message: "Failed to create location", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    const location = await Location.findByIdAndUpdate(id, updateData, { new: true });

    if (!location) {
      return NextResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: location });

  } catch (error) {
    console.error('Admin locations PUT error:', error);
    return NextResponse.json(
      { message: "Failed to update location", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      return NextResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin locations DELETE error:', error);
    return NextResponse.json(
      { message: "Failed to delete location", error: error.message },
      { status: 500 }
    );
  }
}
