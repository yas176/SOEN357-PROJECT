import { Eye, EyeOff } from 'lucide-react';

function AuthPage({ 
  isSignUp, 
  signupData, 
  setSignupData, 
  signinData, 
  setSigninData, 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword, 
  agreedToTerms, 
  setAgreedToTerms, 
  error, 
  success, 
  onSignup, 
  onSignin, 
  onTogglePage 
}) {
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
            onClick={isSignUp ? onSignup : onSignin}
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
            onClick={onTogglePage}
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

