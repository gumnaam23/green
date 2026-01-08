"use client";

import {
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  User,
  Calendar,
  MapPin,
  Trees,
  Download,
  CheckSquare,
  Square,
  TrendingUp,
  ShoppingCart,
  Users,
  FileText,
  Handshake,
  BarChart3
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TasksManagementPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter, assigneeFilter, searchTerm, currentPage]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        status: statusFilter,
        priority: priorityFilter,
        assignee: assigneeFilter,
        search: searchTerm
      });

      const response = await fetch(`/api/admin/tasks?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.tasks || []);
      setTotalPages(data.pagination?.totalPages || 1);

    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const getMockTasks = () => [
    {
      id: 1,
      title: 'Conduct environmental survey for Swat Valley',
      description: 'Complete environmental impact assessment and soil testing for new plantation site in Swat Valley.',
      status: 'pending',
      priority: 'high',
      assignee: 'Dr. Sarah Ahmed',
      dueDate: '2024-01-15',
      location: 'Swat Valley',
      category: 'survey',
      progress: 0,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Plant 500 trees in Margalla Hills',
      description: 'Organize volunteer planting event for 500 neem and kikar trees in Margalla Hills National Park.',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Ahmed Khan',
      dueDate: '2024-01-20',
      location: 'Margalla Hills',
      category: 'plantation',
      progress: 65,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'Maintain irrigation systems in Karachi coastal area',
      description: 'Check and repair irrigation systems for 2000 trees planted in Karachi coastal restoration project.',
      status: 'completed',
      priority: 'high',
      assignee: 'Maintenance Team',
      dueDate: '2024-01-10',
      location: 'Karachi Coastal Area',
      category: 'maintenance',
      progress: 100,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-09'
    },
    {
      id: 4,
      title: 'Train 50 new volunteers',
      description: 'Conduct training session for 50 new volunteers joining the Lahore urban plantation project.',
      status: 'pending',
      priority: 'medium',
      assignee: 'Training Team',
      dueDate: '2024-01-25',
      location: 'Lahore',
      category: 'training',
      progress: 0,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: 5,
      title: 'Purchase planting equipment',
      description: 'Procure new planting tools and equipment for upcoming plantation drives in Punjab region.',
      status: 'pending',
      priority: 'low',
      assignee: 'Procurement Team',
      dueDate: '2024-02-01',
      location: 'Multiple Sites',
      category: 'procurement',
      progress: 20,
      createdAt: '2024-01-06',
      updatedAt: '2024-01-11'
    },
    {
      id: 6,
      title: 'Monitor tree survival in Hunza Valley',
      description: 'Conduct survival rate assessment for 2000 trees planted in Hunza Valley during last monsoon season.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Monitoring Team',
      dueDate: '2024-01-18',
      location: 'Hunza Valley',
      category: 'monitoring',
      progress: 40,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13'
    },
    {
      id: 7,
      title: 'Organize community awareness event',
      description: 'Plan and execute community awareness event about environmental conservation in Islamabad.',
      status: 'planning',
      priority: 'medium',
      assignee: 'Events Team',
      dueDate: '2024-01-30',
      location: 'Islamabad',
      category: 'outreach',
      progress: 10,
      createdAt: '2024-01-07',
      updatedAt: '2024-01-07'
    },
    {
      id: 8,
      title: 'Update website with new plantation data',
      description: 'Update the website with latest plantation statistics and new location information.',
      status: 'pending',
      priority: 'low',
      assignee: 'Web Team',
      dueDate: '2024-01-22',
      location: 'Online',
      category: 'administrative',
      progress: 0,
      createdAt: '2024-01-09',
      updatedAt: '2024-01-09'
    },
    {
      id: 9,
      title: 'Coordinate with local government in Balochistan',
      description: 'Meet with local authorities in Quetta to discuss collaboration on desert restoration project.',
      status: 'pending',
      priority: 'high',
      assignee: 'Government Liaison',
      dueDate: '2024-01-28',
      location: 'Quetta',
      category: 'coordination',
      progress: 5,
      createdAt: '2024-01-04',
      updatedAt: '2024-01-10'
    },
    {
      id: 10,
      title: 'Prepare monthly progress report',
      description: 'Compile and prepare comprehensive monthly progress report for all plantation activities.',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Reporting Team',
      dueDate: '2024-01-31',
      location: 'Head Office',
      category: 'reporting',
      progress: 75,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'planning': return <Calendar className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'plantation': return <Trees className="h-4 w-4" />;
      case 'survey': return <Search className="h-4 w-4" />;
      case 'maintenance': return <CheckSquare className="h-4 w-4" />;
      case 'training': return <User className="h-4 w-4" />;
      case 'monitoring': return <TrendingUp className="h-4 w-4" />;
      case 'procurement': return <ShoppingCart className="h-4 w-4" />;
      case 'outreach': return <Users className="h-4 w-4" />;
      case 'administrative': return <FileText className="h-4 w-4" />;
      case 'coordination': return <Handshake className="h-4 w-4" />;
      case 'reporting': return <BarChart3 className="h-4 w-4" />;
      default: return <Square className="h-4 w-4" />;
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleAllTasks = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length
        ? []
        : tasks.map(task => task.id)
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks Management</h1>
          <p className="text-gray-600">Manage and track all plantation project tasks</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/tasks/add"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks by title, description, assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="planning">Planning</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Assignees</option>
            <option value="Dr. Sarah Ahmed">Dr. Sarah Ahmed</option>
            <option value="Ahmed Khan">Ahmed Khan</option>
            <option value="Maintenance Team">Maintenance Team</option>
            <option value="Training Team">Training Team</option>
            <option value="Procurement Team">Procurement Team</option>
            <option value="Monitoring Team">Monitoring Team</option>
            <option value="Events Team">Events Team</option>
            <option value="Web Team">Web Team</option>
            <option value="Government Liaison">Government Liaison</option>
            <option value="Reporting Team">Reporting Team</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckSquare className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Mark Complete
              </button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                Change Priority
              </button>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Tasks</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAllTasks}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className={`p-6 hover:bg-gray-50 ${selectedTasks.includes(task.id) ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-start mr-4">
                    <div className={`p-2 rounded-full ${task.status === 'completed' ? 'bg-green-100' : task.status === 'in_progress' ? 'bg-blue-100' : task.status === 'pending' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                      {getStatusIcon(task.status)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {task.assignee}
                      </span>
                      <span className="flex items-center">
                        <Calendar className={`h-3 w-3 mr-1 ${isOverdue(task.dueDate) ? 'text-red-500' : ''}`} />
                        Due: {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate) && <span className="text-red-500 ml-1">(Overdue)</span>}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {task.location}
                      </span>
                      <span className="flex items-center">
                        {getCategoryIcon(task.category)}
                        <span className="ml-1 capitalize">{task.category}</span>
                      </span>
                    </div>

                    {task.status !== 'completed' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">{task.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        Created: {formatDate(task.createdAt)} • Updated: {formatDate(task.updatedAt)}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, tasks.length)} of {tasks.length} tasks
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
