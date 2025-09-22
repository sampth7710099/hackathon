
import { HealthData, Mood } from './types';

export const MOCK_HEALTH_DATA: HealthData[] = [
  {
    date: '2024-07-20',
    steps: 8204,
    exerciseMinutes: 30,
    sleepHours: 7.5,
    mood: Mood.Happy,
    mealDescription: "Grilled chicken salad with avocado and a light vinaigrette.",
    mealAnalysis: { calories: 450, protein: 40, carbs: 15, fat: 25, suggestion: "Excellent balanced meal, rich in protein and healthy fats." }
  },
  {
    date: '2024-07-19',
    steps: 5102,
    exerciseMinutes: 0,
    sleepHours: 6,
    mood: Mood.Stressed,
    mealDescription: "A large pepperoni pizza and a soda.",
    mealAnalysis: { calories: 1200, protein: 45, carbs: 150, fat: 60, suggestion: "Consider a smaller portion next time or adding a side salad for more nutrients." }
  },
  {
    date: '2024-07-18',
    steps: 10598,
    exerciseMinutes: 60,
    sleepHours: 8,
    mood: Mood.Happy,
    mealDescription: "Oatmeal with berries and nuts for breakfast, lentil soup for lunch, and baked salmon with quinoa and broccoli for dinner.",
    mealAnalysis: { calories: 1800, protein: 90, carbs: 200, fat: 70, suggestion: "Great job on a full day of nutritious eating!" }
  },
  {
    date: '2024-07-17',
    steps: 7500,
    exerciseMinutes: 20,
    sleepHours: 7,
    mood: Mood.Neutral,
    mealDescription: "Turkey sandwich on whole wheat bread with a side of apple slices.",
    mealAnalysis: { calories: 550, protein: 35, carbs: 60, fat: 20, suggestion: "A solid, convenient, and balanced lunch option." }
  },
  {
    date: '2024-07-16',
    steps: 4200,
    exerciseMinutes: 0,
    sleepHours: 5.5,
    mood: Mood.Stressed,
    mealDescription: "Pasta with creamy alfredo sauce and garlic bread.",
    mealAnalysis: { calories: 950, protein: 25, carbs: 120, fat: 45, suggestion: "This meal is high in refined carbs and fats. For a healthier version, try a tomato-based sauce with whole wheat pasta." }
  },
];
