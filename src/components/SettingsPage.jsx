import { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  quietStart: '22:00',       // 10:00 PM
  quietEnd: '08:00',         // 08:00 AM
  earliestStudy: '08:00',    // 08:00 AM
  latestStudy: '22:00',      // 10:00 PM
  textSize: 'medium',        // 'small' | 'medium' | 'large'
  highContrast: false,
  pushNotifications: false,
};

function SettingsPage({ userEmail, onNavigate }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'reset' | 'error' | null

  /
  useEffect(() => {
    if (!userEmail) return;

    try {
      const raw = localStorage.getItem('cramguard_settings');
      if (!raw) return;

      const allSettings = JSON.parse(raw);
      if (allSettings && allSettings[userEmail]) {
        setSettings({ ...DEFAULT_SETTINGS, ...allSettings[userEmail] });
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  }, [userEmail]);

  const updateField = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleField = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    if (!userEmail) {
      alert('No user is logged in. Please sign in again.');
      return;
    }

    try {
      const raw = localStorage.getItem('cramguard_settings');
      let allSettings = {};
      if (raw) {
        allSettings = JSON.parse(raw);
      }

      allSettings[userEmail] = settings;
      localStorage.setItem('cramguard_settings', JSON.stringify(allSettings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setSaveStatus('reset');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleGoToAccount = () => {
    if (onNavigate) {
      onNavigate('account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 text-left">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                Settings
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Customize your CramGuard experience
              </p>
            </div>

            {saveStatus && (
              <span
                className={
                  saveStatus === 'error'
                    ? 'text-sm text-red-400'
                    : 'text-sm text-teal-300'
                }
              >
                {saveStatus === 'saved' && 'Settings saved'}
                {saveStatus === 'reset' && 'Settings reset to defaults'}
                {saveStatus === 'error' && 'Failed to save settings'}
              </span>
            )}
          </div>

          {/* Manage profile shortcut */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 mb-8">
            <button
              type="button"
              onClick={handleGoToAccount}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  Manage your profile
                </p>
                <p className="text-xs text-gray-400">
                  Update your account details, password, and connected accounts
                </p>
              </div>
              <span className="text-gray-400 text-lg">{'›'}</span>
            </button>
          </section>

          {/* Study Preferences */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300 text-sm">
                ⏱
              </span>
              <h2 className="text-lg md:text-xl font-semibold text-white">
                Study Preferences
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quiet hours start */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Quiet hours start
                </label>
                <input
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => updateField('quietStart', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Quiet hours end */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Quiet hours end
                </label>
                <input
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => updateField('quietEnd', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Earliest study time */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Earliest study time
                </label>
                <input
                  type="time"
                  value={settings.earliestStudy}
                  onChange={(e) => updateField('earliestStudy', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Latest study time */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Latest study time
                </label>
                <input
                  type="time"
                  value={settings.latestStudy}
                  onChange={(e) => updateField('latestStudy', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              CramGuard won&apos;t suggest commit blocks during quiet hours or
              outside your study window (in future versions).
            </p>
          </section>

          {/* Accessibility */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300 text-sm">
                👁
              </span>
              <h2 className="text-lg md:text-xl font-semibold text-white">
                Accessibility
              </h2>
            </div>

            {/* Text size */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Text size
              </label>
              <select
                value={settings.textSize}
                onChange={(e) => updateField('textSize', e.target.value)}
                className="w-full md:w-72 bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="small">Small</option>
                <option value="medium">Medium (Default)</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* High contrast mode */}
            <label className="flex items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  High contrast mode
                </p>
                <p className="text-xs text-gray-400">
                  Increase color contrast for better readability.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={() => toggleField('highContrast')}
                className="w-5 h-5 rounded border-gray-600 bg-slate-700 text-teal-400 focus:ring-teal-400 focus:ring-offset-slate-800"
              />
            </label>
          </section>

          {/* Notifications */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300 text-sm">
                🔔
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              Notifications
            </h2>

            <label className="flex items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Push notifications
                </p>
                <p className="text-xs text-gray-400">
                  Get reminders before commit blocks start (prototype only, no
                  real browser notifications).
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => toggleField('pushNotifications')}
                className="w-5 h-5 rounded border-gray-600 bg-slate-700 text-teal-400 focus:ring-teal-400 focus:ring-offset-slate-800"
              />
            </label>
          </section>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
