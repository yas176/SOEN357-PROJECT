function Header({ userEmail, onLogout, onAddTask, currentPage, onNavigate }) {
  const NavLink = ({ view, label, }) => {
    const isActive = currentPage === view;
    const baseClasses = "flex items-center gap-1 p-2 text-base transition-colors";
    const activeClasses = "text-white font-semibold border-b-2 border-teal-400";
    const inactiveClasses = "text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-400/50";

    return (
      <button
        onClick={() => onNavigate(view)}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <span>{label}</span>
      </button>
    );
  };

  const navigationLinks = [
    { view: 'planner', label: 'Planner' },
    { view: 'settings', label: 'Settings' },
    { view: 'account', label: 'Account' },
  ];
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">C</span>
          </div>
          <span className="text-white font-semibold text-lg">CramGuard</span>
        </div>

        <nav className="flex items-center gap-6 h-full">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.view}
              view={link.view}
              label={link.label}
            />
          ))}
        </nav>


      </div>
      
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('progress')}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Task Dashboard
        </button>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Add Task
          </button>
        )}
        <span className="text-gray-400 text-sm">{userEmail}</span>
        <button
          onClick={onLogout}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;

