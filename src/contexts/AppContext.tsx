import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import june2025Schedule from '../data';
import { DailySchedule, UserProgress, Task, Session, AppContextType, DayCompletionStatus, UnlockedAchievements, AnswerInputType, Achievement } from '../types';
import { achievementsDataList } from '../achievementsData';
import confetti from 'canvas-confetti';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [schedule] = useState<DailySchedule[]>(june2025Schedule); 
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('olympicCalendarProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 5, 1)); 
  const [dayCompletion, setDayCompletion] = useState<DayCompletionStatus>(() => {
    const savedDayCompletion = localStorage.getItem('olympicCalendarDayCompletion');
    return savedDayCompletion ? JSON.parse(savedDayCompletion) : {};
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievements>(() => {
    const savedAchievements = localStorage.getItem('olympicCalendarAchievements');
    return savedAchievements ? JSON.parse(savedAchievements) : {};
  });

  const [newlyUnlockedAchievementToShow, setNewlyUnlockedAchievementToShow] = useState<Achievement | null>(null);

  const clearNewlyUnlockedAchievementModal = useCallback(() => {
    setNewlyUnlockedAchievementToShow(null);
  }, []);

  useEffect(() => {
    localStorage.setItem('olympicCalendarAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);


  const getTasksForDay = useCallback((dayId: string): Task[] => {
    const dayData = schedule.find(d => d.id === dayId);
    if (!dayData) return [];
    return dayData.sessions.reduce((acc: Task[], session: Session) => acc.concat(session.tasks), []);
  }, [schedule]);

  const checkAndUnlockAchievements = useCallback(() => {
    const currentModalIsShowing = !!newlyUnlockedAchievementToShow;
    let newAchievementToModal: Achievement | null = null;

    const updatedUnlockedAchievements = { ...unlockedAchievements }; 
    let madeChangesToPersistent = false;

    achievementsDataList.forEach(achievement => {
        if (!updatedUnlockedAchievements[achievement.id]) { 
            if (achievement.criteria({ userProgress, dayCompletion, schedule })) {
                updatedUnlockedAchievements[achievement.id] = { unlockedAt: new Date().toISOString() };
                madeChangesToPersistent = true;
                console.log(`Achievement unlocked: ${achievement.name}`);
                if (!currentModalIsShowing && !newAchievementToModal) { 
                    newAchievementToModal = achievement;
                }
            }
        }
    });

    if (madeChangesToPersistent) {
        setUnlockedAchievements(updatedUnlockedAchievements); 
    }

    if (newAchievementToModal) {
        setNewlyUnlockedAchievementToShow(newAchievementToModal); 
    }
  }, [userProgress, dayCompletion, schedule, unlockedAchievements, newlyUnlockedAchievementToShow]);


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
    setDayCompletion(prevDayCompletion => {
      const tasksForDay = getTasksForDay(dayId);
      if (tasksForDay.length === 0) return prevDayCompletion;
  
      let completedCorrectly = 0;
      tasksForDay.forEach(task => {
        const progress = userProgress[task.id]; 
        if (progress && progress.isCorrect) {
          completedCorrectly++;
        } else if (progress && task.answerInputType === AnswerInputType.PARENT_CHECK && progress.answer === 'completed') {
          completedCorrectly++;
        }
      });
  
      const newIsFullyCompleted = completedCorrectly === tasksForDay.length;
      const oldStatus = prevDayCompletion[dayId];
  
      if (newIsFullyCompleted && (!oldStatus || !oldStatus.isFullyCompleted) && tasksForDay.length > 0) {
        console.log(`Day ${dayId} completed! Confetti!`);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          zIndex: 10000, 
        });
      }
      
      return {
        ...prevDayCompletion,
        [dayId]: {
          completedTasks: completedCorrectly,
          totalTasks: tasksForDay.length,
          isFullyCompleted: newIsFullyCompleted,
        }
      };
    });
  }, [userProgress, getTasksForDay]);


  useEffect(() => {
    localStorage.setItem('olympicCalendarProgress', JSON.stringify(userProgress));
    updateAllDaysCompletionStatus(); 
  }, [userProgress, updateAllDaysCompletionStatus]);
  
  useEffect(() => {
    localStorage.setItem('olympicCalendarDayCompletion', JSON.stringify(dayCompletion));
    checkAndUnlockAchievements(); 
  }, [dayCompletion, checkAndUnlockAchievements]);


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
        updateDayCompletionStatus(dayIdToUpdate);
    } else {
      checkAndUnlockAchievements();
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
  }, [updateAllDaysCompletionStatus]);

  const resetAllProgress = useCallback(() => {
    localStorage.removeItem('olympicCalendarProgress');
    localStorage.removeItem('olympicCalendarDayCompletion');
    localStorage.removeItem('olympicCalendarAchievements');
    
    setUserProgress({});
    setDayCompletion({});
    setUnlockedAchievements({});
    setNewlyUnlockedAchievementToShow(null);
    alert("Весь прогресс был сброшен. Страница будет перезагружена для применения изменений.");
    window.location.reload(); 
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
        resetAllProgress,
        newlyUnlockedAchievementToShow,
        clearNewlyUnlockedAchievementModal
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