// Utility for generating suggested commit blocks for a task

const DURATIONS = [60, 90, 120]; // 1h, 1.5h, 2h in minutes

const REASONS = [
  'Morning focus window – optimal for deep work',
  'Post-lunch productivity slot – matches your energy patterns',
  'Afternoon steady state – good for sustained effort',
  'Early evening wind-down – ideal for review tasks',
  'Weekend morning – uninterrupted study time',
  'Midday break slot – quick progress session',
  'Pre-deadline push – concentrated effort block',
  'Low-distraction window – minimal calendar conflicts',
  'Peak cognitive hours – based on typical student patterns',
  'Strategic buffer – builds in time before due date',
];

/**
 * Generates 3-5 suggested commit blocks for a given task.
 * - Windows within next 7-10 days
 * - Avoids late night (22:00-06:00)
 * - Varies durations (60/90/120 min)
 * - Returns unique reason strings
 * 
 * @param {Object} task - Task object with id, title, dueDate, priority, effort
 * @param {number} count - Number of blocks to generate (default 5)
 * @returns {Array} Array of suggested block objects
 */
export function suggestBlocksForTask(task, count = 5) {
  const blocks = [];
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  
  // Calculate the window: from now to min(due date, now + 10 days)
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 10);
  const endWindow = dueDate < maxDate ? new Date(dueDate) : new Date(maxDate);
  
  // If due date is in the past, use next 7 days
  if (endWindow <= now) {
    endWindow.setDate(now.getDate() + 7);
  }
  
  // Generate candidate dates within window
  const candidateDates = [];
  const currentDate = new Date(now);
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow
  
  while (currentDate < endWindow && candidateDates.length < 14) {
    candidateDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Valid time slots (avoiding 22:00-06:00)
  const validTimeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', '15:00', '16:00', 
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ];
  
  // Prioritize certain times based on task priority
  const priorityTimePreferences = {
    high: ['09:00', '10:00', '08:00', '14:00', '15:00'],
    medium: ['10:00', '14:00', '15:00', '16:00', '11:00'],
    low: ['14:00', '16:00', '17:00', '19:00', '20:00'],
  };
  
  const preferredTimes = priorityTimePreferences[task.priority] || priorityTimePreferences.medium;
  const usedReasons = new Set();
  const usedSlots = new Set();
  
  // Generate blocks with preference for certain times
  for (let i = 0; i < count && candidateDates.length > 0; i++) {
    // Pick a date - spread across available dates
    const dateIndex = Math.min(
      Math.floor((i / count) * candidateDates.length) + Math.floor(Math.random() * 2),
      candidateDates.length - 1
    );
    const selectedDate = candidateDates[dateIndex];
    
    // Pick a time slot - prefer priority-based times first
    let selectedTime;
    if (i < preferredTimes.length) {
      selectedTime = preferredTimes[i];
    } else {
      const availableTimes = validTimeSlots.filter(t => 
        !usedSlots.has(`${selectedDate.toISOString().split('T')[0]}-${t}`)
      );
      selectedTime = availableTimes[Math.floor(Math.random() * availableTimes.length)] || '10:00';
    }
    
    // Mark slot as used
    usedSlots.add(`${selectedDate.toISOString().split('T')[0]}-${selectedTime}`);
    
    // Pick duration based on task effort/priority
    let durationIndex;
    if (task.priority === 'high' || (task.effort && task.effort >= 6)) {
      durationIndex = Math.min(i % 3 + 1, 2);
    } else if (task.priority === 'low') {
      durationIndex = Math.max(0, i % 3 - 1);
    } else {
      durationIndex = i % 3;
    }
    const duration = DURATIONS[durationIndex];
    
    // Pick a unique reason
    let reason;
    const availableReasons = REASONS.filter(r => !usedReasons.has(r));
    if (availableReasons.length > 0) {
      reason = availableReasons[Math.floor(Math.random() * availableReasons.length)];
    } else {
      reason = REASONS[i % REASONS.length];
    }
    usedReasons.add(reason);
    
    // Customize reason based on context
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      reason = reason.replace('typical', 'weekend');
    }
    
    blocks.push({
      id: `block-${task.id}-${i}-${Date.now()}`,
      taskId: task.id,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      duration,
      reason,
    });
  }
  
  // Sort blocks by date and time
  blocks.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });
  
  return blocks;
}

/**
 * Generate a single alternative block (for swap functionality)
 * 
 * @param {Object} task - Task object
 * @param {Object} currentBlock - Current block to swap
 * @param {Array} existingBlocks - Array of existing blocks to avoid conflicts
 * @returns {Object} New alternative block
 */
export function generateAlternativeBlock(task, currentBlock, existingBlocks) {
  const usedSlots = new Set(
    existingBlocks.map(b => `${b.date}-${b.startTime}`)
  );
  usedSlots.add(`${currentBlock.date}-${currentBlock.startTime}`);
  
  // Generate candidates
  const alternatives = suggestBlocksForTask(task, 10);
  
  // Find one that doesn't conflict
  const validAlternative = alternatives.find(
    alt => !usedSlots.has(`${alt.date}-${alt.startTime}`)
  );
  
  if (validAlternative) {
    return {
      ...validAlternative,
      id: currentBlock.id,
    };
  }
  
  // Fallback: modify current block
  const newTimes = ['07:00', '08:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  const newReasons = [
    'Alternative slot – fresh perspective time',
    'Backup window – good fallback option',
    'Flexible slot – adapts to your schedule',
    'Recovery window – optimal after rest',
  ];
  
  const newTime = newTimes.find(t => 
    !usedSlots.has(`${currentBlock.date}-${t}`)
  ) || newTimes[Math.floor(Math.random() * newTimes.length)];
  
  return {
    ...currentBlock,
    startTime: newTime,
    duration: DURATIONS[Math.floor(Math.random() * DURATIONS.length)],
    reason: newReasons[Math.floor(Math.random() * newReasons.length)],
  };
}

