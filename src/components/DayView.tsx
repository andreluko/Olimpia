
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import TaskCard from './TaskCard';
import SessionCard from './SessionCard';
import { DailySchedule, Session, Task, AnswerInputType } from '../types';
import { formatSessionNameForDisplay } from '../utils/formatters';

const DayView: React.FC = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const { schedule, getTaskStatus } = useAppContext();
  
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null); // Renamed
  const [currentTaskInBlockIndex, setCurrentTaskInBlockIndex] = useState<number>(0); // Renamed
  const [showBlockCompleteMessage, setShowBlockCompleteMessage] = useState<boolean>(false);

  const dayData = useMemo(() => schedule.find(d => d.id === dayId), [schedule, dayId]);

  useEffect(() => {
    setActiveBlockIndex(null); // Renamed
    setCurrentTaskInBlockIndex(0); // Renamed
    setShowBlockCompleteMessage(false);
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

  const handleStartBlockOfTasks = (sessionIdx: number) => {
    setActiveBlockIndex(sessionIdx); // Renamed
    const firstIncompleteTask = sessions[sessionIdx].tasks.findIndex(task => {
        const status = getTaskStatus(task.id);
        return !status || (status.isCorrect === null || 
                          (status.isCorrect === false && !(task.answerInputType === AnswerInputType.PARENT_CHECK && status.answer === 'completed'))
                         );
    });
    setCurrentTaskInBlockIndex(firstIncompleteTask !== -1 ? firstIncompleteTask : 0); // Renamed
    setShowBlockCompleteMessage(false);
  };

  const currentBlock: Session | null = activeBlockIndex !== null ? sessions[activeBlockIndex] : null; // Renamed
  const currentTask: Task | null = currentBlock ? currentBlock.tasks[currentTaskInBlockIndex] : null; // Renamed

  const checkAllTasksInBlockCompleted = (sessionIdx: number): boolean => {
    if (sessionIdx < 0 || sessionIdx >= sessions.length) return false;
    return sessions[sessionIdx].tasks.every(task => {
        const status = getTaskStatus(task.id);
        return status?.isCorrect || (task.answerInputType === AnswerInputType.PARENT_CHECK && status?.answer === 'completed');
    });
  }

  const handleNextTask = () => {
    if (currentBlock && currentTaskInBlockIndex < currentBlock.tasks.length - 1) { // Renamed
      setCurrentTaskInBlockIndex(prev => prev + 1); // Renamed
    } else if (currentBlock && activeBlockIndex !== null) { // Renamed
      setShowBlockCompleteMessage(true);
    }
  };

  const handlePrevTask = () => {
    if (currentTaskInBlockIndex > 0) { // Renamed
      setCurrentTaskInBlockIndex(prev => prev - 1); // Renamed
    }
  };
  
  const handleReturnToBlocksOfTasks = () => {
    setActiveBlockIndex(null); // Renamed
    setShowBlockCompleteMessage(false);
  };

  const handleStartNextBlockOfTasks = () => { 
    if (activeBlockIndex !== null && activeBlockIndex < sessions.length - 1) {
      let nextIndexToStart = -1;
      for (let i = activeBlockIndex + 1; i < sessions.length; i++) {
          if (!checkAllTasksInBlockCompleted(i)) {
              nextIndexToStart = i;
              break;
          }
      }
      if (nextIndexToStart !== -1) {
          handleStartBlockOfTasks(nextIndexToStart);
      } else {
          handleReturnToBlocksOfTasks();
      }
    } else {
      handleReturnToBlocksOfTasks(); 
    }
  };
  
  let nextUncompletedBlockIndex = -1; 
  if (activeBlockIndex !== null) {
    for (let i = activeBlockIndex + 1; i < sessions.length; i++) {
        if (!checkAllTasksInBlockCompleted(i)) {
            nextUncompletedBlockIndex = i;
            break;
        }
    }
  }

  const dayHeader = (
    <div className="mb-6 p-4 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-lg">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-2 inline-block">&larr; К календарю</Link>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-600 text-lg">{new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
    </div>
  );

  if (activeBlockIndex === null) {
    return (
      <div className="w-full">
        {dayHeader}
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">Задания на сегодня:</h3>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <SessionCard 
              key={index}
              session={session}
              sessionIndex={index}
              onStartSession={handleStartBlockOfTasks} 
              dayId={currentDayId}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentTask && currentBlock) { // Renamed
    const displayedBlockName = formatSessionNameForDisplay(currentBlock.name); // Renamed
    if (showBlockCompleteMessage) {
      return (
        <div className="w-full text-center p-4 sm:p-8">
          {dayHeader}
          <div className="bg-green-50 p-6 sm:p-8 rounded-xl">
            <h3 className="text-3xl font-bold text-green-600 mb-4">🎉 Отлично! 🎉</h3>
            <p className="text-xl text-slate-700 mb-6">Задания "{displayedBlockName}" завершены!</p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                    onClick={handleReturnToBlocksOfTasks}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
                >
                    К списку заданий
                </button>
                {nextUncompletedBlockIndex !== -1 && ( 
                     <button 
                        onClick={handleStartNextBlockOfTasks} 
                        className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg"
                    >
                        Следующие задания!
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
             {displayedBlockName} ({currentBlock.duration}) - Задание {currentTaskInBlockIndex + 1} из {currentBlock.tasks.length} 
          </p>
        </div>
        
        <TaskCard task={currentTask} dayId={currentDayId} />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <button 
            onClick={handlePrevTask}
            disabled={currentTaskInBlockIndex === 0} // Renamed
            className="w-full sm:w-auto px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
          >
            Назад
          </button>
          <button 
            onClick={handleReturnToBlocksOfTasks}
            className="w-full sm:w-auto px-6 py-2 bg-amber-300 text-amber-800 rounded-lg hover:bg-amber-400 transition-colors text-md"
            >
             К списку заданий
          </button>
          <button 
            onClick={handleNextTask}
            className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg transition-colors text-lg ${
                (currentTaskInBlockIndex === currentBlock.tasks.length - 1)  // Renamed
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {currentTaskInBlockIndex === currentBlock.tasks.length - 1 ? 'Завершить задания' : 'Далее'}
          </button>
        </div>
      </div>
    );
  }
  
  return <p className="text-center text-slate-500">Загрузка данных дня...</p>;
};

export default DayView;
