import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Check, Edit2, Calendar, Flag, Tag, Clock } from 'lucide-react';
import { Button } from './ui';
import { parseTaskInput, getExampleInputs } from '../utils/parseTaskInput';

export function QuickAdd({ onAddTask, onOpenFullForm }) {
  const [input, setInput] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Parse input with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!input.trim()) {
      setParsedData(null);
      setError(null);
      setShowPreview(false);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    debounceRef.current = setTimeout(() => {
      const result = parseTaskInput(input);
      if (result.success) {
        setParsedData(result.data);
        setError(null);
        setShowPreview(true);
      } else {
        setParsedData(null);
        setError(result.error);
        setShowPreview(false);
      }
      setIsTyping(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedData) {
      onAddTask({
        title: parsedData.title,
        dueDate: parsedData.dueDate,
        priority: parsedData.priority,
        category: parsedData.category,
        effort: parsedData.effort,
        description: '',
      });
      setInput('');
      setParsedData(null);
      setShowPreview(false);
    }
  };

  const handleEditInForm = () => {
    if (parsedData) {
      onOpenFullForm(parsedData);
      setInput('');
      setParsedData(null);
      setShowPreview(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setParsedData(null);
    setError(null);
    setShowPreview(false);
    inputRef.current?.focus();
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No date detected';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-yellow-400 bg-yellow-400/10';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'school': return 'text-blue-400 bg-blue-400/10';
      case 'work': return 'text-purple-400 bg-purple-400/10';
      case 'personal': return 'text-teal-400 bg-teal-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const examples = getExampleInputs();
  const [currentExample, setCurrentExample] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [examples.length]);

  return (
    <div className="mb-6">
      {/* Input Section */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Try: "${examples[currentExample]}"`}
            className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl pl-12 pr-12 py-4 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Typing indicator */}
      {isTyping && (
        <div className="mt-2 text-sm text-slate-500 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          Parsing...
        </div>
      )}

      {/* Error message */}
      {error && !isTyping && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Preview Card */}
      {showPreview && parsedData && !isTyping && (
        <div className="mt-3 p-4 rounded-xl bg-slate-800 border border-slate-700 animate-in slide-in-from-top fade-in duration-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-1">Parsed as:</p>
              <h3 className="text-lg font-semibold text-white">{parsedData.title}</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditInForm}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Edit in full form"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Parsed details */}
          <div className="flex flex-wrap gap-3 mb-4">
            {/* Due date */}
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className={parsedData.dueDate ? 'text-white' : 'text-slate-500'}>
                {formatDueDate(parsedData.dueDate)}
              </span>
            </div>

            {/* Priority */}
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(parsedData.priority)}`}>
              <Flag className="w-3 h-3" />
              {parsedData.priority.charAt(0).toUpperCase() + parsedData.priority.slice(1)}
            </div>

            {/* Category */}
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(parsedData.category)}`}>
              <Tag className="w-3 h-3" />
              {parsedData.category.charAt(0).toUpperCase() + parsedData.category.slice(1)}
            </div>

            {/* Effort */}
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              ~{parsedData.effort}h effort
            </div>
          </div>

          {/* Warning if no date */}
          {!parsedData.dueDate && (
            <div className="mb-4 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
              ⚠️ No due date detected. Click "Edit" to add one manually.
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={!parsedData.dueDate}
              className="flex-1"
            >
              <Check className="w-4 h-4" />
              Add Task
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleEditInForm}
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

