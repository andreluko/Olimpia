import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import AchievementCard from './AchievementCard';
import { Link } from 'react-router-dom';

const AchievementsView: React.FC = () => {
  const { achievementsData, unlockedAchievements } = useAppContext();

  const sortedAchievements = [...achievementsData].sort((a, b) => {
    const aUnlocked = !!unlockedAchievements[a.id];
    const bUnlocked = !!unlockedAchievements[b.id];
    if (aUnlocked && !bUnlocked) return -1; // Unlocked first
    if (!aUnlocked && bUnlocked) return 1;  // Locked last
    return 0; // Keep original order among same status
  });


  return (
    <div className="p-2 sm:p-4">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">&larr; К календарю</Link>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">
        Мои Достижения <span role="img" aria-label="trophy">🏆</span>
      </h2>
      
      {achievementsData.length === 0 ? (
        <p className="text-center text-slate-500">Список достижений пока пуст.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sortedAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id}
              achievement={achievement}
              isUnlocked={!!unlockedAchievements[achievement.id]}
              unlockedDate={unlockedAchievements[achievement.id]?.unlockedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsView;