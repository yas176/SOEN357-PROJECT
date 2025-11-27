// Utility for exporting committed blocks to .ics calendar file

/**
 * Formats a date to ICS format: YYYYMMDDTHHMMSS
 */
function formatIcsDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Generates a unique ID for an event
 */
function generateUid() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@cramguard`;
}

/**
 * Escapes special characters for ICS text fields
 */
function escapeIcsText(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Creates start and end Date objects from a block
 */
function getBlockDateTimes(block) {
  const [hours, minutes] = block.startTime.split(':').map(Number);
  
  const start = new Date(block.date + 'T00:00:00');
  start.setHours(hours, minutes, 0, 0);
  
  const end = new Date(start.getTime() + block.duration * 60 * 1000);
  
  return { start, end };
}

/**
 * Creates a VEVENT string for a committed block
 */
function createVEvent(block, task) {
  const { start, end } = getBlockDateTimes(block);
  const uid = generateUid();
  const now = new Date();
  
  const summary = `Study: ${escapeIcsText(task.title)}`;
  const description = task.description 
    ? escapeIcsText(`${task.description}\\n\\nReason: ${block.reason}`)
    : escapeIcsText(`Reason: ${block.reason}`);
  
  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(now)}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `CATEGORIES:Study,CramGuard`,
    'STATUS:CONFIRMED',
    // 24-hour reminder
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${summary} starts in 24 hours`,
    'END:VALARM',
    // 2-hour reminder
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${summary} starts in 2 hours`,
    'END:VALARM',
    'END:VEVENT',
  ];
  
  return lines.join('\r\n');
}

/**
 * Creates a complete ICS calendar file content
 */
function createIcsContent(events) {
  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CramGuard//Study Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:CramGuard Study Blocks',
  ].join('\r\n');
  
  const footer = 'END:VCALENDAR';
  
  return `${header}\r\n${events.join('\r\n')}\r\n${footer}`;
}

/**
 * Main export function - creates and downloads an .ics file
 * 
 * @param {Object} options
 * @param {Array} options.blocks - Array of committed blocks
 * @param {Array} options.tasks - Array of tasks
 * @param {string|null} options.selectedTaskId - If set, export only this task's blocks
 */
export function exportToIcs({ blocks, tasks, selectedTaskId }) {
  // Filter blocks based on selection
  const blocksToExport = selectedTaskId
    ? blocks.filter(b => b.taskId === selectedTaskId)
    : blocks;
  
  if (blocksToExport.length === 0) {
    console.warn('No blocks to export');
    return;
  }
  
  // Create task lookup map
  const taskMap = new Map(tasks.map(t => [t.id, t]));
  
  // Generate events
  const events = [];
  for (const block of blocksToExport) {
    const task = taskMap.get(block.taskId);
    if (task) {
      events.push(createVEvent(block, task));
    }
  }
  
  if (events.length === 0) {
    console.warn('No valid events to export');
    return;
  }
  
  // Create ICS content
  const icsContent = createIcsContent(events);
  
  // Generate filename
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  let filename;
  
  if (selectedTaskId) {
    const task = taskMap.get(selectedTaskId);
    const taskName = task?.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .substring(0, 30) || 'task';
    filename = `cramguard-${taskName}-${dateStr}.ics`;
  } else {
    filename = `cramguard-all-blocks-${dateStr}.ics`;
  }
  
  // Trigger download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Get a summary of what will be exported
 * 
 * @param {Array} blocks - All committed blocks
 * @param {Array} tasks - All tasks
 * @param {string|null} selectedTaskId - Selected task ID or null for all
 * @returns {Object} Summary with blockCount and optional taskTitle
 */
export function getExportSummary(blocks, tasks, selectedTaskId) {
  const blocksToExport = selectedTaskId
    ? blocks.filter(b => b.taskId === selectedTaskId)
    : blocks;
  
  const task = selectedTaskId
    ? tasks.find(t => t.id === selectedTaskId)
    : undefined;
  
  return {
    blockCount: blocksToExport.length,
    taskTitle: task?.title,
  };
}

