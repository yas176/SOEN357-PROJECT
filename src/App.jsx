import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, FileText, Calendar, MessageSquare, Download, Bell, Shield, ChevronDown } from 'lucide-react';

function WelcomePage({ onGetStarted }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">C</span>
            </div>
            <span className="text-white font-semibold text-lg">CramGuard</span>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop cramming. Finish early with commit blocks.
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            CramGuard helps you break down assignments into focused work sessions, so you can stay ahead of deadlines and reduce last-minute stress.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Start Planning
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How it works</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                    <FileText className="text-teal-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">1. Add your tasks</h3>
                  <p className="text-gray-400">
                    Enter assignments with deadlines and estimated hours. No complex setup—just the essentials.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                    <svg className="text-teal-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2. Get commit blocks with reasoning</h3>
                  <p className="text-gray-400">
                    Receive smart time block suggestions with one-line explanations: "Peak focus time before afternoon commitments."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-1">Final project presentation</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Due in 5 days</span>
                  <span>•</span>
                  <span>8h</span>
                </div>
              </div>
              
              <div className="bg-slate-700/50 border border-teal-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Tomorrow, 10:00 AM • 3h</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <svg className="text-teal-400 mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Peak focus time before afternoon commitments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Task sheet</h3>
              <p className="text-gray-400">Simple task entry with deadlines</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Commit blocks</h3>
              <p className="text-gray-400">Focused time slots for each task</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Explainable suggestions</h3>
              <p className="text-gray-400">Understand why each block fits</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Calendar export</h3>
              <p className="text-gray-400">.ics files for any calendar app</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bell className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Reminders</h3>
              <p className="text-gray-400">24h and 2h advance alerts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-teal-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy controls</h3>
              <p className="text-gray-400">Your data stays private</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Trusted by students everywhere</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-gray-300 mb-4">
                "I finally finished my thesis draft 3 days early. The commit blocks kept me on track without feeling overwhelming."
              </p>
              <p className="text-sm text-gray-400">— Sarah, Computer Science</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-gray-300 mb-4">
                "The one-line reasoning for each block helps me trust the schedule. I don't second-guess when to work anymore."
              </p>
              <p className="text-sm text-gray-400">— Marcus, Business</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-gray-300 mb-4">
                "Exporting to Google Calendar with reminders is perfect. I can focus on my work instead of juggling apps."
              </p>
              <p className="text-sm text-gray-400">— Priya, Engineering</p>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8">Used by members of</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently asked questions</h2>
          
          <div className="space-y-4">
            {[
              { q: 'How does CramGuard create commit blocks?', a: 'CramGuard analyzes your tasks and deadlines to create optimized time blocks during your peak productivity times.' },
              { q: 'Can I use it with my existing calendar?', a: 'Yes! CramGuard exports .ics files that work with Google Calendar, Apple Calendar, and Outlook.' },
              { q: 'Is my data private?', a: 'Absolutely. Your study data stays private and is only stored locally in your browser.' },
              { q: 'Do I need to pay?', a: 'CramGuard is completely free to use for all students.' }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-800 rounded-lg border border-slate-700">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-teal-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to stop cramming?</h2>
          <p className="text-lg text-slate-700 mb-8">Join students who finish assignments early and reduce last-minute stress.</p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Start Planning
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">C</span>
            </div>
            <span className="text-gray-400 text-sm">© 2025 CramGuard</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield size={16} />
            <span>Your data stays private</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProgressPage({ onLogout, userEmail }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">C</span>
          </div>
          <span className="text-white font-semibold text-lg">CramGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{userEmail}</span>
          <button
            onClick={onLogout}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to CramGuard!</h1>
          <p className="text-gray-400 text-lg mb-8">Your study progress page is coming soon.</p>
          <div className="bg-slate-800 rounded-xl p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
            <ul className="text-left text-gray-400 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Account created successfully</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Signed in and ready to go</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-600 mt-1">○</span>
                <span>Start tracking your study sessions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [signinData, setSigninData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cramguard_currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignup = () => {
    setError('');
    setSuccess('');
    
    if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('cramguard_users') || '[]');
    
    if (users.find(u => u.email === signupData.email)) {
      setError('Email already registered');
      return;
    }
    
    const newUser = {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password
    };
    
    users.push(newUser);
    localStorage.setItem('cramguard_users', JSON.stringify(users));
    
    setSignupData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setAgreedToTerms(false);
    setSuccess('Account created successfully! Please sign in.');
    setCurrentPage('signin');
    
    setTimeout(() => setSuccess(''), 5000);
  };

  const handleSignin = () => {
    setError('');
    setSuccess('');
    
    if (!signinData.email || !signinData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('cramguard_users') || '[]');
    
    const user = users.find(
      u => u.email === signinData.email && u.password === signinData.password
    );
    
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    
    localStorage.setItem('cramguard_currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setSigninData({ email: '', password: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('cramguard_currentUser');
    setCurrentUser(null);
    setCurrentPage('welcome');
  };

  // If user is logged in, show progress page
  if (currentUser) {
    return <ProgressPage onLogout={handleLogout} userEmail={currentUser.email} />;
  }

  // Show welcome page
  if (currentPage === 'welcome') {
    return <WelcomePage onGetStarted={() => setCurrentPage('signup')} />;
  }

  // Show auth pages (signup/signin)
  const isSignUp = currentPage === 'signup';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
          <span className="text-slate-900 font-bold text-lg">C</span>
        </div>
        <span className="text-white font-semibold text-lg">CramGuard</span>
      </div>

      {/* Theme Toggle */}
      <button className="absolute top-6 right-6 text-gray-400 hover:text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-400 rounded-2xl flex items-center justify-center">
            <span className="text-slate-900 font-bold text-3xl">C</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isSignUp 
            ? 'Start planning your study sessions with CramGuard'
            : 'Sign in to continue to CramGuard'}
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg px-4 py-3 mb-4 text-sm">
            {success}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full name"
              value={signupData.fullName}
              onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
              className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          )}

          <input
            type="email"
            placeholder={isSignUp ? "Email address" : "Enter your email"}
            value={isSignUp ? signupData.email : signinData.email}
            onChange={(e) => isSignUp 
              ? setSignupData({...signupData, email: e.target.value})
              : setSigninData({...signinData, email: e.target.value})
            }
            className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={isSignUp ? "Password" : "Enter your password"}
              value={isSignUp ? signupData.password : signinData.password}
              onChange={(e) => isSignUp 
                ? setSignupData({...signupData, password: e.target.value})
                : setSigninData({...signinData, password: e.target.value})
              }
              className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isSignUp && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {isSignUp && (
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-600 bg-slate-700 text-teal-400 focus:ring-teal-400 focus:ring-offset-slate-800"
              />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-teal-400 hover:text-teal-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-teal-400 hover:text-teal-300">
                  Privacy Policy
                </a>
              </span>
            </label>
          )}

          <button
            onClick={isSignUp ? handleSignup : handleSignin}
            className="w-full bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold rounded-lg px-4 py-3 transition-colors"
          >
            {isSignUp ? 'Create account' : 'Sign in with Email'}
          </button>

          {!isSignUp && (
            <div className="text-center">
              <a href="#" className="text-teal-400 hover:text-teal-300 text-sm">
                Forgot your password?
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="text-gray-500 text-sm">or {isSignUp ? 'sign up' : ''} with</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V8.6h11.4V24zM24 24H12.6V8.6H24V24zM11.4 0v7.2H0V0h11.4zm12.6 0v7.2H12.6V0H24z"/>
            </svg>
            Continue with Microsoft
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By {isSignUp ? 'creating an account' : 'signing in'}, you agree to anonymous analytics to improve your experience. Your study data remains private and secure.
        </p>

        {/* Toggle */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {isSignUp ? 'Already have an account? ' : 'New here? '}
          <button
            onClick={() => {
              setCurrentPage(isSignUp ? 'signin' : 'signup');
              setError('');
              setSuccess('');
            }}
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  );
}