function Header({ userEmail, onLogout, onAddTask }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
          <span className="text-slate-900 font-bold text-lg">C</span>
        </div>
        <span className="text-white font-semibold text-lg">CramGuard</span>
      </div>
      <div className="flex items-center gap-4">
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

