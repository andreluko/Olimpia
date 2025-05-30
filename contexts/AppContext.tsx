import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import june2025Schedule from '../data';
import { DailySchedule, UserProgress, Task, Session, AppContextType, DayCompletionStatus, UnlockedAchievements, Achievement } from '../types';
import { achievementsDataList } from '../achievementsData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [schedule, setSchedule] = useState<DailySchedule[]>(june2025Schedule);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('olympicCalendarProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 5, 1)); // June 2025
  const [dayCompletion, setDayCompletion] = useState<DayCompletionStatus>(() => {
    const savedDayCompletion = localStorage.getItem('olympicCalendarDayCompletion');
    return savedDayCompletion ? JSON.parse(savedDayCompletion) : {};
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievements>(() => {
    const savedAchievements = localStorage.getItem('olympicCalendarAchievements');
    return savedAchievements ? JSON.parse(savedAchievements) : {};
  });

  useEffect(() => {
    localStorage.setItem('olympicCalendarAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);


  const getTasksForDay = useCallback((dayId: string): Task[] => {
    const dayData = schedule.find(d => d.id === dayId);
    if (!dayData) return [];
    return dayData.sessions.reduce((acc: Task[], session: Session) => acc.concat(session.tasks), []);
  }, [schedule]);

  const updateDayCompletionStatus = useCallback((dayId: string) => {
    const tasksForDay = getTasksForDay(dayId);
    if (tasksForDay.length === 0) return;

    let completedCorrectly = 0;
    tasksForDay.forEach(task => {
      const progress = userProgress[task.id];
      if (progress && progress.isCorrect) {
        completedCorrectly++;
      } else if (progress && task.answerInputType === 'parent_check' && progress.answer === 'completed') {
        completedCorrectly++;
      }
    });
    
    setDayCompletion(prev => ({
      ...prev,
      [dayId]: {
        completedTasks: completedCorrectly,
        totalTasks: tasksForDay.length,
        isFullyCompleted: completedCorrectly === tasksForDay.length,
      }
    }));
  }, [userProgress, getTasksForDay]);

  const updateAllDaysCompletionStatus = useCallback(() => {
    const newDayCompletion: DayCompletionStatus = {};
    schedule.forEach(day => {
      const tasksForDay = getTasksForDay(day.id);
      if (tasksForDay.length === 0) return;

      let completedCorrectly = 0;
      tasksForDay.forEach(task => {
        const progress = userProgress[task.id];
         if (progress && progress.isCorrect) {
            completedCorrectly++;
        } else if (progress && task.answerInputType === 'parent_check' && progress.answer === 'completed') {
            completedCorrectly++;
        }
      });
      newDayCompletion[day.id] = {
        completedTasks: completedCorrectly,
        totalTasks: tasksForDay.length,
        isFullyCompleted: completedCorrectly === tasksForDay.length,
      };
    });
    setDayCompletion(newDayCompletion);
  }, [schedule, userProgress, getTasksForDay]);

  const checkAndUnlockAchievements = useCallback(() => {
    setUnlockedAchievements(prevUnlocked => {
      const newUnlocks: UnlockedAchievements = { ...prevUnlocked };
      let hasNewUnlock = false;
      achievementsDataList.forEach(achievement => {
        if (!newUnlocks[achievement.id]) {
          if (achievement.criteria({ userProgress, dayCompletion, schedule })) {
            newUnlocks[achievement.id] = { unlockedAt: new Date().toISOString() };
            hasNewUnlock = true;
            console.log(`Achievement unlocked: ${achievement.name}`); // For debugging
          }
        }
      });
      return hasNewUnlock ? newUnlocks : prevUnlocked;
    });
  }, [userProgress, dayCompletion, schedule]);

  useEffect(() => {
    localStorage.setItem('olympicCalendarProgress', JSON.stringify(userProgress));
    updateAllDaysCompletionStatus();
    checkAndUnlockAchievements(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProgress]);
  
  useEffect(() => {
    localStorage.setItem('olympicCalendarDayCompletion', JSON.stringify(dayCompletion));
    checkAndUnlockAchievements(); // Check achievements when day completion status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayCompletion]);


  const saveAnswer = useCallback((taskId: string, answer: any, isCorrect: boolean) => {
    setUserProgress(prevProgress => ({
      ...prevProgress,
      [taskId]: { answer, isCorrect, timestamp: Date.now() },
    }));
    
    let dayIdToUpdate: string | null = null;
    for (const day of schedule) {
        for (const session of day.sessions) {
            if (session.tasks.find(t => t.id === taskId)) {
                dayIdToUpdate = day.id;
                break;
            }
        }
        if (dayIdToUpdate) break;
    }
    if (dayIdToUpdate) {
        updateDayCompletionStatus(dayIdToUpdate); // This will trigger dayCompletion useEffect
    } else {
        checkAndUnlockAchievements(); // If no specific day to update, still check achievements
    }
  }, [schedule, updateDayCompletionStatus, checkAndUnlockAchievements]);

  const getTaskStatus = useCallback((taskId: string) => {
    return userProgress[taskId];
  }, [userProgress]);

  const getDayCompletionStatus = useCallback((dayId: string) => {
    return dayCompletion[dayId];
  }, [dayCompletion]);

  useEffect(() => {
    updateAllDaysCompletionStatus();
    checkAndUnlockAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);


  return (
    <AppContext.Provider value={{ 
        schedule, 
        userProgress, 
        saveAnswer, 
        getTaskStatus, 
        selectedDate, 
        setSelectedDate, 
        currentMonth, 
        setCurrentMonth,
        getDayCompletionStatus,
        achievementsData: achievementsDataList,
        unlockedAchievements
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};