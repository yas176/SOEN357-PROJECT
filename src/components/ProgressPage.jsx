import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

// use the SAME storage convention as PlannerView
const getTasksKey = (email) => `cramguard_tasks_${email}`;

function ProgressPage({ userEmail }) {
  const [tasks, setTasks] = useState([]);

  // load this user's tasks
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(getTasksKey(userEmail)) || '[]'
    );
    setTasks(stored);
  }, [userEmail]);

  const refreshTasks = () => {
    const stored = JSON.parse(
      localStorage.getItem(getTasksKey(userEmail)) || '[]'
    );
    setTasks(stored);
  };

  const handleComplete = (taskId) => {
    const stored = JSON.parse(
      localStorage.getItem(getTasksKey(userEmail)) || '[]'
    );

    const updated = stored.map((task) =>
      task.id === taskId
        ? { ...task, completed: true, completedAt: new Date().toISOString() }
        : task
    );

    localStorage.setItem(getTasksKey(userEmail), JSON.stringify(updated));
    setTasks(updated);
  };

  const handleDelete = (taskId) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this task? This action cannot be undone.'
      )
    ) {
      return;
    }

    const stored = JSON.parse(
      localStorage.getItem(getTasksKey(userEmail)) || '[]'
    );
    const updated = stored.filter((task) => task.id !== taskId);

    localStorage.setItem(getTasksKey(userEmail), JSON.stringify(updated));
    setTasks(updated);
  };

  const ongoingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Planner uses `dueDate`; Progress might use `deadline` – support both
  const getDeadline = (task) => task.deadline || task.dueDate || null;

  const completedWithDeadline = completedTasks.filter((t) => getDeadline(t));

  const earlyFinished = completedWithDeadline.filter((t) => {
    const deadlineStr = getDeadline(t);
    if (!t.completedAt || !deadlineStr) return false;
    const completedAtDate = new Date(t.completedAt);
    const deadlineDate = new Date(deadlineStr);
    return completedAtDate <= deadlineDate;
  });

  const earlyFinishRate =
    completedWithDeadline.length > 0
      ? Math.round((earlyFinished.length / completedWithDeadline.length) * 100)
      : 0;

  const totalBlocks = tasks.length;
  const completedBlocks = completedTasks.length;
  const blockCompletionRate =
    totalBlocks > 0 ? Math.round((completedBlocks / totalBlocks) * 100) : 0;

  const lateNightMinutes = completedTasks.reduce((sum, t) => {
    if (!t.completedAt) return sum;
    const d = new Date(t.completedAt);
    const hour = d.getHours();
    if (hour >= 22 || hour < 5) {
      return sum + 30;
    }
    return sum;
  }, 0);

  // Weekly activity counts (Mon–Sun)
  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekdayOrder = [1, 2, 3, 4, 5, 6, 0];
  const weekdayCounts = [0, 0, 0, 0, 0, 0, 0];

  completedTasks.forEach((task) => {
    if (!task.completedAt) return;
    const d = new Date(task.completedAt);
    const jsDay = d.getDay();
    const idx = weekdayOrder.indexOf(jsDay);
    if (idx !== -1) weekdayCounts[idx] += 1;
  });

  const maxCount = Math.max(...weekdayCounts, 1);

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

  const TaskCard = ({ task, showCompleteButton }) => {
    const deadline = getDeadline(task);
    return (
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
              {task.priority && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              )}
              {/* Category Badge */}
              {task.category && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                    task.category
                  )}`}
                >
                  {task.category.charAt(0).toUpperCase() +
                    task.category.slice(1)}
                </span>
              )}
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
              {formatDate(deadline)}
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
  };

  const handleExportCSV = () => {
    console.log('Export clicked, tasks = ', tasks.length);

    const header = [
      'Title',
      'Deadline',
      'Priority',
      'Category',
      'Description',
      'Created At',
      'Completed',
      'Completed At',
    ];

    const rows = tasks.map((t) => [
      t.title || '',
      getDeadline(t) || '',
      t.priority || '',
      t.category || '',
      (t.description || '').replace(/\n/g, ' '),
      t.createdAt || '',
      t.completed ? 'Yes' : 'No',
      t.completedAt || '',
    ]);

    const csvLines = [
      header.join(','),
      ...rows.map((row) =>
        row
          .map((value) => {
            const str = String(value ?? '');
            const escaped = str.replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(',')
      ),
    ];

    const blob = new Blob([csvLines.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cramguard_progress.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 text-left">
        <div className="max-w-7xl mx-auto">
          {/* title + Export CSV */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                Your Progress
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Track your study habits and finish rates
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-slate-700 transition-colors"
            >
              Export CSV
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Early Finish Rate */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 flex gap-4">
              <img
                src="/icons8-check.svg"
                alt="Early finish icon"
                className="w-8 h-8 opacity-90 object-contain"
              />
              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">
                  Early Finish Rate
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {earlyFinishRate}%
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Based on tasks finished before their deadlines.
                </p>
              </div>
            </div>

            {/* Block Completion */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 flex gap-4">
              <img
                src="/chart.svg"
                alt="Block completion icon"
                className="w-9 h-9 opacity-90 object-contain"
              />
              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">
                  Block Completion
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {completedBlocks}/{totalBlocks || 0}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {blockCompletionRate}% completion across all tasks.
                </p>
              </div>
            </div>

            {/* Late-Night Work */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 flex gap-4">
              <img
                src="/night-mode.svg"
                alt="Late night icon"
                className="w-8 h-8 opacity-90 object-contain"
              />
              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">
                  Late-Night Work
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {lateNightMinutes}m
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Estimated focus time between 10 PM and 5 AM.
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout: Ongoing and Completed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Ongoing Column */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Ongoing ({ongoingTasks.length})
              </h2>
              {ongoingTasks.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-400 text-sm">No ongoing tasks</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ongoingTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      showCompleteButton={true}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Completed Column */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Completed ({completedTasks.length})
              </h2>
              {completedTasks.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-400 text-sm">No completed tasks</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      showCompleteButton={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Productivity Insight */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8">
            <p className="text-sm font-semibold text-white mb-2">
              Productivity Insight
            </p>
            <p className="text-sm text-gray-300">
              You plan best on{' '}
              <span className="text-teal-300 font-medium">Tue–Wed 4–6 PM</span>.
              Your completion rate is highest during these windows, and you
              report better focus.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Try scheduling more complex tasks during these times for best
              results.
            </p>
          </section>

          {/* Weekly Activity */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white">
                Weekly Activity
              </p>
            </div>

            <div className="h-40 flex items-end gap-4">
              {weekdayLabels.map((label, index) => {
                const count = weekdayCounts[index];
                const heightPercent =
                  count === 0 ? 5 : (count / maxCount) * 80 + 10;
                return (
                  <div
                    key={label}
                    className="flex flex-1 flex-col items-center justify-end"
                  >
                    <div
                      className="w-6 rounded-md bg-slate-700"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="mt-2 text-xs text-gray-400">{label}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[11px] text-gray-500 text-center">
              Hours of focused work per day
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProgressPage;
