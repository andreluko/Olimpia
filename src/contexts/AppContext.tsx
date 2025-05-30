import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import june2025Schedule from '../data';
import { DailySchedule, UserProgress, Task, Session, AppContextType, DayCompletionStatus, UnlockedAchievements, AnswerInputType } from '../types';
import { achievementsDataList } from '../achievementsData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [schedule] = useState<DailySchedule[]>(june2025Schedule); // setSchedule removed as schedule is static
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

  const checkAndUnlockAchievements = useCallback(() => {
    setUnlockedAchievements(prevUnlocked => {
      const newUnlocks: UnlockedAchievements = { ...prevUnlocked };
      let hasNewUnlock = false;
      achievementsDataList.forEach(achievement => {
        if (!newUnlocks[achievement.id]) {
          // Pass a copy of userProgress and dayCompletion to criteria to ensure it uses the latest state being processed.
          if (achievement.criteria({ userProgress, dayCompletion, schedule })) {
            newUnlocks[achievement.id] = { unlockedAt: new Date().toISOString() };
            hasNewUnlock = true;
            console.log(`Achievement unlocked: ${achievement.name}`);
          }
        }
      });
      return hasNewUnlock ? newUnlocks : prevUnlocked;
    });
  }, [userProgress, dayCompletion, schedule]);

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
        } else if (progress && task.answerInputType === AnswerInputType.PARENT_CHECK && progress.answer === 'completed') {
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
  
  const updateDayCompletionStatus = useCallback((dayId: string) => {
    const tasksForDay = getTasksForDay(dayId);
    if (tasksForDay.length === 0) return;

    let completedCorrectly = 0;
    tasksForDay.forEach(task => {
      const progress = userProgress[task.id];
      if (progress && progress.isCorrect) {
        completedCorrectly++;
      } else if (progress && task.answerInputType === AnswerInputType.PARENT_CHECK && progress.answer === 'completed') {
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


  useEffect(() => {
    localStorage.setItem('olympicCalendarProgress', JSON.stringify(userProgress));
    updateAllDaysCompletionStatus(); // This will update dayCompletion
  }, [userProgress, updateAllDaysCompletionStatus]);
  
  useEffect(() => {
    localStorage.setItem('olympicCalendarDayCompletion', JSON.stringify(dayCompletion));
    checkAndUnlockAchievements(); // Check achievements when day completion status changes
  }, [dayCompletion, checkAndUnlockAchievements]);


  const saveAnswer = useCallback((taskId: string, answer: any, isCorrect: boolean) => {
    setUserProgress(prevProgress => ({
      ...prevProgress,
      [taskId]: { answer, isCorrect, timestamp: Date.now() },
    }));
    
    // Determine dayId and update its completion status
    // This will trigger the useEffect for dayCompletion, which in turn calls checkAndUnlockAchievements
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
        updateDayCompletionStatus(dayIdToUpdate);
    } else {
      // If for some reason dayId is not found, still try to check achievements
      // This case should ideally not happen with current data structure
      checkAndUnlockAchievements();
    }
  }, [schedule, updateDayCompletionStatus, checkAndUnlockAchievements]); // Added checkAndUnlockAchievements

  const getTaskStatus = useCallback((taskId: string) => {
    return userProgress[taskId];
  }, [userProgress]);

  const getDayCompletionStatus = useCallback((dayId: string) => {
    return dayCompletion[dayId];
  }, [dayCompletion]);

  // Initial calculation of day completion and achievements on load
  useEffect(() => {
    updateAllDaysCompletionStatus();
  }, [updateAllDaysCompletionStatus]);

  const resetAllProgress = useCallback(() => {
    localStorage.removeItem('olympicCalendarProgress');
    localStorage.removeItem('olympicCalendarDayCompletion');
    localStorage.removeItem('olympicCalendarAchievements');
    
    setUserProgress({});
    setDayCompletion({});
    setUnlockedAchievements({});
    // setSelectedDate(null); // Optionally reset current view if needed

    // The useEffect hooks listening to userProgress and dayCompletion 
    // will automatically trigger updateAllDaysCompletionStatus and checkAndUnlockAchievements.
    alert("Весь прогресс был сброшен. Страница будет перезагружена для применения изменений.");
    window.location.reload(); // Reload to ensure all components re-initialize with fresh state.
  }, []);


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
        unlockedAchievements,
        resetAllProgress
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