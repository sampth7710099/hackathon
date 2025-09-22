import React, { useState } from 'react';
import { HealthData, Mood, MealAnalysis, Theme } from '../types';
import { analyzeMeal } from '../services/geminiService';

interface DataInputFormProps {
  onSubmit: (data: HealthData) => void;
  theme: Theme;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ onSubmit, theme }) => {
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [steps, setSteps] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [mood, setMood] = useState<Mood>(Mood.Neutral);
  const [mealDescription, setMealDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    let mealAnalysisResult: MealAnalysis | null = null;
    if (mealDescription.trim()) {
      try {
        mealAnalysisResult = await analyzeMeal(mealDescription);
      } catch (err) {
        setError('Could not analyze meal. Please try again or submit without meal analysis.');
        setIsLoading(false);
        return;
      }
    }

    const newData: HealthData = {
      date,
      steps: parseInt(steps) || 0,
      exerciseMinutes: parseInt(exerciseMinutes) || 0,
      sleepHours: parseFloat(sleepHours) || 0,
      mood,
      mealDescription,
      mealAnalysis: mealAnalysisResult,
    };
    
    onSubmit(newData);
    setIsLoading(false);
  };

  const headerColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subHeaderColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const formBg = theme === 'dark' ? 'bg-sky-900/50' : 'bg-white shadow-sm';
  const labelColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const inputClasses = theme === 'dark' 
    ? "w-full bg-sky-800 border-sky-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500"
    : "w-full bg-gray-100 border-gray-300 text-gray-900 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500";

  return (
    <div className="max-w-2xl mx-auto">
        <h2 className={`text-3xl font-bold ${headerColor} mb-1`}>Log Your Day</h2>
        <p className={`${subHeaderColor} mb-6`}>Fill in your health metrics for {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.</p>

        <form onSubmit={handleSubmit} className={`space-y-6 ${formBg} p-8 rounded-xl`}>
            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                    <p>{error}</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="steps" className={`block text-sm font-medium ${labelColor} mb-2`}>Steps</label>
                    <input type="number" id="steps" value={steps} onChange={e => setSteps(e.target.value)} className={inputClasses} placeholder="e.g., 8500" />
                </div>
                 <div>
                    <label htmlFor="exercise" className={`block text-sm font-medium ${labelColor} mb-2`}>Exercise (minutes)</label>
                    <input type="number" id="exercise" value={exerciseMinutes} onChange={e => setExerciseMinutes(e.target.value)} className={inputClasses} placeholder="e.g., 30" />
                </div>
                 <div>
                    <label htmlFor="sleep" className={`block text-sm font-medium ${labelColor} mb-2`}>Sleep (hours)</label>
                    <input type="number" step="0.5" id="sleep" value={sleepHours} onChange={e => setSleepHours(e.target.value)} className={inputClasses} placeholder="e.g., 7.5" />
                </div>
                <div>
                    <label className={`block text-sm font-medium ${labelColor} mb-2`}>Overall Mood</label>
                    <select value={mood} onChange={e => setMood(e.target.value as Mood)} className={inputClasses}>
                        {Object.values(Mood).map(m => <option key={m} value={m}>{m.charAt(0) + m.slice(1).toLowerCase()}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="meal" className={`block text-sm font-medium ${labelColor} mb-2`}>Main Meal Description</label>
                <textarea id="meal" value={mealDescription} onChange={e => setMealDescription(e.target.value)} rows={3} className={inputClasses} placeholder="e.g., Grilled salmon with roasted asparagus and a side of quinoa."></textarea>
                <p className={`text-xs ${subHeaderColor} mt-1`}>Our AI will analyze this to estimate nutritional info.</p>
            </div>
            
            <div>
                 <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center transform-gpu hover:scale-102 active:scale-95">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing & Saving...
                      </>
                    ) : 'Log My Day'}
                </button>
            </div>
        </form>
    </div>
  );
};

export default DataInputForm;