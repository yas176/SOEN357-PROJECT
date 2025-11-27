import React from 'react';
import { Clock, RefreshCw, Check, Calendar } from 'lucide-react';
import { Button } from './ui';

export function BlockCard({ block, onCommit, onSwap, committed = false }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const blockDate = new Date(date);
    blockDate.setHours(0, 0, 0, 0);
    
    if (blockDate.getTime() === today.getTime()) return 'Today';
    if (blockDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const formatTimeRange = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
    
    const formatTime = (date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    };
    
    return `${formatTime(startDate)} – ${formatTime(endDate)}`;
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        committed
          ? 'bg-teal-400/10 border-teal-400/30'
          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Date and time header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="font-semibold text-white">{formatDate(block.date)}</p>
              <p className="text-sm text-slate-400">
                {formatTimeRange(block.startTime, block.duration)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700 text-slate-300">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-sm font-medium">{formatDuration(block.duration)}</span>
          </div>
        </div>
        
        {/* Reason */}
        <p className="text-sm text-slate-400 italic">
          "{block.reason}"
        </p>
        
        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {committed ? (
            <div className="flex items-center gap-2 text-teal-400">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Committed</span>
            </div>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={onCommit}
                className="flex-1"
              >
                <Check className="w-4 h-4" />
                Commit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwap}
              >
                <RefreshCw className="w-4 h-4" />
                Swap
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

