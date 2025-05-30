import React from 'react';
import { Session, AnswerInputType } from '../types';
import { useAppContext } from '../contexts/AppContext';
import StarIcon from './shared/StarIcon';
import { formatSessionNameForDisplay } from '../utils/formatters';

interface SessionCardProps {
  session: Session;
  sessionIndex: number;
  onStartSession: (sessionIndex: number) => void;
  dayId: string;
}

const SessionIcon: React.FC<{ originalSessionName: string }> = ({ originalSessionName }) => {
  const lowerName = originalSessionName.toLowerCase();
  if (lowerName.includes('утренняя')) {
    return <span className="text-3xl mr-3 sm:mr-4" role="img" aria-label="Утро">☀️</span>;
  }
  if (lowerName.includes('дневная')) {
    return <span className="text-3xl mr-3 sm:mr-4" role="img" aria-label="День">⏰</span>;
  }
  return <span className="text-3xl mr-3 sm:mr-4" role="img" aria-label="Сессия">🎯</span>;
};

const SessionCard: React.FC<SessionCardProps> = ({ session, sessionIndex, onStartSession }) => {
  const { getTaskStatus } = useAppContext();

  let completedTasksInSession = 0;
  session.tasks.forEach(task => {
    const status = getTaskStatus(task.id);
    if (status?.isCorrect || (status?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK)) {
      completedTasksInSession++;
    }
  });

  const totalTasksInSession = session.tasks.length;
  const isSessionCompleted = completedTasksInSession === totalTasksInSession;
  const isSessionStarted = completedTasksInSession > 0 && !isSessionCompleted;
  const progressPercentage = totalTasksInSession > 0 ? (completedTasksInSession / totalTasksInSession) * 100 : 0;

  const displayedSessionName = formatSessionNameForDisplay(session.name);

  return (
    <div className={`p-4 sm:p-6 rounded-xl ${
      isSessionCompleted ? 'bg-green-100' : 
      isSessionStarted ? 'bg-yellow-50' : 
      'bg-sky-50'
    } transition-all`}>
      <div className="flex items-center mb-3">
        <SessionIcon originalSessionName={session.name} />
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{displayedSessionName}</h3>
          <p className="text-sm text-slate-600">Примерно: {session.duration}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-slate-700 mb-1">
          Задания: {completedTasksInSession} / {totalTasksInSession}
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              isSessionCompleted ? 'bg-green-500' : 
              isSessionStarted ? 'bg-yellow-500' : 
              'bg-sky-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {session.tasks.map(task => {
           const status = getTaskStatus(task.id);
           const isTaskCorrect = status?.isCorrect || (status?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK);
           return <StarIcon key={task.id} filled={isTaskCorrect ?? false} className="w-5 h-5" />
        })}
      </div>

      {!isSessionCompleted && (
        <button
          onClick={() => onStartSession(sessionIndex)}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-colors
            ${isSessionStarted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
          `}
        >
          {isSessionStarted ? 'Продолжить' : 'Начать!'}
        </button>
      )}
      {isSessionCompleted && (
        <div className="flex items-center justify-center py-3 px-4 rounded-lg bg-green-500 text-white font-semibold text-lg">
          <span className="mr-2" role="img" aria-label="Галочка">✔️</span> Готово!
        </div>
      )}
    </div>
  );
};

export default SessionCard;
