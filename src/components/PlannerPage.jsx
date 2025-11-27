import React, { useState, useEffect, useCallback } from 'react';
import { Plus, ListChecks, Calendar, Download, Trash2 } from 'lucide-react';
import { Button, Modal } from './ui';
import { TaskSheet } from './TaskSheet';
import { TaskCard } from './TaskCard';
import { BlockCard } from './BlockCard';
import { QuickAdd } from './QuickAdd';
import { suggestBlocksForTask, generateAlternativeBlock } from '../utils/suggestBlocksForTask';
import { exportToIcs, getExportSummary } from '../utils/exportToIcs';

// LocalStorage keys
const getTasksKey = (email) => `cramguard_tasks_${email}`;
const getBlocksKey = (email) => `cramguard_blocks_${email}`;

// Simple toast implementation
function useInternalToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const ToastComponent = toast ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom fade-in duration-300">
      <div
        className={`px-4 py-3 rounded-xl shadow-lg border ${
          toast.type === 'success'
            ? 'bg-green-500/20 border-green-500/30 text-green-400'
            : toast.type === 'error'
            ? 'bg-red-500/20 border-red-500/30 text-red-400'
            : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
        }`}
      >
        <p className="font-medium">{toast.message}</p>
      </div>
    </div>
  ) : null;

  return { showToast, ToastComponent };
}

export function PlannerView({ userEmail, showToast: externalShowToast }) {
  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [exportAll, setExportAll] = useState(false);
  const [prefilledTask, setPrefilledTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [suggestedBlocks, setSuggestedBlocks] = useState([]);
  const [committedBlockIds, setCommittedBlockIds] = useState([]);
  const [committedBlocks, setCommittedBlocks] = useState([]);

  const { showToast: internalShowToast, ToastComponent } = useInternalToast();
  const showToast = externalShowToast || internalShowToast;

  // Load tasks and committed blocks from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Load tasks
        const storedTasks = localStorage.getItem(getTasksKey(userEmail));
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks.filter(t => !t.completed));
        }

        // Load committed blocks
        const storedBlocks = localStorage.getItem(getBlocksKey(userEmail));
        if (storedBlocks) {
          const { blockIds, blocks } = JSON.parse(storedBlocks);
          setCommittedBlockIds(blockIds || []);
          setCommittedBlocks(blocks || []);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, [userEmail]);

  // Generate suggested blocks when a task is selected
  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find(t => t.id === selectedTask);
      if (task) {
        const suggestions = suggestBlocksForTask({
          id: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          effort: task.effort,
        }, 5);
        setSuggestedBlocks(suggestions);
      }
    } else {
      setSuggestedBlocks([]);
    }
  }, [selectedTask, tasks]);

  // Save tasks to localStorage
  const saveTasks = useCallback((newTasks) => {
    try {
      localStorage.setItem(getTasksKey(userEmail), JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [userEmail]);

  // Save committed blocks to localStorage
  const saveCommittedBlocks = useCallback((blockIds, blocks) => {
    try {
      localStorage.setItem(getBlocksKey(userEmail), JSON.stringify({ blockIds, blocks }));
    } catch (error) {
      console.error('Error saving blocks:', error);
    }
  }, [userEmail]);

  // Add new task
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);
    setSelectedTask(newTask.id);
    setPrefilledTask(null); // Clear prefilled data
    showToast('Task added successfully', 'success');
  };

  // Open TaskSheet with pre-filled data from QuickAdd
  const handleOpenFullForm = (parsedData) => {
    setPrefilledTask({
      title: parsedData.title,
      dueDate: parsedData.dueDate,
      priority: parsedData.priority,
      category: parsedData.category,
      effort: parsedData.effort,
      description: '',
    });
    setIsTaskSheetOpen(true);
  };

  // Delete task
  const handleDeleteTask = () => {
    if (!taskToDelete) return;
    
    const newTasks = tasks.filter(t => t.id !== taskToDelete);
    setTasks(newTasks);
    saveTasks(newTasks);
    
    // Also remove any committed blocks for this task
    const newCommittedBlocks = committedBlocks.filter(b => b.taskId !== taskToDelete);
    const newCommittedBlockIds = committedBlockIds.filter(id => 
      newCommittedBlocks.some(b => b.id === id)
    );
    setCommittedBlocks(newCommittedBlocks);
    setCommittedBlockIds(newCommittedBlockIds);
    saveCommittedBlocks(newCommittedBlockIds, newCommittedBlocks);
    
    if (selectedTask === taskToDelete) {
      setSelectedTask(newTasks.length > 0 ? newTasks[0].id : null);
    }
    
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
    showToast('Task deleted', 'info');
  };

  // Commit a block
  const handleCommit = (block) => {
    if (committedBlockIds.includes(block.id)) return;
    
    const newBlockIds = [...committedBlockIds, block.id];
    const newBlocks = [...committedBlocks, block];
    
    setCommittedBlockIds(newBlockIds);
    setCommittedBlocks(newBlocks);
    saveCommittedBlocks(newBlockIds, newBlocks);
    
    // Calculate hours ahead of deadline
    const task = tasks.find(t => t.id === block.taskId);
    if (task) {
      const dueDate = new Date(task.dueDate);
      const blockDate = new Date(`${block.date}T${block.startTime}`);
      const hoursAhead = Math.round((dueDate.getTime() - blockDate.getTime()) / (1000 * 60 * 60));
      showToast(`Block committed — you're ${Math.max(0, hoursAhead)}h ahead of deadline`, 'success');
    } else {
      showToast('Block committed successfully!', 'success');
    }
  };

  // Swap a block for an alternative
  const handleSwap = (blockId) => {
    const blockIndex = suggestedBlocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;
    
    const currentBlock = suggestedBlocks[blockIndex];
    const task = tasks.find(t => t.id === currentBlock.taskId);
    
    if (!task) return;
    
    const alternative = generateAlternativeBlock(
      {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        effort: task.effort,
      },
      currentBlock,
      suggestedBlocks
    );
    
    const newBlocks = [...suggestedBlocks];
    newBlocks[blockIndex] = alternative;
    setSuggestedBlocks(newBlocks);
    
    showToast('Showing alternative time slot', 'info');
  };

  // Export committed blocks
  const handleExport = () => {
    const blocksToExport = exportAll ? committedBlocks : committedBlocks.filter(b => b.taskId === selectedTask);
    
    if (blocksToExport.length === 0) {
      showToast('No committed blocks to export', 'error');
      setIsExportModalOpen(false);
      return;
    }
    
    exportToIcs({
      blocks: blocksToExport,
      tasks,
      selectedTaskId: exportAll ? null : selectedTask,
    });
    
    setIsExportModalOpen(false);
    showToast('Calendar export ready! Check your downloads.', 'success');
  };

  // Get current task and its blocks
  const selectedTaskData = tasks.find(t => t.id === selectedTask);
  const taskBlocks = selectedTask ? suggestedBlocks : [];
  const taskCommittedBlocks = selectedTask 
    ? committedBlocks.filter(b => b.taskId === selectedTask)
    : [];

  // Combined blocks for display
  const displayBlocks = [...taskBlocks];

  // Calculate footer stats
  const totalCommitted = committedBlockIds.length;
  const calculateHoursAhead = () => {
    if (totalCommitted === 0) return 0;
    
    let minHoursAhead = Infinity;
    for (const block of committedBlocks) {
      const task = tasks.find(t => t.id === block.taskId);
      if (task) {
        const dueDate = new Date(task.dueDate);
        const blockDate = new Date(`${block.date}T${block.startTime}`);
        const hoursAhead = Math.round((dueDate.getTime() - blockDate.getTime()) / (1000 * 60 * 60));
        if (hoursAhead < minHoursAhead) minHoursAhead = hoursAhead;
      }
    }
    
    return minHoursAhead === Infinity ? 0 : Math.max(0, minHoursAhead);
  };
  const hoursAhead = calculateHoursAhead();

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Task Planner
            </h1>
            <p className="text-sm text-slate-400">
              Manage tasks and commit to study blocks
            </p>
          </div>

        {/* Quick Add with AI Parsing */}
        <QuickAdd 
          onAddTask={handleAddTask}
          onOpenFullForm={handleOpenFullForm}
        />

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Panel */}
          <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Your Tasks
              </h2>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsTaskSheetOpen(true)}
                >
                  <Plus className="w-5 h-5" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
                {tasks.map((task) => (
                  <div key={task.id} className="relative group">
                    <TaskCard
                      task={task}
                      onClick={() => setSelectedTask(task.id)}
                      selected={selectedTask === task.id}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTaskToDelete(task.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="absolute top-3 right-3 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                </div>
                ))}
              </div>

              {tasks.length === 0 && (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
                    <ListChecks className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">No tasks yet</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Add your first task to get personalized commit blocks
                  </p>
                  <Button variant="primary" onClick={() => setIsTaskSheetOpen(true)}>
                    Add Your First Task
                  </Button>
                </div>
              )}
            </div>

          {/* Blocks Panel */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Suggested Blocks
              </h2>
                  {selectedTaskData && (
                    <p className="text-slate-400 mt-1 text-sm">
                      For: {selectedTaskData.title}
                    </p>
                  )}
                </div>
                {(taskCommittedBlocks.length > 0 || committedBlocks.length > 0) && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsExportModalOpen(true)}
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                )}
              </div>

              {!selectedTask ? (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Select a task</h3>
                  <p className="text-slate-400 text-sm">
                    Choose a task from the list to see commit block suggestions
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
                  {displayBlocks.map((block) => (
                    <BlockCard
                      key={block.id}
                      block={block}
                      onCommit={() => handleCommit(block)}
                      onSwap={() => handleSwap(block.id)}
                      committed={committedBlockIds.includes(block.id)}
                    />
                  ))}
                  {displayBlocks.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No blocks available. Try adjusting the task deadline.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        {/* Footer Status */}
        {totalCommitted > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-teal-400/10 border border-teal-400/20">
            <p className="text-center text-teal-400 font-medium">
              {totalCommitted} block{totalCommitted > 1 ? 's' : ''} committed • earliest
              finish {hoursAhead}h early
            </p>
          </div>
        )}
      </div>

      {/* Task Sheet Modal */}
      <TaskSheet
        isOpen={isTaskSheetOpen}
        onClose={() => {
          setIsTaskSheetOpen(false);
          setPrefilledTask(null);
        }}
        onSave={handleAddTask}
        prefilledData={prefilledTask}
      />

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export to Calendar"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExport}>
              Export .ics File
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-white">
            Export your committed blocks to your calendar app. The file will include:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>All committed study blocks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>24-hour reminder before each session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>2-hour reminder before each session</span>
            </li>
          </ul>
          
          {/* Export scope selection */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              What to export:
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-600 transition-colors">
                <input
                  type="radio"
                  name="exportScope"
                  checked={!exportAll}
                  onChange={() => setExportAll(false)}
                  className="w-4 h-4 text-teal-400 focus:ring-teal-400 focus:ring-offset-0 bg-slate-600 border-slate-500"
                />
                <div>
                  <p className="text-white font-medium">Current task only</p>
                  <p className="text-sm text-slate-400">
                    {selectedTaskData ? `"${selectedTaskData.title}"` : 'No task selected'}
                    {taskCommittedBlocks.length > 0 && ` (${taskCommittedBlocks.length} block${taskCommittedBlocks.length > 1 ? 's' : ''})`}
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-600 transition-colors">
                <input
                  type="radio"
                  name="exportScope"
                  checked={exportAll}
                  onChange={() => setExportAll(true)}
                  className="w-4 h-4 text-teal-400 focus:ring-teal-400 focus:ring-offset-0 bg-slate-600 border-slate-500"
                />
                <div>
                  <p className="text-white font-medium">All tasks</p>
                  <p className="text-sm text-slate-400">
                    {committedBlocks.length} block{committedBlocks.length !== 1 ? 's' : ''} across all tasks
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-slate-700/50 mt-4">
            <p className="text-sm text-slate-400">
              Compatible with Google Calendar, Apple Calendar, Outlook, and other
              calendar apps that support .ics files.
            </p>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        title="Delete Task"
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setIsDeleteModalOpen(false);
              setTaskToDelete(null);
            }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-white">
            Are you sure you want to delete this task?
          </p>
          <p className="text-slate-400 text-sm">
            This will also remove any committed blocks for this task. This action cannot be undone.
          </p>
        </div>
      </Modal>

      {/* Toast */}
      {!externalShowToast && ToastComponent}
    </div>
  );
}

export default PlannerView;

