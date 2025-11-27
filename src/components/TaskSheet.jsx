import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui';

export function TaskSheet({ isOpen, onClose, onSave, editTask, prefilledData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('school');
  const [effort, setEffort] = useState(4);

  // Reset form when modal opens/closes or edit task changes
  useEffect(() => {
    if (isOpen) {
      if (editTask) {
        // Editing existing task
        setTitle(editTask.title);
        setDescription(editTask.description || '');
        setDueDate(editTask.dueDate);
        setPriority(editTask.priority);
        setCategory(editTask.category || 'school');
        setEffort(editTask.effort || 4);
      } else if (prefilledData) {
        // Pre-filled from QuickAdd
        setTitle(prefilledData.title || '');
        setDescription(prefilledData.description || '');
        setDueDate(prefilledData.dueDate || '');
        setPriority(prefilledData.priority || 'medium');
        setCategory(prefilledData.category || 'school');
        setEffort(prefilledData.effort || 4);
      } else {
        // Reset to empty form
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setCategory('school');
        setEffort(4);
      }
    }
  }, [isOpen, editTask, prefilledData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate,
      priority,
      category,
      effort,
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div className="relative bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-700 w-full sm:max-w-lg sm:mx-4 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">
            {editTask ? 'Edit Task' : 'Add Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="w-full bg-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                required
              />
            </div>
            
            {/* Due Date/Time */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Due Date & Time <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                required
              />
            </div>
            
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      priority === p
                        ? p === 'high'
                          ? 'bg-red-500/20 text-red-400 border-2 border-red-400'
                          : p === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-400'
                          : 'bg-green-500/20 text-green-400 border-2 border-green-400'
                        : 'bg-slate-700 text-slate-400 border-2 border-transparent hover:border-slate-500'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              >
                <option value="school">School</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            
            {/* Estimated Effort */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Estimated Effort: {effort} hours
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={effort}
                onChange={(e) => setEffort(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1h</span>
                <span>10h</span>
                <span>20h</span>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add notes or details about this task..."
                rows={3}
                className="w-full bg-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editTask ? 'Save Changes' : 'Add Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

