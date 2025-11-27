import React from 'react';
import { Clock, Tag } from 'lucide-react';

export function TaskCard({ task, onClick, selected = false }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'school':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'work':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'personal':
        return 'text-teal-400 bg-teal-400/10 border-teal-400/30';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
    }
  };

  const formatDueDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'bg-teal-400/10 border-teal-400/50 ring-1 ring-teal-400/30'
          : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Title and badges */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-semibold ${selected ? 'text-teal-100' : 'text-white'} line-clamp-2`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Description preview */}
        {task.description && (
          <p className="text-sm text-slate-400 line-clamp-2">
            {task.description}
          </p>
        )}
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs">
          <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
            <Clock className="w-3.5 h-3.5" />
            {formatDueDate(task.dueDate)}
          </span>
          {task.category && (
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${getCategoryColor(task.category)}`}>
              <Tag className="w-3 h-3" />
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

