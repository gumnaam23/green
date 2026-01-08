import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

// Task schema (we'll define it here since we don't have a separate model)
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: String,
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  category: String,
  status: { type: String, enum: ['planning', 'pending', 'in_progress', 'completed'] },
  dueDate: Date,
  location: String,
  progress: { type: Number, default: 0 },
  estimatedHours: Number,
  dependencies: String,
  notes: String
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignee = searchParams.get('assignee');
    const search = searchParams.get('search');

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by priority if provided
    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    // Filter by assignee if provided
    if (assignee && assignee !== 'all') {
      query.assignee = assignee;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { assignee: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Task.countDocuments(query);

    // Calculate statistics
    const stats = {
      totalTasks: total,
      completedTasks: await Task.countDocuments({ ...query, status: 'completed' }),
      pendingTasks: await Task.countDocuments({ ...query, status: 'pending' }),
      inProgressTasks: await Task.countDocuments({ ...query, status: 'in_progress' }),
      highPriorityTasks: await Task.countDocuments({ ...query, priority: 'high' }),
      overdueTasks: await Task.countDocuments({
        ...query,
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' }
      })
    };

    return NextResponse.json({
      tasks: tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        priority: task.priority,
        category: task.category,
        status: task.status,
        dueDate: task.dueDate,
        location: task.location,
        progress: task.progress || 0,
        estimatedHours: task.estimatedHours,
        dependencies: task.dependencies,
        notes: task.notes,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
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
    console.error('Admin tasks API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch tasks", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const task = await Task.create(body);

    return NextResponse.json({ success: true, data: task });

  } catch (error) {
    console.error('Admin tasks POST error:', error);
    return NextResponse.json(
      { message: "Failed to create task", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task });

  } catch (error) {
    console.error('Admin tasks PUT error:', error);
    return NextResponse.json(
      { message: "Failed to update task", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin tasks DELETE error:', error);
    return NextResponse.json(
      { message: "Failed to delete task", error: error.message },
      { status: 500 }
    );
  }
}
