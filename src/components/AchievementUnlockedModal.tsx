import React from 'react';
import { Achievement } from '../types';

interface AchievementUnlockedModalProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({ achievement, onClose }) => {
  // Prevent scrolling of background content when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
      onClick={onClose} 
      aria-modal="true"
      role="dialog"
      aria-labelledby="achievement-unlocked-title"
    >
      <div 
        className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all scale-100 opacity-100 ring-1 ring-amber-400 ring-opacity-50"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="mb-5">
            <span className="text-6xl sm:text-7xl inline-block animate-bounce">{achievement.icon}</span>
        </div>
        <h2 id="achievement-unlocked-title" className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Достижение Разблокировано!
        </h2>
        <p className="text-xl sm:text-2xl font-semibold text-amber-600 mb-4">{achievement.name}</p>
        <p className="text-slate-600 mb-8 text-sm sm:text-base">{achievement.description}</p>
        <button
          onClick={onClose}
          className="px-10 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Закрыть окно поздравления"
        >
          Ура!
        </button>
      </div>
    </div>
  );
};

export default AchievementUnlockedModal;