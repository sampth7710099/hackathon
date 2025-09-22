export enum Page {
  Dashboard = 'DASHBOARD',
  LogData = 'LOG_DATA',
}

export enum Mood {
  Happy = 'HAPPY',
  Neutral = 'NEUTRAL',
  Stressed = 'STRESSED',
  Sad = 'SAD',
}

export interface MealAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  suggestion: string;
}

export interface HealthData {
  date: string;
  steps: number;
  exerciseMinutes: number;
  sleepHours: number;
  mood: Mood;
  mealDescription: string;
  mealAnalysis: MealAnalysis | null;
}

export type Theme = 'light' | 'dark';