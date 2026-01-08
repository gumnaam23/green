"use client";

import { 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PendingPlantationsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  const fetchPendingTasks = async () => {
    try {
      setLoading(true);
      // For now, we'll fetch trees with status 'pending' or just show a message
      const response = await fetch('/api/admin/trees?status=pending&page=1&limit=10');
      if (response.ok) {
        const data = await response.json();
        // Transform tree data to match the expected format
        const tasks = data.trees.map(tree => ({
          id: tree.id,
          title: `${tree.location} - ${tree.species}`,
          location: tree.location,
          trees: tree.count,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
          status: 'planning',
          priority: tree.count > 1000 ? 'high' : 'medium',
          volunteers: tree.volunteers || 0,
          progress: 25
        }));
        setPendingTasks(tasks);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = pendingTasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'awaiting-funding': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'volunteer-recruitment': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'planning': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'awaiting-funding': return 'Awaiting Funding';
      case 'volunteer-recruitment': return 'Volunteer Recruitment';
      case 'planning': return 'Planning Phase';
      default: return status;
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

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Plantations</h1>
          <p className="text-gray-600">Manage pending tree plantation tasks</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
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
              placeholder="Search pending tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="awaiting-funding">Awaiting Funding</option>
            <option value="volunteer-recruitment">Volunteer Recruitment</option>
            <option value="planning">Planning Phase</option>
          </select>
          
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-gray-600">Total Pending</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-600">High Priority</div>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">50,000</div>
              <div className="text-gray-600">Trees Target</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-gray-600">Urgent (≤7 days)</div>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg border overflow-hidden mb-6">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Pending Tasks ({filteredTasks.length})</h2>
            <div className="flex space-x-3">
              <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Approve Selected
              </button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                Export List
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y">
          {filteredTasks.map((task) => {
            const daysLeft = calculateDaysLeft(task.deadline);
            
            return (
              <div key={task.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {getStatusText(task.status)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                    <div className="text-gray-600 mt-1">{task.location}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{task.trees.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Target Trees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{task.volunteers}</div>
                    <div className="text-sm text-gray-600">Volunteers Needed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {daysLeft > 0 ? `${daysLeft} days` : 'Overdue'}
                    </div>
                    <div className="text-sm text-gray-600">Deadline: {new Date(task.deadline).toLocaleDateString('en-PK')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{task.progress}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      Edit
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      View Details
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Funding Required</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">PKR 25M</div>
          <div className="text-gray-600 mb-4">Total funding needed for pending tasks</div>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Allocate Funds
          </button>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Volunteer Gap</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">1,200</div>
          <div className="text-gray-600 mb-4">Volunteers needed for pending tasks</div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Recruit Volunteers
          </button>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Schedule Planning</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">8 Tasks</div>
          <div className="text-gray-600 mb-4">Need scheduling attention</div>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Schedule Now
          </button>
        </div>
      </div>
    </div>
  );
}
