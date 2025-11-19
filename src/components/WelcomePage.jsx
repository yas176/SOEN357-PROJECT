import { useState } from 'react';
import { ArrowRight, FileText, Calendar, MessageSquare, Download, Bell, Shield, ChevronDown } from 'lucide-react';

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

export default WelcomePage;

