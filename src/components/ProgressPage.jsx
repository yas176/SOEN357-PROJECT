import { useState, useEffect } from 'react';
import Header from './Header';

function ProgressPage({ onLogout, userEmail, onAddTask }) {
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    const userTasks = tasksData[userEmail] || [];
    setTasks(userTasks);
  }, [userEmail, refreshKey]);

  // Mark task as completed or uncompleted
  const toggleTaskCompletion = (taskId, completed) => {
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    const userTasks = tasksData[userEmail] || [];
    
    const updatedTasks = userTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: completed,
          completedAt: completed ? new Date().toISOString() : undefined
        };
      }
      return task;
    });
    
    tasksData[userEmail] = updatedTasks;
    localStorage.setItem('cramguard_tasks', JSON.stringify(tasksData));
    setRefreshKey(prev => prev + 1);
  };

  // Calculate hours until deadline
  const getHoursUntilDeadline = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours;
  };

  // Get gradient color based on hours remaining (green at 72h, red at 0h)
  const getHoursColor = (hours) => {
    if (hours < 0) {
      return 'text-red-500'; // Overdue - red
    }
    
    // Clamp hours between 0 and 72 for gradient calculation
    const clampedHours = Math.max(0, Math.min(72, hours));
    
    // Calculate percentage (0 = red, 1 = green)
    const percentage = clampedHours / 72;
    
    // Interpolate between red (239, 68, 68) and green (34, 197, 94)
    const red = Math.round(239 - (239 - 34) * percentage);
    const green = Math.round(68 + (197 - 68) * percentage);
    const blue = Math.round(68 + (94 - 68) * percentage);
    
    return { color: `rgb(${red}, ${green}, ${blue})` };
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'school':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'work':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'personal':
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Separate tasks into ongoing and completed
  const ongoingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Render a single task card
  const renderTaskCard = (task, isCompleted = false) => {
    const hoursUntilDeadline = getHoursUntilDeadline(task.deadline);
    const isOverdue = hoursUntilDeadline !== null && hoursUntilDeadline < 0;
    
    return (
      <div key={task.id} className={`bg-slate-800 rounded-xl p-6 border ${isCompleted ? 'border-slate-600 opacity-75' : 'border-slate-700'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className={`text-xl font-semibold ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                {task.title}
              </h2>
              {isCompleted && (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium border border-green-500/30">
                  Completed
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {/* Priority Badge */}
              <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(task.priority || 'medium')}`}>
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
              </span>
              {/* Category Badge */}
              <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(task.category || 'personal')}`}>
                {task.category ? task.category.charAt(0).toUpperCase() + task.category.slice(1) : 'Personal'}
              </span>
            </div>
          </div>
        </div>
        
        {task.description && (
          <p className={`mb-4 ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>{task.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {task.deadline && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Deadline:</span>
              <span className={isCompleted ? 'text-gray-400' : 'text-white'}>
                {new Date(task.deadline).toLocaleString()}
              </span>
            </div>
          )}
          
          {!isCompleted && hoursUntilDeadline !== null && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Hours until deadline:</span>
              {isOverdue ? (
                <span className="text-red-500 font-bold">
                  OVERDUE!
                </span>
              ) : (
                <span className="font-semibold" style={getHoursColor(hoursUntilDeadline)}>
                  {hoursUntilDeadline} hours
                </span>
              )}
            </div>
          )}
          
          {isCompleted && task.completedAt && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Completed:</span>
              <span className="text-green-400">
                {new Date(task.completedAt).toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-gray-500">Created:</span>
            <span className="text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          {isCompleted ? (
            <button
              onClick={() => toggleTaskCompletion(task.id, false)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Mark as Ongoing
            </button>
          ) : (
            <button
              onClick={() => toggleTaskCompletion(task.id, true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header userEmail={userEmail} onLogout={onLogout} onAddTask={onAddTask} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-4">No tasks yet</p>
              <p className="text-gray-500 mb-6">Click "Add Task" to create your first task</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ongoing Tasks Section */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-6">Ongoing Tasks</h1>
                {ongoingTasks.length === 0 ? (
                  <div className="text-center py-8 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-gray-400">No ongoing tasks</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {ongoingTasks.map(task => renderTaskCard(task, false))}
                  </div>
                )}
              </div>

              {/* Completed Tasks Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Completed Tasks</h2>
                {completedTasks.length === 0 ? (
                  <div className="text-center py-8 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-gray-400">No completed tasks</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {completedTasks.map(task => renderTaskCard(task, true))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;

