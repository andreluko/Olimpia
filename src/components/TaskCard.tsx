
import React, { useState, useEffect, FormEvent } from 'react';
import { Task, AnswerInputType, TaskOption, UserAnswer } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface TaskCardProps {
  task: Task;
  dayId: string; 
}

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const getInputPlaceholder = (task: Task, currentTaskStatus: UserAnswer | undefined): string | undefined => {
  if (currentTaskStatus?.isCorrect || (task.answerInputType === AnswerInputType.PARENT_CHECK && currentTaskStatus?.answer === 'completed')) {
    return undefined; 
  }

  switch (task.answerInputType) {
    case AnswerInputType.TEXT:
    case AnswerInputType.TEXTAREA:
      const correctAnswerString = String(task.correctAnswer);
      if (correctAnswerString.match(/[,;-]/) && correctAnswerString.length < 40) {
        return correctAnswerString; 
      }
      if (correctAnswerString === correctAnswerString.toLowerCase() && correctAnswerString !== correctAnswerString.toUpperCase() && correctAnswerString.length > 0) {
        return "ответ маленькими буквами";
      }
      if (correctAnswerString === correctAnswerString.toUpperCase() && correctAnswerString !== correctAnswerString.toLowerCase() && correctAnswerString.length > 0) {
        return "ОТВЕТ БОЛЬШИМИ БУКВАМИ";
      }
      if (correctAnswerString.length > 0 && 
          correctAnswerString[0] === correctAnswerString[0].toUpperCase() && 
          correctAnswerString[0] !== correctAnswerString[0].toLowerCase() &&
          (correctAnswerString.length === 1 || correctAnswerString.substring(1) !== correctAnswerString.substring(1).toUpperCase())) {
        return "Ответ с большой буквы";
      }
      return "Твой ответ";

    case AnswerInputType.NUMBER:
      return "Введи число";

    case AnswerInputType.TWO_NUMBERS_COMMA:
      if (Array.isArray(task.correctAnswer) && task.correctAnswer.length === 2 && typeof task.correctAnswer[0] === 'number' && typeof task.correctAnswer[1] === 'number') {
        return (task.correctAnswer as number[]).join(', ');
      }
      return "Число1, Число2"; 

    default:
      return undefined;
  }
};


const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { saveAnswer, getTaskStatus } = useAppContext();
  const [userAnswer, setUserAnswer] = useState<any>('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' } | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState<number>(0);

  const taskStatus = getTaskStatus(task.id);

  useEffect(() => {
    setIncorrectAttempts(0); 
    if (taskStatus) {
      if (task.answerInputType === AnswerInputType.CHECKBOX) {
        setSelectedCheckboxes(taskStatus.answer || []);
      } else {
        setUserAnswer(taskStatus.answer || '');
      }
      if (taskStatus.isCorrect !== null) {
        setFeedback({ message: taskStatus.isCorrect ? 'Правильно!' : 'Попробуй еще раз!', type: taskStatus.isCorrect ? 'correct' : 'incorrect' });
      } else {
        setFeedback(null);
      }
    } else {
      setUserAnswer('');
      setSelectedCheckboxes([]);
      setFeedback(null);
    }
  }, [task.id, taskStatus, task.answerInputType]);

  const normalizeAnswer = (ans: string): string => {
    return ans.toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  };
  
  const normalizeArrayAnswers = (ansArray: string[]): string[] => {
    return ansArray.map(s => normalizeAnswer(s)).sort();
  };

  const checkAnswer = (currentAnswer: any): boolean => {
    if (task.answerInputType === AnswerInputType.PARENT_CHECK) {
      return true; 
    }

    const correctAnswer = task.correctAnswer;
    let isCorrect = false;

    switch (task.answerInputType) {
      case AnswerInputType.TEXT:
      case AnswerInputType.TEXTAREA:
        if (typeof correctAnswer === 'string') {
          isCorrect = normalizeAnswer(currentAnswer as string) === normalizeAnswer(correctAnswer);
        } else if (Array.isArray(correctAnswer)) { 
          isCorrect = correctAnswer.some(ans => normalizeAnswer(currentAnswer as string) === normalizeAnswer(ans));
        }
        break;
      case AnswerInputType.NUMBER:
        isCorrect = parseFloat(currentAnswer) === correctAnswer;
        break;
      case AnswerInputType.RADIO:
        isCorrect = currentAnswer === correctAnswer;
        break;
      case AnswerInputType.CHECKBOX:
        const userAnswerSorted = normalizeArrayAnswers(currentAnswer as string[]);
        const correctAnswerSorted = normalizeArrayAnswers(correctAnswer as string[]);
        isCorrect = JSON.stringify(userAnswerSorted) === JSON.stringify(correctAnswerSorted);
        break;
      case AnswerInputType.TWO_NUMBERS_COMMA:
        const parts = (currentAnswer as string).split(',').map(s => s.trim());
        if (parts.length === 2) {
          const num1 = parseFloat(parts[0]);
          const num2 = parseFloat(parts[1]);
          isCorrect = num1 === correctAnswer[0] && num2 === correctAnswer[1];
        }
        break;
      default:
        isCorrect = false;
    }
    return isCorrect;
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (taskStatus?.isCorrect) return; 

    let answerToSubmit = userAnswer;
    if (task.answerInputType === AnswerInputType.CHECKBOX) {
      answerToSubmit = selectedCheckboxes;
    }
    
    if (task.answerInputType === AnswerInputType.PARENT_CHECK) {
        saveAnswer(task.id, 'completed', true);
        setFeedback({ message: 'Отлично, задание отмечено!', type: 'correct' });
        setIncorrectAttempts(0);
        return;
    }

    const isCorrect = checkAnswer(answerToSubmit);
    saveAnswer(task.id, answerToSubmit, isCorrect);
    setFeedback({ message: isCorrect ? 'Правильно! Молодчина!' : 'Попробуй еще раз, у тебя получится!', type: isCorrect ? 'correct' : 'incorrect' });
    if (!isCorrect) {
      setIncorrectAttempts(prev => prev + 1);
    } else {
      setIncorrectAttempts(0);
    }
  };

  const handleCheckboxChange = (optionId: string) => {
    setSelectedCheckboxes(prev => 
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  const renderInput = () => {
    if (taskStatus?.isCorrect && task.answerInputType !== AnswerInputType.PARENT_CHECK) {
      return <p className="text-lg text-green-700 font-semibold">Ответ: {Array.isArray(taskStatus.answer) ? taskStatus.answer.join(', ') : taskStatus.answer}</p>;
    }
    if (taskStatus?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK) {
      return <p className="text-lg text-green-700 font-semibold">Задание выполнено!</p>;
    }

    const inputBaseClasses = "w-full p-3 rounded-lg text-lg bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors";
    const placeholderText = getInputPlaceholder(task, taskStatus);

    switch (task.answerInputType) {
      case AnswerInputType.TEXT:
        return <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={inputBaseClasses} placeholder={placeholderText} />;
      case AnswerInputType.TEXTAREA:
        return <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} rows={3} className={inputBaseClasses} placeholder={placeholderText} />;
      case AnswerInputType.NUMBER:
        return <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={inputBaseClasses} placeholder={placeholderText} />;
      case AnswerInputType.RADIO:
        return (
          <div className="space-y-2">
            {task.options?.map((opt: TaskOption) => (
              <label key={opt.id} className="flex items-center p-3 rounded-lg hover:bg-sky-100 cursor-pointer text-lg text-black uppercase transition-colors">
                <input type="radio" name={task.id} value={opt.id} checked={userAnswer === opt.id} onChange={(e) => setUserAnswer(e.target.value)} className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500" />
                {opt.text}
              </label>
            ))}
          </div>
        );
      case AnswerInputType.CHECKBOX:
        return (
          <div className="space-y-2">
            {task.options?.map((opt: TaskOption) => (
              <label key={opt.id} className="flex items-center p-3 rounded-lg hover:bg-sky-100 cursor-pointer text-lg text-black uppercase transition-colors">
                <input type="checkbox" value={opt.id} checked={selectedCheckboxes.includes(opt.id)} onChange={() => handleCheckboxChange(opt.id)} className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                {opt.text}
              </label>
            ))}
          </div>
        );
      case AnswerInputType.TWO_NUMBERS_COMMA:
        return <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder={placeholderText} className={inputBaseClasses} />;
      case AnswerInputType.PARENT_CHECK:
        return <p className="text-slate-600 text-lg my-2">Это задание проверяется или выполняется с помощью родителя.</p>;
      default:
        return <p>Тип ответа не поддерживается.</p>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl mb-6 shadow-xl border border-slate-200">
      <p className="text-sm text-slate-600 font-medium mb-2">{task.category}{task.source ? ` (${task.source})` : ''}</p>
      <p className="text-2xl text-gray-900 mb-6 leading-relaxed whitespace-pre-line">{task.text}</p>
      
      {task.requiresParentalDrawing && (
        <p className="text-sm text-orange-600 bg-orange-100 p-2 rounded-md mb-4">🎨 Это задание предполагает рисование на бумаге с помощью родителя.</p>
      )}
      {task.answerHint && !taskStatus?.isCorrect && incorrectAttempts >= 2 && (
         <p className="text-sm text-sky-600 bg-sky-100 p-2 rounded-md mb-4">💡 Подсказка: {task.answerHint}</p>
      )}

      <form onSubmit={handleSubmit}>
        {renderInput()}
        { !(taskStatus?.isCorrect || (task.answerInputType === AnswerInputType.PARENT_CHECK && taskStatus?.answer === 'completed') ) && (
          <button 
            type="submit" 
            className="mt-6 w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            {task.answerInputType === AnswerInputType.PARENT_CHECK ? 'Отметить выполненным' : 'Проверить ответ'}
          </button>
        )}
      </form>

      {feedback && (
        <div className={`mt-4 p-3 rounded-lg text-lg font-medium flex items-center gap-2 ${feedback.type === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedback.type === 'correct' ? <CheckIcon /> : <XMarkIcon />}
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
