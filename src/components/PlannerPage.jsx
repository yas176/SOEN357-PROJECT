import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

function PlannerPage({ userEmail }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    const userTasks = tasksData[userEmail] || [];
    setTasks(userTasks);
  }, [userEmail]);

  const refreshTasks = () => {
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    const userTasks = tasksData[userEmail] || [];
    setTasks(userTasks);
  };

  const handleComplete = (taskId) => {
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    const userTasks = tasksData[userEmail] || [];
    const updatedTasks = userTasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, completedAt: new Date().toISOString() }
        : task
    );
    tasksData[userEmail] = updatedTasks;
    localStorage.setItem('cramguard_tasks', JSON.stringify(tasksData));
    refreshTasks();
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
      const userTasks = tasksData[userEmail] || [];
      const updatedTasks = userTasks.filter(task => task.id !== taskId);
      tasksData[userEmail] = updatedTasks;
      localStorage.setItem('cramguard_tasks', JSON.stringify(tasksData));
      refreshTasks();
    }
  };

  const ongoingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'school':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'work':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'personal':
        return 'text-teal-400 bg-teal-400/10 border-teal-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const TaskCard = ({ task, showCompleteButton }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors relative">
      {/* Delete button - top right */}
      <button
        onClick={() => handleDelete(task.id)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        title="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-4 pr-8">
        {/* Title and badges */}
        <div className="flex items-start gap-3">
          <h3 className="text-xl font-semibold text-white flex-1">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Priority Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            {/* Category Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                task.category
              )}`}
            >
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-300 text-sm whitespace-pre-wrap">
            {task.description}
          </p>
        )}

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Deadline:</span>
          <span className="text-white font-medium">
            {formatDate(task.deadline)}
          </span>
        </div>

        {/* Complete button - only for ongoing tasks */}
        {showCompleteButton && (
          <button
            onClick={() => handleComplete(task.id)}
            className="w-full bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors mt-2"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Task Planner
            </h1>
            <p className="text-sm text-gray-400">
              View and manage all your tasks
            </p>
          </div>

          {/* Two Column Layout: Ongoing (left) and Completed (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ongoing Column - Left */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-4">
                Ongoing ({ongoingTasks.length})
              </h2>
              {ongoingTasks.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-400 text-sm">No ongoing tasks</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 scroll-smooth">
                  {ongoingTasks.map((task) => (
                    <TaskCard key={task.id} task={task} showCompleteButton={true} />
                  ))}
                </div>
              )}
            </div>

            {/* Completed Column - Right */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-4">
                Completed ({completedTasks.length})
              </h2>
              {completedTasks.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-400 text-sm">No completed tasks</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 scroll-smooth">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} showCompleteButton={false} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PlannerPage;
