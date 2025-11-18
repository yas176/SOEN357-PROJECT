# CramGuard - Study Session Planner

A React-based web application that helps students break down assignments into focused work sessions with smart commit blocks.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
-Tailwind (v3)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yas176/SOEN357-PROJECT.git
   cd project357
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

##  Project Structure
```
project357/
├── src/
│   ├── App.jsx           (main file with all pages)
│   ├── main.jsx         
│   └── index.css        
├── public/
├── tailwind.config.js   
├── postcss.config.js    
├── package.json         
├── package-lock.json    
└── README.md   
##  Current Pages

### 1. Welcome Page
- Landing page with features, testimonials, FAQ
- **Entry point** when app loads
- Click "Start Planning" → redirects to Sign Up

### 2. Sign Up Page
- User registration form
- Stores user data in `localStorage`
- After signup → redirects to Sign In page

### 3. Sign In Page
- User authentication
- After successful login → redirects to Progress Page

### 4. Progress Page (TODO)
- **Currently shows a placeholder**
- **This is where you'll implement the main functionality**
- Logged-in user's email is available via `userEmail` prop

