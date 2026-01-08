"use client";

import { 
  Clock, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  CheckCircle,
  Filter,
  Search,
  Plus,
  Download,
  Share2,
  Eye,
  ChevronDown,
  ArrowRight,
  ChevronUp,
  DollarSign,
  Trees,
  Star,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PendingTasksPage() {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);



  

  const pendingTasksData = {
    summary: {
      totalTasks: 42,
      highPriority: 12,
      mediumPriority: 18,
      lowPriority: 12,
      upcomingDeadlines: 8,
      estimatedCost: 25_000_000,
      estimatedTrees: 50_000,
      volunteersNeeded: 1_200,
    },
    tasks: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      taskCode: `TASK-${2024}-${(i + 100).toString().padStart(3, '0')}`,
      title: [
        "Margalla Hills Phase 3 Plantation",
        "Karachi Coastal Mangrove Restoration",
        "Lahore Urban Green Belt Expansion",
        "Swat Valley Reforestation Project",
        "Thar Desert Greening Initiative",
        "Islamabad City Parks Enhancement",
        "Peshawar Green Corridor Development",
        "Quetta Water Conservation Project",
        "Gilgit-Baltistan Alpine Forest",
        "Multan Fruit Tree Plantation"
      ][i % 10],
      location: [
        "Margalla Hills, Islamabad",
        "Karachi Coastal Area, Sindh",
        "Lahore, Punjab",
        "Swat Valley, KPK",
        "Thar Desert, Sindh",
        "Islamabad Capital Territory",
        "Peshawar, KPK",
        "Quetta, Balochistan",
        "Gilgit, Gilgit-Baltistan",
        "Multan, Punjab"
      ][i % 10],
      priority: ["high", "medium", "low"][i % 3],
      status: ["planning", "funding", "volunteer-recruitment", "scheduled"][i % 4],
      targetTrees: [4020, 8500, 6200, 9300, 7800, 5400, 6800, 9100, 7600, 8200][i % 10],
      estimatedCost: [2500000, 1800000, 3200000, 4500000, 2800000, 2100000, 3900000, 3600000, 2700000, 4100000][i % 10],
      deadline: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      volunteersNeeded: [350, 420, 280, 510, 380, 290, 440, 320, 390, 460][i % 10],
      volunteersRegistered: [120, 180, 95, 220, 150, 110, 190, 140, 160, 200][i % 10],
      progress: [25, 45, 30, 60, 40, 20, 50, 35, 55, 15][i % 10],
      description: "This project aims to restore native vegetation and create sustainable ecosystems while engaging local communities in conservation efforts.",
      challenges: [
        "Water availability in arid regions",
        "Community mobilization",
        "Funding constraints",
        "Logistical challenges"
      ][i % 4],
      nextSteps: [
        { step: "Finalize funding", status: "in-progress", deadline: "2024-02-15" },
        { step: "Community meetings", status: "pending", deadline: "2024-02-20" },
        { step: "Volunteer training", status: "not-started", deadline: "2024-02-25" },
      ],
      impact: {
        co2Reduction: [1500, 2200, 1800, 3100, 2600, 1900, 2800, 2400, 2100, 3300][i % 10],
        jobsCreated: [45, 65, 35, 85, 55, 40, 70, 50, 60, 75][i % 10],
        communitiesImpacted: [3, 5, 2, 7, 4, 3, 6, 4, 5, 8][i % 10],
      }
    }))
  };

  const filteredTasks = pendingTasksData.tasks.filter(task => {
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'funding': return 'bg-purple-100 text-purple-800';
      case 'volunteer-recruitment': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'planning': return 'Planning Phase';
      case 'funding': return 'Awaiting Funding';
      case 'volunteer-recruitment': return 'Recruiting Volunteers';
      case 'scheduled': return 'Scheduled';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Pending Plantation Tasks</h1>
              <p className="text-orange-100 max-w-3xl">
                Track upcoming plantation projects, monitor progress, and contribute to pending initiatives.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <Link 
                href="/donate" 
                className="bg-white hover:bg-gray-100 text-orange-700 font-bold px-6 py-3 rounded-lg flex items-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Fund a Task
              </Link>
              <Link 
                href="/volunteers" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center"
              >
                <Users className="h-5 w-5 mr-2" />
                Volunteer Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              label: "Total Pending Tasks", 
              value: pendingTasksData.summary.totalTasks, 
              icon: Clock, 
              color: "orange",
              trend: "+5 this month"
            },
            { 
              label: "High Priority Tasks", 
              value: pendingTasksData.summary.highPriority, 
              icon: AlertCircle, 
              color: "red",
              trend: "Urgent attention needed"
            },
            { 
              label: "Estimated Trees", 
              value: pendingTasksData.summary.estimatedTrees.toLocaleString(), 
              icon: Trees, 
              color: "green",
              trend: "50K+ target"
            },
            { 
              label: "Funding Required", 
              value: `PKR ${(pendingTasksData.summary.estimatedCost / 1000000).toFixed(1)}M`, 
              icon: DollarSign, 
              color: "blue",
              trend: "Funding gap: 35%"
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  stat.color === 'red' ? 'bg-red-100 text-red-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks by title, location, or code..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900 whitespace-nowrap">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[120px]"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
              >
                <option value="all">All Statuses</option>
                <option value="planning">Planning Phase</option>
                <option value="funding">Awaiting Funding</option>
                <option value="volunteer-recruitment">Recruiting Volunteers</option>
                <option value="scheduled">Scheduled</option>
              </select>
              
              <button className="flex items-center text-orange-700 hover:text-orange-800">
                <Download className="h-5 w-5 mr-2" />
                Export Tasks
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredTasks.map((task) => {
            const daysLeft = calculateDaysLeft(task.deadline);
            
            return (
              <div key={task.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                {/* Task Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {task.location}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedTask === task.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Task Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{task.targetTrees.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Target Trees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">PKR {(task.estimatedCost / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-gray-600">Estimated Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{task.volunteersNeeded}</div>
                      <div className="text-sm text-gray-600">Volunteers Needed</div>
                    </div>
                  </div>
                  
                  {/* Progress & Deadline */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress: {task.progress}%</span>
                        <span>Deadline: {formatDate(task.deadline)}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Volunteers Progress */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Volunteers: {task.volunteersRegistered}/{task.volunteersNeeded}</span>
                        <span>{Math.round((task.volunteersRegistered / task.volunteersNeeded) * 100)}% filled</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(task.volunteersRegistered / task.volunteersNeeded) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {expandedTask === task.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">Project Details</h4>
                        <p className="text-gray-700 mb-4">{task.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-gray-900">Main Challenge</div>
                              <div className="text-gray-600">{task.challenges}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-gray-900 mb-2">Expected Impact</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-lg font-bold text-green-600">{task.impact.co2Reduction} tons</div>
                                <div className="text-xs text-gray-600">CO₂ Reduction/year</div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-lg font-bold text-green-600">{task.impact.jobsCreated}</div>
                                <div className="text-xs text-gray-600">Jobs Created</div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-lg font-bold text-green-600">{task.impact.communitiesImpacted}</div>
                                <div className="text-xs text-gray-600">Communities</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">Next Steps</h4>
                        <div className="space-y-3">
                          {task.nextSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                              <div>
                                <div className="font-medium text-gray-900">{step.step}</div>
                                <div className="text-sm text-gray-600">Due: {formatDate(step.deadline)}</div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                step.status === 'completed' ? 'bg-green-100 text-green-800' :
                                step.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {step.status.replace('-', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex space-x-3">
                            <Link 
                              href={`/donate?task=${task.taskCode}`}
                              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg text-center"
                            >
                              Fund This Task
                            </Link>
                            <Link 
                              href={`/volunteers?task=${task.taskCode}`}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center"
                            >
                              Volunteer
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Task Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className={daysLeft < 7 ? 'text-red-600 font-medium' : ''}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-900 p-2">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-2">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Tackle These Challenges?</h2>
            <p className="mb-6 opacity-90">
              Your contribution can help complete these pending projects and create lasting environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-lg flex items-center justify-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Donate to Pending Projects
              </Link>
              <Link 
                href="/volunteers" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg border border-white/30"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h2>
            <Link 
              href="/calendar" 
              className="text-green-700 hover:text-green-800 font-medium flex items-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              View Calendar
            </Link>
          </div>
          
          <div className="space-y-4">
            {filteredTasks
              .filter(task => calculateDaysLeft(task.deadline) <= 30 && calculateDaysLeft(task.deadline) > 0)
              .sort((a, b) => calculateDaysLeft(a.deadline) - calculateDaysLeft(b.deadline))
              .slice(0, 5)
              .map((task) => {
                const daysLeft = calculateDaysLeft(task.deadline);
                
                return (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg mr-4 ${
                        daysLeft <= 7 ? 'bg-red-100 text-red-600' :
                        daysLeft <= 14 ? 'bg-orange-100 text-orange-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.location}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold ${
                        daysLeft <= 7 ? 'text-red-600' :
                        daysLeft <= 14 ? 'text-orange-600' :
                        'text-yellow-600'
                      }`}>
                        {daysLeft} days left
                      </div>
                      <div className="text-sm text-gray-500">Due: {formatDate(task.deadline)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {filteredTasks.filter(task => calculateDaysLeft(task.deadline) <= 30).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <p>No urgent deadlines in the next 30 days. Great work!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
