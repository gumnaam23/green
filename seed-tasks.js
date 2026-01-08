require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { connectDB } = require('./lib/db');

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

async function seedTasks() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Sample tasks data
    const tasksData = [
      {
        title: 'Conduct environmental survey for Swat Valley',
        description: 'Complete environmental impact assessment and soil testing for new plantation site in Swat Valley.',
        assignee: 'Dr. Sarah Ahmed',
        priority: 'high',
        category: 'survey',
        status: 'pending',
        dueDate: new Date('2024-01-15'),
        location: 'Swat Valley',
        progress: 0,
        estimatedHours: 40,
        dependencies: 'Site approval from local authorities',
        notes: 'Need specialized equipment for soil testing'
      },
      {
        title: 'Plant 500 trees in Margalla Hills',
        description: 'Organize volunteer planting event for 500 neem and kikar trees in Margalla Hills National Park.',
        assignee: 'Ahmed Khan',
        priority: 'medium',
        category: 'plantation',
        status: 'in_progress',
        dueDate: new Date('2024-01-20'),
        location: 'Margalla Hills',
        progress: 65,
        estimatedHours: 80,
        dependencies: 'Equipment and volunteer coordination',
        notes: 'Weather-dependent activity'
      },
      {
        title: 'Maintain irrigation systems in Karachi coastal area',
        description: 'Check and repair irrigation systems for 2000 trees planted in Karachi coastal restoration project.',
        assignee: 'Maintenance Team',
        priority: 'high',
        category: 'maintenance',
        status: 'completed',
        dueDate: new Date('2024-01-10'),
        location: 'Karachi Coastal Area',
        progress: 100,
        estimatedHours: 60,
        dependencies: 'Access to maintenance equipment',
        notes: 'Completed ahead of schedule'
      },
      {
        title: 'Train 50 new volunteers',
        description: 'Conduct training session for 50 new volunteers joining the Lahore urban plantation project.',
        assignee: 'Training Team',
        priority: 'medium',
        category: 'training',
        status: 'pending',
        dueDate: new Date('2024-01-25'),
        location: 'Lahore',
        progress: 0,
        estimatedHours: 30,
        dependencies: 'Training materials preparation',
        notes: 'Include safety and tree care modules'
      },
      {
        title: 'Purchase planting equipment',
        description: 'Procure new planting tools and equipment for upcoming plantation drives in Punjab region.',
        assignee: 'Procurement Team',
        priority: 'low',
        category: 'procurement',
        status: 'pending',
        dueDate: new Date('2024-02-01'),
        location: 'Multiple Sites',
        progress: 20,
        estimatedHours: 20,
        dependencies: 'Budget approval',
        notes: 'Focus on eco-friendly tools'
      },
      {
        title: 'Monitor tree survival in Hunza Valley',
        description: 'Conduct survival rate assessment for 2000 trees planted in Hunza Valley during last monsoon season.',
        assignee: 'Monitoring Team',
        priority: 'high',
        category: 'monitoring',
        status: 'in_progress',
        dueDate: new Date('2024-01-18'),
        location: 'Hunza Valley',
        progress: 40,
        estimatedHours: 50,
        dependencies: 'Transportation to remote areas',
        notes: 'Document findings with photos'
      },
      {
        title: 'Organize community awareness event',
        description: 'Plan and execute community awareness event about environmental conservation in Islamabad.',
        assignee: 'Events Team',
        priority: 'medium',
        category: 'outreach',
        status: 'planning',
        dueDate: new Date('2024-01-30'),
        location: 'Islamabad',
        progress: 10,
        estimatedHours: 45,
        dependencies: 'Venue booking and permits',
        notes: 'Target school children and local community'
      },
      {
        title: 'Update website with new plantation data',
        description: 'Update the website with latest plantation statistics and new location information.',
        assignee: 'Web Team',
        priority: 'low',
        category: 'administrative',
        status: 'pending',
        dueDate: new Date('2024-01-22'),
        location: 'Online',
        progress: 0,
        estimatedHours: 25,
        dependencies: 'Latest statistics from field teams',
        notes: 'Include interactive maps and charts'
      },
      {
        title: 'Coordinate with local government in Balochistan',
        description: 'Meet with local authorities in Quetta to discuss collaboration on desert restoration project.',
        assignee: 'Government Liaison',
        priority: 'high',
        category: 'coordination',
        status: 'pending',
        dueDate: new Date('2024-01-28'),
        location: 'Quetta',
        progress: 5,
        estimatedHours: 15,
        dependencies: 'Appointment scheduling',
        notes: 'Prepare presentation materials'
      },
      {
        title: 'Prepare monthly progress report',
        description: 'Compile and prepare comprehensive monthly progress report for all plantation activities.',
        assignee: 'Reporting Team',
        priority: 'medium',
        category: 'reporting',
        status: 'in_progress',
        dueDate: new Date('2024-01-31'),
        location: 'Head Office',
        progress: 75,
        estimatedHours: 35,
        dependencies: 'Data collection from all field teams',
        notes: 'Include financial summary and impact metrics'
      }
    ];

    // Insert tasks into database
    const insertedTasks = await Task.insertMany(tasksData);
    console.log(`✅ Successfully inserted ${insertedTasks.length} tasks into database`);

    // Display inserted tasks
    insertedTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} - ${task.assignee} (${task.status})`);
    });

    console.log('\n🎉 All tasks have been seeded successfully!');
    console.log('You can now view them at: http://localhost:3001/admin/tasks');

  } catch (error) {
    console.error('❌ Error seeding tasks:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeder
seedTasks();
