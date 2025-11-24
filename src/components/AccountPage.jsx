import { useState, useEffect } from 'react';

function AccountPage({ currentUser, onUpdateCurrentUser}) {

    const [fullName, setFullName] = useState(currentUser?.fullName);
    const [email, setEmail] = useState(currentUser?.email);
    const [role, setRole] = useState(currentUser?.role); 
    const [major, setMajor] = useState(currentUser?.major); 
    const [yearMajor, setYearMajor] = useState(currentUser?.yearMajor); 
    const [timeZone, setTimeZone] = useState(currentUser?.timeZone); 


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const TIMEZONES = [
        { value: 'America/New_York', label: 'Eastern Time (ET) - New York, USA' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - Los Angeles, USA' },
        { value: 'Europe/London', label: 'London (GMT/BST)' },
        { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
        { value: 'Asia/Kolkata', label: 'Kolkata (IST) - India' },
        { value: 'Asia/Shanghai', label: 'Shanghai (CST) - China' },
        { value: 'Asia/Tokyo', label: 'Tokyo (JST) - Japan' },
    ];
    
    

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 text-left">
            <div className="max-w-6xl mx-auto">
                {/* title */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white">
                            Your Account
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Manage your profile
                        </p>
                    </div>
                </div>

                {/*profile information section */}
                <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8 space-y-6">
                    <h1 className="text-2xl font-bold text-white flex space-x-3">
                        <img
                            src="/profile-icon.svg"
                            alt="Profile icon"
                            className="w-9 h-9 opacity-90 "
                        />
                        <span>Profile</span>
                    </h1>
                    <div >
                        <label className="block text-m font-semibold text-white mb-2">
                            Display name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-m font-semibold text-white mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                        This can be changed anytime.
                        </p>
                        
                    </div>
                    <div>
                        <label className="block text-m font-semibold text-white mb-2">
                            Occupation / Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400">
                            <option value="student">Student</option>
                            <option value="teachingAssistant">Teaching Assistant</option>
                            <option value="workingStudent">Working Student</option>
                            <option value="other">Other</option>
                        </select>
                        
                    </div>
                    <div className= "grid md:grid-cols-2 gap-10">
                        <div>
                            <label className="block text-m font-semibold text-white mb-2">
                                Major (optional)
                            </label>
                            <input
                                type="text"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                        <div>
                            <label className="block text-m font-semibold text-white mb-2">
                                Year (optional)
                            </label>
                            <input
                                type="text"
                                value={yearMajor}
                                onChange={(e) => setYearMajor(e.target.value)}
                                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-m font-semibold text-white mb-2">
                            Time zone (optional)
                        </label>
                        <select
                            value={timeZone}
                            onChange={(e) => setTimeZone(e.target.value)}
                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400">
                            {TIMEZONES.map(timezones => (
                                <option key={timezones.value} value={timezones.value}>{timezones.label}</option>
                            ))}
                        </select>
                        
                    </div>
                    <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Save Changes
                            </button>
                    </div>  
                </section>

                {/*security section */}
                <section className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 mb-8 space-y-6">
                    <h1 className="text-2xl font-bold text-white flex space-x-3">
                        <img
                            src="/security-icon.svg"
                            alt="Security icon"
                            className="w-9 h-9 opacity-90 "
                        />
                        <span>Security</span>
                    </h1>

                    {/*connected accounts */}
                    <div className="space-y-6">
                        <label className="block text-lg font-semibold text-white mb-2">
                                Connected Accounts
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-700 text-white rounded-lg px-4 py-3">
                            <div >
                                <label className="block text-lg text-white font-semibold mb-2">
                                        Google
                                </label>
                                <p className="text-m text-gray-250">
                                    Connected
                                </p>
                            </div>
                            <button
                                    className="bg-slate-500 text-slate-900 hover:text-white font-semibold px-2 py-2 rounded-lg transition-colors">
                                    Disconnect
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-700 text-white rounded-lg px-4 py-3">
                            <div>
                                <label className="block text-lg text-white font-semibold mb-2">
                                        Microsoft
                                </label>
                                <p className="text-m text-gray-250">
                                    Not connected
                                </p>
                                
                            </div>
                            <button
                                    className="bg-slate-500 hover:text-slate-900 text-white font-semibold px-2 py-2 rounded-lg transition-colors">
                                    Connect
                            </button>
                        </div>
                    </div>


                    {/*Change password */}
                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-white mb-2">
                                Change Password
                        </label>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Current password
                            </label>
                            <input
                                type="text"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            />
                        </div>
                        <div >
                            <label className="block text-sm font-semibold text-white mb-2">
                                New password
                            </label>
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Confirm new password
                            </label>
                            <input
                                type="text"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Update Password
                            </button>
                        </div> 
                    </div>
                    
                    
                     
                </section>


                {/*delete account section */}
                <section className="bg-slate-800 border border-red-950 rounded-xl px-6 py-5 mb-8 space-y-6">
                    <h1 className="text-2xl font-bold text-white flex space-x-3">
                        <img
                            src="/danger-circle-linear.svg"
                            alt="Danger Circle icon"
                            className="w-9 h-9 opacity-90 "
                        />
                        <span>Danger Zone</span>
                    </h1>

                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-950/40 rounded-lg px-4 py-3">
                        <div>
                            <label className="block text-lg text-red-200 font-semibold mb-2">
                                    Delete Account
                            </label>
                            <p className="text-m text-red-300">
                            Permanently delete your account and all data associated to it. This action can't be undone.
                            </p>
                        </div>
                        <button
                                className="bg-red-600 hover:bg-red-700 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Delete Account
                        </button>
                    </div>
                    
                    
                     
                </section>

            </div>
        </main>
    </div>
  );
}

export default AccountPage;
