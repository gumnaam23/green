import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Volunteer from "@/models/Volunteer";
import VolunteerOpportunity from "@/models/VolunteerOpportunity";
import VolunteerTestimonial from "@/models/VolunteerTestimonial";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let data;

    switch (type) {
      case 'opportunities':
        data = await VolunteerOpportunity.find().sort({ createdAt: -1 }).lean();
        break;
      case 'testimonials':
        data = await VolunteerTestimonial.find().sort({ createdAt: -1 }).lean();
        break;
      case 'summaries':
        // Calculate volunteer program summaries
        const totalVolunteers = await Volunteer.countDocuments();
        const activeVolunteers = await Volunteer.countDocuments({ hours: { $gt: 0 } });
        const volunteerHoursResult = await Volunteer.aggregate([
          { $group: { _id: null, total: { $sum: '$hours' } } }
        ]);
        const treesPlantedResult = await Volunteer.aggregate([
          { $group: { _id: null, total: { $sum: '$treesPlanted' } } }
        ]);

        // Get unique cities from volunteers
        const citiesResult = await Volunteer.distinct('city');
        const citiesCovered = citiesResult.length;

        data = {
          totalVolunteers,
          activeVolunteers,
          volunteerHours: volunteerHoursResult[0]?.total || 0,
          treesPlantedByVolunteers: treesPlantedResult[0]?.total || 0,
          citiesCovered,
          // Placeholder values for now (can be updated based on actual data)
          upcomingEvents: 5,
          trainingCompleted: Math.floor(totalVolunteers * 0.7),
          awardsGiven: Math.floor(totalVolunteers * 0.2)
        };
        break;
      case 'volunteers':
      default:
        data = await Volunteer.find().sort({ createdAt: -1 }).lean();
        break;
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Admin volunteers API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch volunteer data", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { type, ...data } = body;

    let result;

    switch (type) {
      case 'opportunity':
        result = await VolunteerOpportunity.create(data);
        break;
      case 'testimonial':
        result = await VolunteerTestimonial.create(data);
        break;
      case 'volunteer':
      default:
        result = await Volunteer.create(data);
        break;
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Admin volunteers POST error:', error);
    return NextResponse.json(
      { message: "Failed to create volunteer data", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { type, id, ...updateData } = body;

    let result;

    switch (type) {
      case 'opportunity':
        result = await VolunteerOpportunity.findByIdAndUpdate(id, updateData, { new: true });
        break;
      case 'testimonial':
        result = await VolunteerTestimonial.findByIdAndUpdate(id, updateData, { new: true });
        break;
      case 'volunteer':
      default:
        result = await Volunteer.findByIdAndUpdate(id, updateData, { new: true });
        break;
    }

    if (!result) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Admin volunteers PUT error:', error);
    return NextResponse.json(
      { message: "Failed to update volunteer data", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    let result;

    switch (type) {
      case 'opportunity':
        result = await VolunteerOpportunity.findByIdAndDelete(id);
        break;
      case 'testimonial':
        result = await VolunteerTestimonial.findByIdAndDelete(id);
        break;
      case 'volunteer':
      default:
        result = await Volunteer.findByIdAndDelete(id);
        break;
    }

    if (!result) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin volunteers DELETE error:', error);
    return NextResponse.json(
      { message: "Failed to delete volunteer data", error: error.message },
      { status: 500 }
    );
  }
}
