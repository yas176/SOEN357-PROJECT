// Natural language parser for task creation
import * as chrono from 'chrono-node';

/**
 * Priority keywords mapping
 */
const PRIORITY_KEYWORDS = {
  high: ['urgent', 'important', 'asap', 'critical', 'high priority', 'high-priority', '!', '!!', '!!!'],
  low: ['low priority', 'low-priority', 'whenever', 'not urgent', 'minor', 'optional'],
};

/**
 * Category keywords mapping
 */
const CATEGORY_KEYWORDS = {
  school: ['school', 'class', 'assignment', 'homework', 'exam', 'quiz', 'test', 'lecture', 'lab', 'project', 'essay', 'paper', 'study', 'midterm', 'final'],
  work: ['work', 'job', 'meeting', 'client', 'deadline', 'report', 'presentation', 'office'],
  personal: ['personal', 'home', 'gym', 'health', 'doctor', 'appointment', 'errand', 'shopping'],
};

/**
 * Detect priority from input text
 */
function detectPriority(text) {
  const lowerText = text.toLowerCase();
  
  for (const keyword of PRIORITY_KEYWORDS.high) {
    if (lowerText.includes(keyword)) {
      return 'high';
    }
  }
  
  for (const keyword of PRIORITY_KEYWORDS.low) {
    if (lowerText.includes(keyword)) {
      return 'low';
    }
  }
  
  return 'medium';
}

/**
 * Detect category from input text
 */
function detectCategory(text) {
  const lowerText = text.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'school'; // Default for a student app
}

/**
 * Extract title from input by removing date/time phrases and priority keywords
 */
function extractTitle(text, parsedDate) {
  let title = text;
  
  // Remove common prefixes
  title = title.replace(/^(urgent:|important:|low priority:|high priority:)\s*/i, '');
  
  // Remove the date/time text that chrono parsed
  if (parsedDate && parsedDate.text) {
    title = title.replace(parsedDate.text, '');
  }
  
  // Remove common date-related phrases
  title = title.replace(/\b(due|by|on|at|before|until|deadline)\b\s*/gi, '');
  
  // Remove priority keywords
  for (const keywords of Object.values(PRIORITY_KEYWORDS)) {
    for (const keyword of keywords) {
      title = title.replace(new RegExp(`\\b${keyword}\\b`, 'gi'), '');
    }
  }
  
  // Clean up extra spaces and punctuation
  title = title
    .replace(/[!]+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^\s*[,\-:]\s*/, '')
    .replace(/\s*[,\-:]\s*$/, '')
    .trim();
  
  // Capitalize first letter
  if (title.length > 0) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  }
  
  return title;
}

/**
 * Format date for datetime-local input (YYYY-MM-DDTHH:MM)
 */
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Estimate effort based on keywords
 */
function estimateEffort(text) {
  const lowerText = text.toLowerCase();
  
  // High effort indicators
  if (/\b(final|major|big|large|comprehensive|thesis|dissertation)\b/.test(lowerText)) {
    return 10;
  }
  
  // Medium-high effort
  if (/\b(project|paper|essay|report|presentation)\b/.test(lowerText)) {
    return 6;
  }
  
  // Medium effort
  if (/\b(assignment|homework|lab)\b/.test(lowerText)) {
    return 4;
  }
  
  // Low effort
  if (/\b(quiz|reading|review|notes)\b/.test(lowerText)) {
    return 2;
  }
  
  return 4; // Default
}

/**
 * Main parser function
 * @param {string} input - Natural language input
 * @returns {Object} Parsed task data
 */
export function parseTaskInput(input) {
  if (!input || typeof input !== 'string') {
    return {
      success: false,
      error: 'Please enter a task description',
      data: null,
    };
  }
  
  const trimmedInput = input.trim();
  
  if (trimmedInput.length < 3) {
    return {
      success: false,
      error: 'Task description is too short',
      data: null,
    };
  }
  
  // Parse date/time using chrono
  const parsedResults = chrono.parse(trimmedInput, new Date(), { forwardDate: true });
  const parsedDate = parsedResults.length > 0 ? parsedResults[0] : null;
  
  // Extract components
  const title = extractTitle(trimmedInput, parsedDate);
  const priority = detectPriority(trimmedInput);
  const category = detectCategory(trimmedInput);
  const effort = estimateEffort(trimmedInput);
  
  // Build due date
  let dueDate = null;
  let dueDateFormatted = '';
  
  if (parsedDate && parsedDate.start) {
    dueDate = parsedDate.start.date();
    
    // If no time was specified, default to 11:59 PM
    if (!parsedDate.start.isCertain('hour')) {
      dueDate.setHours(23, 59, 0, 0);
    }
    
    dueDateFormatted = formatDateForInput(dueDate);
  }
  
  // Validate we have at least a title
  if (!title || title.length < 2) {
    return {
      success: false,
      error: 'Could not extract a task title. Try: "Assignment 4 due Friday"',
      data: null,
    };
  }
  
  return {
    success: true,
    error: null,
    data: {
      title,
      dueDate: dueDateFormatted,
      dueDateParsed: dueDate,
      priority,
      category,
      effort,
      originalInput: trimmedInput,
      dateText: parsedDate ? parsedDate.text : null,
    },
  };
}

/**
 * Get example inputs for help text
 */
export function getExampleInputs() {
  return [
    'Math homework due tomorrow at 5pm',
    'Urgent: Final project presentation Friday 2pm',
    'Low priority: clean up notes',
    'CS assignment due November 30th 11:59pm',
    'Study for midterm exam next Monday',
  ];
}

