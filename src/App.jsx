import { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import { PlannerView } from './components/PlannerPage.jsx';
import ProgressPage from './components/ProgressPage';
import Header from './components/Header';
import AccountPage from './components/AccountPage';
import SettingsPage from './components/SettingsPage.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [loggedInPage, setLoggedInPage] = useState('planner');
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
  const [refreshKey, setRefreshKey] = useState(0);

  

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
    setLoggedInPage('planner');
  };

  const handleTogglePage = () => {
    setCurrentPage(currentPage === 'signup' ? 'signin' : 'signup');
    setError('');
    setSuccess('');
  };

  const navigateLoggedIn = (view) => {
        setLoggedInPage(view);
        if (view === 'progress' || view === 'planner') {
            setRefreshKey(prev => prev + 1); 
        }
  };


  // If user is logged in, show appropriate page
  if (currentUser) {
    let contentComponent;

    // Planner page (default)
    if (loggedInPage === 'planner') {
        contentComponent = (
            <PlannerView 
                key={refreshKey}
                userEmail={currentUser.email} 
            />
        );
    }
      
    // Settings page
    else if (loggedInPage === 'settings') {
        contentComponent = (
            <SettingsPage
                userEmail={currentUser.email}
                onNavigate={navigateLoggedIn}
            />
        );
    }

    // Account page
    else if (loggedInPage === 'account') {
        contentComponent = <AccountPage 
        currentUser={currentUser} />;
    }
    
    // Progress page (default fallback)
    else { 
        contentComponent = (
            <ProgressPage 
                key={refreshKey} 
                onLogout={handleLogout} 
                userEmail={currentUser.email} 
            />
        );
    }

    // Header is always shown when logged in
    return (
        <div className="min-h-screen bg-slate-900">
            <Header 
                userEmail={currentUser.email} 
                onLogout={handleLogout} 
                currentPage={loggedInPage}
                onNavigate={navigateLoggedIn}
            />
            <main>
                {contentComponent}
            </main>
        </div>
    );
  }

  // Show welcome page
  if (currentPage === 'welcome') {
    return <WelcomePage onGetStarted={() => setCurrentPage('signup')} />;
  }

  // Show auth pages (signup/signin)
  const isSignUp = currentPage === 'signup';

  return (
    <AuthPage
      isSignUp={isSignUp}
      signupData={signupData}
      setSignupData={setSignupData}
      signinData={signinData}
      setSigninData={setSigninData}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      agreedToTerms={agreedToTerms}
      setAgreedToTerms={setAgreedToTerms}
      error={error}
      success={success}
      onSignup={handleSignup}
      onSignin={handleSignin}
      onTogglePage={handleTogglePage}
    />
  );
}
