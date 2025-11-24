import { useState, useEffect } from 'react';

function SettingsPage({ }) {

    
    

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 text-left">
            <div className="max-w-6xl mx-auto">
                {/* title */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white">
                            Settings
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Personalize your CramGuard experience
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default SettingsPage;
