
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { DailySchedule } from '../types';
import StarIcon from './shared/StarIcon';

const CalendarView: React.FC = () => {
  const { schedule, setSelectedDate, currentMonth, getDayCompletionStatus } = useAppContext();
  const navigate = useNavigate();

  const daysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1));
  };

  const getDaySchedule = (date: Date): DailySchedule | undefined => {
    return schedule.find(day => 
      day.date.getFullYear() === date.getFullYear() &&
      day.date.getMonth() === date.getMonth() &&
      day.date.getDate() === date.getDate()
    );
  };

  const handleDayClick = (date: Date) => {
    const daySchedule = getDaySchedule(date);
    if (daySchedule) {
      setSelectedDate(date);
      navigate(`/day/${daySchedule.id}`);
    }
  };

  const monthDays = daysInMonth(currentMonth);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  // Adjust firstDayOfMonth: Sunday is 0, Monday is 1, etc. We want Monday as 0 for grid.
  const startingOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); 

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-slate-700">
          {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-medium text-slate-600">
        {weekDays.map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: startingOffset }).map((_, index) => (
          <div key={`empty-${index}`} className="rounded-lg aspect-square"></div> // Removed border
        ))}
        {monthDays.map(date => {
          const daySchedule = getDaySchedule(date);
          const completionStatus = daySchedule ? getDayCompletionStatus(daySchedule.id) : undefined;
          const isToday = new Date().toDateString() === date.toDateString(); 
          
          let bgColor = "bg-white hover:bg-sky-100"; // Default slightly lighter hover
          if (daySchedule && completionStatus?.isFullyCompleted) {
            bgColor = "bg-green-200 hover:bg-green-300";
          } else if (daySchedule && (completionStatus?.completedTasks ?? 0) > 0) {
            bgColor = "bg-yellow-100 hover:bg-yellow-200";
          } else if (daySchedule) {
            bgColor = "bg-sky-50 hover:bg-sky-100";
          } else {
            bgColor = "bg-slate-50"; // Non-task days
          }

          return (
            <div
              key={date.toISOString()}
              onClick={() => daySchedule && handleDayClick(date)}
              className={`p-2 sm:p-3 rounded-lg aspect-square flex flex-col justify-between items-center cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${bgColor} ${!daySchedule ? 'opacity-50 cursor-not-allowed' : ''}`} // Removed border and shadows
            >
              <span className={`font-bold ${isToday ? 'text-blue-600' : 'text-slate-800'}`}>
                {date.getDate()}
              </span>
              {daySchedule && (
                <div className="text-xs mt-1 flex flex-wrap justify-center items-center">
                  {completionStatus?.isFullyCompleted && <StarIcon filled={true} className="w-3 h-3" />}
                  {completionStatus && !completionStatus.isFullyCompleted && completionStatus.completedTasks > 0 && (
                    <>
                      {Array(completionStatus.completedTasks).fill(0).map((_,i) => <StarIcon key={`f-${i}`} filled={true} className="w-3 h-3" />)}
                      {Array(completionStatus.totalTasks - completionStatus.completedTasks).fill(0).map((_,i) => <StarIcon key={`e-${i}`} filled={false} className="w-3 h-3" />)}
                    </>
                  )}
                   {completionStatus && completionStatus.completedTasks === 0 && completionStatus.totalTasks > 0 && (
                      Array(completionStatus.totalTasks).fill(0).map((_,i) => <StarIcon key={`z-${i}`} filled={false} className="w-3 h-3"/>)
                   )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;