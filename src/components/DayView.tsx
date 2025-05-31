import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import TaskCard from './TaskCard';
import SessionCard from './SessionCard';
import { Session, Task } from '../types';
import { formatSessionNameForDisplay } from '../utils/formatters';

const DayView: React.FC = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const { schedule, getTaskStatus } = useAppContext();
  
  const [activeSessionIndex, setActiveSessionIndex] = useState<number | null>(null);
  const [currentTaskInSessionIndex, setCurrentTaskInSessionIndex] = useState<number>(0);
  const [showSessionCompleteMessage, setShowSessionCompleteMessage] = useState<boolean>(false);

  const dayData = useMemo(() => schedule.find(d => d.id === dayId), [schedule, dayId]);

  useEffect(() => {
    setActiveSessionIndex(null);
    setCurrentTaskInSessionIndex(0);
    setShowSessionCompleteMessage(false);
  }, [dayId]);

  if (!dayData) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold text-red-500">День не найден!</h2>
        <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Вернуться к календарю
        </Link>
      </div>
    );
  }

  const { title, date, sessions, id: currentDayId } = dayData;

  const handleStartSession = (sessionIdx: number) => {
    setActiveSessionIndex(sessionIdx);
    const firstIncompleteTask = sessions[sessionIdx].tasks.findIndex(task => {
        const status = getTaskStatus(task.id);
        return !status || (status.isCorrect === null || status.isCorrect === false && task.answerInputType !== 'parent_check');
    });
    setCurrentTaskInSessionIndex(firstIncompleteTask !== -1 ? firstIncompleteTask : 0);
    setShowSessionCompleteMessage(false);
  };

  const currentSession: Session | null = activeSessionIndex !== null ? sessions[activeSessionIndex] : null;
  const currentTask: Task | null = currentSession ? currentSession.tasks[currentTaskInSessionIndex] : null;

  const checkAllTasksInSessionCompleted = (sessionIdx: number): boolean => {
    if (sessionIdx >= sessions.length) return false;
    return sessions[sessionIdx].tasks.every(task => {
        const status = getTaskStatus(task.id);
        return status?.isCorrect || (task.answerInputType === 'parent_check' && status?.answer === 'completed');
    });
  }

  const handleNextTask = () => {
    if (currentSession && currentTaskInSessionIndex < currentSession.tasks.length - 1) {
      setCurrentTaskInSessionIndex(prev => prev + 1);
    } else if (currentSession && activeSessionIndex !== null) {
      const allSessionTasksDone = sessions[activeSessionIndex].tasks.every(task => {
        const status = getTaskStatus(task.id);
        return status?.isCorrect || (task.answerInputType === 'parent_check' && status?.answer === 'completed');
      });

      setShowSessionCompleteMessage(allSessionTasksDone);
    }
  };

  const handlePrevTask = () => {
    if (currentTaskInSessionIndex > 0) {
      setCurrentTaskInSessionIndex(prev => prev - 1);
    }
  };
  
  const handleReturnToSessions = () => {
    setActiveSessionIndex(null);
    setShowSessionCompleteMessage(false);
  };

  const handleStartNextSession = () => {
    if (activeSessionIndex !== null && activeSessionIndex < sessions.length - 1) {
      let nextIndexToStart = -1;
      for (let i = activeSessionIndex + 1; i < sessions.length; i++) {
          if (!checkAllTasksInSessionCompleted(i)) {
              nextIndexToStart = i;
              break;
          }
      }
      if (nextIndexToStart !== -1) {
          handleStartSession(nextIndexToStart);
      } else {
          handleReturnToSessions();
      }
    } else {
      handleReturnToSessions(); 
    }
  };
  
  let nextUncompletedSessionIndex = -1;
  if (activeSessionIndex !== null) {
    for (let i = activeSessionIndex + 1; i < sessions.length; i++) {
        if (!checkAllTasksInSessionCompleted(i)) {
            nextUncompletedSessionIndex = i;
            break;
        }
    }
  }

  const dayHeader = (
    <div className="mb-4 p-3 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-lg">
      <div className="flex items-baseline gap-x-3">
        <Link to="/" className="text-blue-600 hover:underline text-xs sm:text-sm whitespace-nowrap">&larr; К календарю</Link>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 leading-tight">{title}</h2>
        <p className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">{new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>
    </div>
  );

  if (activeSessionIndex === null) {
    return (
      <div className="w-full">
        {dayHeader}
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">Сессии на сегодня:</h3>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <SessionCard 
              key={index}
              session={session}
              sessionIndex={index}
              onStartSession={handleStartSession}
              dayId={currentDayId}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentTask && currentSession) {
    const displayedSessionName = formatSessionNameForDisplay(currentSession.name);
    if (showSessionCompleteMessage) {
      return (
        <div className="w-full text-center p-4 sm:p-8">
          {dayHeader}
          <div className="bg-green-50 p-6 sm:p-8 rounded-xl">
            <h3 className="text-3xl font-bold text-green-600 mb-4">🎉 Отлично! 🎉</h3>
            <p className="text-xl text-slate-700 mb-6">Сессия "{displayedSessionName}" завершена!</p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                    onClick={handleReturnToSessions}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
                >
                    К списку сессий
                </button>
                {nextUncompletedSessionIndex !== -1 && (
                     <button 
                        onClick={handleStartNextSession}
                        className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg"
                    >
                        Следующая сессия!
                    </button>
                )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        {dayHeader}
        <div className="mb-4 p-3 bg-indigo-50 rounded-md">
          <p className="text-indigo-700 font-semibold text-lg">
             {displayedSessionName} ({currentSession.duration}) - Задание {currentTaskInSessionIndex + 1} из {currentSession.tasks.length}
          </p>
        </div>
        
        <TaskCard task={currentTask} dayId={currentDayId} />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <button 
            onClick={handlePrevTask}
            disabled={currentTaskInSessionIndex === 0}
            className="w-full sm:w-auto px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
          >
            Назад
          </button>
          <button 
            onClick={handleReturnToSessions}
            className="w-full sm:w-auto px-6 py-2 bg-amber-300 text-amber-800 rounded-lg hover:bg-amber-400 transition-colors text-md"
            >
             К списку сессий
          </button>
          <button 
            onClick={handleNextTask}
            className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg transition-colors text-lg ${
                (currentTaskInSessionIndex === currentSession.tasks.length - 1) 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {currentTaskInSessionIndex === currentSession.tasks.length - 1 ? 'Завершить сессию' : 'Далее'}
          </button>
        </div>
      </div>
    );
  }
  
  return <p className="text-center text-slate-500">Загрузка данных дня...</p>;
};

export default DayView;