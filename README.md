# CramGuard - Study Session Planner

A React-based web application that helps students break down assignments into focused work sessions with smart commit blocks.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yas176/SOEN357-PROJECT.git
cd SOEN357-PROJECT
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)
   - You should see the CramGuard welcome page

---

## Features

### Authentication
- **Sign Up** - Create account with email/password
- **Sign In** - Authenticate and access the app
- **Persistent Sessions** - Stay logged in across browser refreshes

### Task Management
- **Add Tasks** - Create tasks with title, due date, priority, category, effort estimate, and description
- **Task List** - View all ongoing tasks with priority and category badges
- **Delete Tasks** - Remove tasks with confirmation dialog
- **Smart Due Dates** - Shows "Due today", "Due in 3 days", "Overdue" etc.

### Commit Blocks
- **Smart Suggestions** - Algorithm generates 3-5 study blocks per task
- **Avoids Late Night** - No suggestions between 10 PM – 6 AM
- **Variable Durations** - 60min, 90min, or 120min based on task priority
- **Priority-Based Times** - High priority tasks get morning slots
- **Rationale** - Each block includes a "why this time" explanation
- **Commit** - Lock in a time slot and save it
- **Swap** - Don't like a suggestion? Get an alternative

### Calendar Export
- **ICS Export** - Download committed blocks as `.ics` file
- **Reminders** - Each event includes 24-hour and 2-hour alarms
- **Flexible Export** - Export single task or all tasks
- **Compatible** - Works with Google Calendar, Apple Calendar, Outlook

---

## Pages

### 1. Welcome Page
- Landing page with app features and testimonials, FAQ
- Entry point when app loads
- Click "Start Planning" → redirects to Sign Up

### 2. Sign Up / Sign In
- User registration and authentication forms
- Form validation with error messages

### 3. Planner Page (Main Feature)
- Two-column layout (Tasks | Suggested Blocks)
- Add tasks via modal form
- Select a task to see suggested commit blocks
- Commit blocks to lock in study times
- Swap blocks to get alternative suggestions
- Export committed blocks to calendar
- Footer shows: "N blocks committed • earliest finish Xh early"

### 4. Progress Page
- Dashboard view of task completion
- Visual progress indicators

### 5. Account Page
- View and manage user profile

### 6. Settings Page
- App preferences and configuration

---

## Team

SOEN 357 - User Interface Design Project

---

## License

This project is for educational purposes as part of Concordia University's SOEN 357 course.
