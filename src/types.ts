export interface Exercise {
  name: string;
  description: string;
  sets?: number;
  reps?: string;
  duration?: string;
  instructions?: string[];
  category?: string;
  muscleGroups?: string[];
}

export interface LibraryExercise extends Exercise {
  category: string;
}

export interface DayPlan {
  category: string;
  exercises: Exercise[];
}

export interface DietDay {
  breakfast: string;
  midMorning: string;
  lunch: string;
  evening: string;
  dinner: string;
}

export interface WeeklyPlan {
  workouts: Record<string, DayPlan>;
  diet: Record<string, DietDay>;
}

export interface Target {
  id: string;
  label: string;
  goal: string;
  unit: string;
}
