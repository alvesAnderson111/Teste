import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { DayInfo } from '../types';

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
  bookedDates: string[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onDateSelect, bookedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const days: DayInfo[] = [];
    
    // Add padding days from previous month
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
    for (let i = 0; i < startDayOfWeek; i++) {
      const prevDate = new Date(year, month, 1 - (startDayOfWeek - i));
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isPast: true
      });
    }
    
    // Add current month days
    const today = new Date();
    today.setHours(0,0,0,0);

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      // Check if past
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isPast
      });
    }
    
    return days;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (prev >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)) {
        setCurrentDate(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isBooked = (date: Date) => {
    return bookedDates.includes(date.toDateString());
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Agende seu Orçamento</h2>
        <p className="text-stone-500 text-sm">Selecione o melhor dia para nossa visita técnica.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
        {/* Header */}
        <div className="bg-emerald-800 p-4 flex items-center justify-between text-white">
          <button 
            onClick={handlePrevMonth}
            className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="font-semibold capitalize text-lg">{monthName}</span>
          <button 
            onClick={handleNextMonth}
            className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 p-4 pb-2 text-center border-b border-stone-100">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <div key={i} className="text-xs font-bold text-stone-400 font-mono">{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 p-4">
          {daysInMonth.map((day, idx) => {
            const booked = isBooked(day.date);
            const disabled = !day.isCurrentMonth || day.isPast || booked;
            
            return (
              <button
                key={idx}
                disabled={disabled}
                onClick={() => onDateSelect(day.date)}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all relative
                  ${!day.isCurrentMonth ? 'text-stone-300' : ''}
                  ${day.isToday ? 'border-2 border-emerald-500 text-emerald-700 font-bold' : ''}
                  ${booked && day.isCurrentMonth ? 'bg-stone-200 text-stone-400 cursor-not-allowed line-through' : ''}
                  ${!disabled && !booked ? 'hover:bg-emerald-100 hover:text-emerald-900 text-stone-700' : ''}
                  ${day.isPast && day.isCurrentMonth ? 'text-stone-300 cursor-not-allowed' : ''}
                `}
              >
                {day.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-500"></div>
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-stone-200"></div>
          <span>Ocupado</span>
        </div>
         <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border border-stone-300"></div>
          <span>Livre</span>
        </div>
      </div>
    </div>
  );
};