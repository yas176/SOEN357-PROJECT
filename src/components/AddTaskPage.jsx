import { useState } from 'react';
import Header from './Header';

function AddTaskPage({ onLogout, userEmail, onBack }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    setTitle('');
    setDeadline('');
    setPriority('medium');
    setCategory('personal');
    setDescription('');
    onBack();
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (!deadline) {
      alert('Please select a deadline');
      return;
    }

    // Get existing tasks from localStorage
    const tasksData = JSON.parse(localStorage.getItem('cramguard_tasks') || '{}');
    
    // Get tasks for this user (or empty array if none exist)
    const userTasks = tasksData[userEmail] || [];
    
    // Create new task with unique ID and timestamp
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      deadline: deadline,
      priority: priority,
      category: category,
      description: description.trim(),
      createdAt: new Date().toISOString()
    };
    
    // Add new task to user's tasks
    userTasks.push(newTask);
    
    // Save back to localStorage
    tasksData[userEmail] = userTasks;
    localStorage.setItem('cramguard_tasks', JSON.stringify(tasksData));
    
    handleCancel();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header userEmail={userEmail} onLogout={onLogout} onAddTask={null} />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-6">Add Task</h1>
          
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Deadline Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Priority Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="school">School</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskPage;

