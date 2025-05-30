import { Achievement, AchievementCriteriaArgs, TaskCategory, AnswerInputType } from './types';

// Helper function to count completed tasks by category
const countCorrectTasksByCategory = (userProgress: AchievementCriteriaArgs['userProgress'], schedule: AchievementCriteriaArgs['schedule'], category: TaskCategory): number => {
  let count = 0;
  for (const day of schedule) {
    for (const session of day.sessions) {
      for (const task of session.tasks) {
        if (task.category === category && userProgress[task.id]?.isCorrect) {
          count++;
        }
      }
    }
  }
  return count;
};


export const achievementsDataList: Achievement[] = [
  {
    id: 'first_step',
    name: 'Первый шаг сделан!',
    description: 'Выполнить свое первое задание.',
    icon: '🎉',
    criteria: ({ userProgress }) => Object.keys(userProgress).length >= 1,
  },
  {
    id: 'morning_star',
    name: 'Утренняя звезда!',
    description: 'Завершить первые утренние задания.',
    icon: '☀️',
    criteria: ({ userProgress, schedule }) => {
      for (const day of schedule) {
        const morningSession = day.sessions.find(s => s.name.toLowerCase().includes('утренняя'));
        if (morningSession) {
          const allTasksInSessionCompleted = morningSession.tasks.every(task => userProgress[task.id]?.isCorrect || (userProgress[task.id]?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK));
          if (allTasksInSessionCompleted) return true;
        }
      }
      return false;
    },
  },
  {
    id: 'day_marathoner',
    name: 'Дневной марафонец!',
    description: 'Завершить первые дневные задания.',
    icon: '🏃',
    criteria: ({ userProgress, schedule }) => {
      for (const day of schedule) {
        const daySession = day.sessions.find(s => s.name.toLowerCase().includes('дневная'));
        if (daySession) {
          const allTasksInSessionCompleted = daySession.tasks.every(task => userProgress[task.id]?.isCorrect || (userProgress[task.id]?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK));
          if (allTasksInSessionCompleted) return true;
        }
      }
      return false;
    },
  },
  {
    id: 'perfectionist_day',
    name: 'Перфекционист дня!',
    description: 'Выполнить все задания одного дня.',
    icon: '🏆',
    criteria: ({ dayCompletion }) => Object.values(dayCompletion).some(status => status.isFullyCompleted),
  },
  {
    id: 'session_triumph',
    name: 'Триумфатор блоков заданий!',
    description: 'Завершить 3 любых блока заданий.',
    icon: '🏅',
    criteria: ({ userProgress, schedule }) => {
      let completedSessionsCount = 0;
      for (const day of schedule) {
        for (const session of day.sessions) {
          const allTasksInSessionCompleted = session.tasks.every(task => userProgress[task.id]?.isCorrect || (userProgress[task.id]?.answer === 'completed' && task.answerInputType === AnswerInputType.PARENT_CHECK));
          if (allTasksInSessionCompleted) {
            completedSessionsCount++;
            if (completedSessionsCount >= 3) return true;
          }
        }
      }
      return false;
    },
  },
  {
    id: 'weekly_sprinter',
    name: 'Недельный спринтер!',
    description: 'Завершить все задания за 3 разных дня.',
    icon: '🚀',
    criteria: ({ dayCompletion }) => {
      const completedDays = Object.values(dayCompletion).filter(status => status.isFullyCompleted).length;
      return completedDays >= 3;
    },
  },
  {
    id: 'logic_expert',
    name: 'Знаток Логики',
    description: 'Правильно решить 5 заданий по логике.',
    icon: '🧠',
    criteria: (args) => countCorrectTasksByCategory(args.userProgress, args.schedule, TaskCategory.LOGIC) >= 5,
  },
  {
    id: 'math_magician',
    name: 'Математический Маг',
    description: 'Правильно решить 5 заданий по математике.',
    icon: '🧮',
    criteria: (args) => countCorrectTasksByCategory(args.userProgress, args.schedule, TaskCategory.MATH) >= 5,
  },
  {
    id: 'language_guru',
    name: 'Гуру Русского Языка',
    description: 'Правильно решить 5 заданий по русскому языку.',
    icon: '✍️',
    criteria: (args) => countCorrectTasksByCategory(args.userProgress, args.schedule, TaskCategory.RUSSIAN) >= 5,
  },
  {
    id: 'world_explorer',
    name: 'Исследователь Мира',
    description: 'Правильно решить 5 заданий по окружающему миру.',
    icon: '🌍',
    criteria: (args) => countCorrectTasksByCategory(args.userProgress, args.schedule, TaskCategory.WORLD) >= 5,
  },
];