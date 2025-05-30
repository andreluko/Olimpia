import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import DayView from './components/DayView';
import { useAppContext } from './contexts/AppContext';
import ParentStatsView from './components/ParentStatsView';
import AchievementsView from './components/AchievementsView';
import AchievementUnlockedModal from './components/AchievementUnlockedModal';

const App: React.FC = () => {
  const { setSelectedDate, newlyUnlockedAchievementToShow, clearNewlyUnlockedAchievementModal } = useAppContext();

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col items-center p-4">
        <header className="w-full max-w-4xl mb-6 text-center">
          <Link to="/" onClick={() => setSelectedDate(null)}>
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 py-2">
              Олимпиадный Календарь
            </h1>
          </Link>
          <p className="text-slate-700 text-lg">Июнь 2025</p>
        </header>
        
        <main className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/day/:dayId" element={<DayView />} />
            <Route path="/stats" element={<ParentStatsView />} />
            <Route path="/achievements" element={<AchievementsView />} />
          </Routes>
        </main>
        <footer className="mt-8 text-center text-slate-600 w-full max-w-4xl">
            <p className="mb-2">&copy; 2024 AI Studio Project. Веселого и полезного лета!</p>
            <div className="flex justify-center space-x-4">
              <Link to="/stats" className="text-blue-600 hover:underline">Статистика для родителей</Link>
              <Link to="/achievements" className="text-amber-600 hover:underline">🏆 Мои Достижения</Link>
            </div>
        </footer>
      </div>
      {newlyUnlockedAchievementToShow && (
        <AchievementUnlockedModal
          achievement={newlyUnlockedAchievementToShow}
          onClose={clearNewlyUnlockedAchievementModal}
        />
      )}
    </HashRouter>
  );
};

export default App;