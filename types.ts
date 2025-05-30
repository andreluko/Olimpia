export enum TaskCategory {
  LOGIC = "Логика",
  MATH = "Математика",
  RUSSIAN = "Русский язык",
  WORLD = "Окружающий мир",
  COMPLEX = "Комплексное",
  VISUAL = "Визуальное",
  GEOMETRY = "Геометрия",
  PROJECT = "Проектное",
  POETIC = "Поэтическое",
  REFLEXIVE = "Рефлексивное",
  ERUDITION = "Эрудиция",
  CREATIVE = "Творческое",
  PARENT_GUIDED = "С помощью родителя" // For tasks like drawing flags, etc.
}

export enum AnswerInputType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TWO_NUMBERS_COMMA = "two_numbers_comma", // e.g., "16, 17"
  PARENT_CHECK = "parent_check", // Tasks requiring parental validation or are drawing-based
}

export interface TaskOption {
  id: string;
  text: string;
}

export interface Task {
  id: string;
  text: string;
  category: TaskCategory;
  source?: string;
  answerInputType: AnswerInputType;
  correctAnswer: any; 
  options?: TaskOption[]; 
  answerPattern?: string; 
  answerHint?: string; 
  requiresParentalDrawing?: boolean; 
}

export interface Session {
  name: string;
  duration: string;
  tasks: Task[];
}

export interface DailySchedule {
  id: string; // YYYY-MM-DD
  date: Date;
  dayName: string;
  title: string;
  sessions: Session[];
}

export interface UserAnswer {
  answer: any;
  isCorrect: boolean | null; 
  timestamp?: number;
}

export interface UserProgress {
  [taskId: string]: UserAnswer;
}

export interface DayCompletionStatus {
  [dayId: string]: {
    completedTasks: number;
    totalTasks: number;
    isFullyCompleted: boolean;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or path to SVG
  criteria: (args: AchievementCriteriaArgs) => boolean;
}

export interface UnlockedAchievements {
  [achievementId: string]: {
    unlockedAt: string; // ISO date string
  };
}

export interface AchievementCriteriaArgs {
  userProgress: UserProgress;
  dayCompletion: DayCompletionStatus;
  schedule: DailySchedule[]; // Full schedule might be needed for some complex achievements
  // Potentially add specific day data or session data if needed for very specific achievements
}


export interface AppContextType {
  schedule: DailySchedule[];
  userProgress: UserProgress;
  saveAnswer: (taskId: string, answer: any, isCorrect: boolean) => void;
  getTaskStatus: (taskId: string) => UserAnswer | undefined;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  getDayCompletionStatus: (dayId: string) => { completedTasks: number; totalTasks: number; isFullyCompleted: boolean } | undefined;
  achievementsData: Achievement[];
  unlockedAchievements: UnlockedAchievements;
}