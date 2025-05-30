import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Task, AnswerInputType } from '../types'; // Импортируем типы

const ParentStatsView: React.FC = () => {
  const { schedule, getDayCompletionStatus, resetAllProgress } = useAppContext();

  let totalDaysWithTasks = 0;
  let totalCompletedDays = 0;
  let totalStarsEarned = 0;
  let totalPossibleTasks = 0;

  schedule.forEach(day => {
    const status = getDayCompletionStatus(day.id);
    if (status && status.totalTasks > 0) {
      totalDaysWithTasks++;
      totalPossibleTasks += status.totalTasks;
      totalStarsEarned += status.completedTasks;
      if (status.isFullyCompleted) {
        totalCompletedDays++;
      }
    }
  });

  const handleResetProgress = () => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс? Это действие удалит все ваши ответы, завершенные дни и полученные достижения. Это действие необратимо.")) {
      resetAllProgress();
    }
  };

  const formatCorrectAnswerForDisplay = (task: Task): string => {
    const { correctAnswer, answerInputType, options } = task;

    if (answerInputType === AnswerInputType.PARENT_CHECK) {
        // Для PARENT_CHECK, correctAnswer часто содержит текстовое описание, что проверять
        return typeof correctAnswer === 'string' ? correctAnswer : "Проверяется родителем";
    }
    if (answerInputType === AnswerInputType.RADIO && options && typeof correctAnswer === 'string') {
        const correctOption = options.find(opt => opt.id === correctAnswer);
        return correctOption ? correctOption.text : String(correctAnswer);
    }
    if (answerInputType === AnswerInputType.CHECKBOX && options && Array.isArray(correctAnswer)) {
        const correctOptionsTexts = correctAnswer
        .map(correctId => options.find(opt => opt.id === correctId)?.text)
        .filter(text => !!text);
        return correctOptionsTexts.length > 0 ? correctOptionsTexts.join(', ') : "Нет верных опций";
    }
    if (answerInputType === AnswerInputType.TWO_NUMBERS_COMMA && Array.isArray(correctAnswer)) {
        return correctAnswer.join(', ');
    }
    if (Array.isArray(correctAnswer)) {
        return correctAnswer.join(' или '); // Если несколько текстовых вариантов
    }
    return String(correctAnswer);
  };


  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">&larr; К календарю</Link>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Статистика Прогресса</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-sky-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-sky-700 mb-2">Общая информация</h3>
          <p className="text-lg text-slate-600">Всего дней с заданиями в июне: <span className="font-bold">{totalDaysWithTasks}</span></p>
          <p className="text-lg text-slate-600">Полностью пройденных дней: <span className="font-bold text-green-600">{totalCompletedDays}</span></p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">Задания</h3>
          <p className="text-lg text-slate-600">Всего возможных заданий: <span className="font-bold">{totalPossibleTasks}</span></p>
          <p className="text-lg text-slate-600">Правильно выполненных заданий (звёздочек): <span className="font-bold text-orange-600">{totalStarsEarned}</span></p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-slate-700 mb-4">Прогресс по дням:</h3>
      <div className="space-y-3 mb-10">
        {schedule.map(day => {
          const status = getDayCompletionStatus(day.id);
          if (!status || status.totalTasks === 0) return null;

          const progressPercentage = status.totalTasks > 0 ? (status.completedTasks / status.totalTasks) * 100 : 0;

          return (
            <div key={day.id} className="p-4 bg-white rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700">
                  {new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} - {day.title}
                </span>
                <span className={`font-bold px-2 py-1 rounded text-sm ${status.isFullyCompleted ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                  {status.completedTasks} / {status.totalTasks}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${status.isFullyCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Раздел с ответами к заданиям */}
      <div className="mt-10 pt-6 border-t border-slate-300">
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">Ответы к заданиям</h3>
        <div className="space-y-6">
          {schedule.map(day => (
            <div key={`answers-${day.id}`} className="p-4 bg-slate-50 rounded-lg">
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                {new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} - {day.title}
              </h4>
              {day.sessions.map((session, sessionIdx) => (
                <div key={`${day.id}-session-${sessionIdx}`} className="mb-4 last:mb-0">
                  <h5 className="text-lg font-semibold text-indigo-700 mb-2 pl-2">{session.name}</h5>
                  <ul className="list-none space-y-2 pl-4">
                    {session.tasks.map(task => (
                      <li key={task.id} className="text-sm text-slate-600 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
                        <p className="text-slate-700 mb-0.5">
                          <span className="font-semibold">Вопрос:</span> {task.text} 
                          {task.category ? <span className="text-xs text-indigo-500 ml-1">({task.category})</span> : ''}
                        </p>
                        <p className="text-blue-600">
                          <span className="font-semibold">Правильный ответ:</span> {formatCorrectAnswerForDisplay(task)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


      <div className="mt-10 pt-6 border-t border-slate-300">
        <h3 className="text-xl font-semibold text-red-700 mb-3">Управление данными</h3>
        <button
          onClick={handleResetProgress}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          aria-label="Сбросить весь сохраненный прогресс в приложении"
        >
          Сбросить весь прогресс
        </button>
        <p className="text-sm text-slate-600 mt-2">
          Внимание: это действие удалит все ваши ответы, завершенные дни и полученные достижения.
        </p>
      </div>
    </div>
  );
};

export default ParentStatsView;