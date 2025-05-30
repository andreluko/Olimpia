
import React from 'react';
import { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedDate?: string; // ISO string
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isUnlocked, unlockedDate }) => {
  return (
    <div 
      className={`p-4 sm:p-5 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${ // Removed shadow-lg and border
        isUnlocked 
          ? 'bg-green-100' // Solid color for unlocked
          : 'bg-slate-100 opacity-70' // Solid color for locked
      }`}
    >
      <div className="flex items-start">
        <span className="text-3xl sm:text-4xl mr-3 sm:mr-4 pt-1">{isUnlocked ? achievement.icon : '🔒'}</span>
        <div className="flex-grow">
          <h3 className={`text-lg sm:text-xl font-bold ${isUnlocked ? 'text-green-700' : 'text-slate-700'}`}>
            {achievement.name}
          </h3>
          <p className={`text-sm sm:text-base mt-1 ${isUnlocked ? 'text-slate-600' : 'text-slate-500'}`}>
            {achievement.description}
          </p>
          {isUnlocked && unlockedDate && (
            <p className="text-xs text-green-600 mt-2">
              Разблокировано: {new Date(unlockedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;