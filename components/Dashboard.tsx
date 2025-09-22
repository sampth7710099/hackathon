import React from 'react';
import { HealthData, Theme } from '../types';
import HealthMetricCard from './HealthMetricCard';
import ActivityChart from './ActivityChart';
import { FootprintsIcon, BedIcon, DumbbellIcon, FlameIcon, SparklesIcon, AlertTriangleIcon } from './IconComponents';
import Markdown from 'react-markdown';

interface DashboardProps {
  healthData: HealthData[];
  onGenerateSummary: () => void;
  weeklySummary: string | null;
  isSummaryLoading: boolean;
  summaryError: string | null;
  theme: Theme;
}

const Dashboard: React.FC<DashboardProps> = ({ healthData, onGenerateSummary, weeklySummary, isSummaryLoading, summaryError, theme }) => {
  const latestData = healthData.length > 0 ? healthData[0] : null;

  const getEmojiForMood = (mood: string) => {
    switch (mood) {
      case 'HAPPY': return '😊';
      case 'NEUTRAL': return '😐';
      case 'STRESSED': return '😟';
      case 'SAD': return '😢';
      default: return '';
    }
  };

  const cardBg = theme === 'dark' ? 'bg-sky-900/50' : 'bg-white shadow-sm';
  const headerColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subHeaderColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const moodCardBg = theme === 'dark' ? 'bg-sky-800/50' : 'bg-gray-100';
  const moodCardText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  
  const panelClasses = `p-6 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold ${headerColor}`}>Dashboard</h2>
        <p className={`${subHeaderColor} mt-1`}>Here's a snapshot of your latest health data.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <HealthMetricCard 
          title="Steps" 
          value={latestData?.steps.toLocaleString() ?? 'N/A'} 
          icon={FootprintsIcon} 
          color="text-sky-400"
          theme={theme}
        />
        <HealthMetricCard 
          title="Calories" 
          value={latestData?.mealAnalysis?.calories.toLocaleString() ?? 'N/A'} 
          icon={FlameIcon} 
          color="text-orange-400"
          theme={theme}
        />
        <HealthMetricCard 
          title="Exercise" 
          value={`${latestData?.exerciseMinutes ?? 'N/A'} min`}
          icon={DumbbellIcon} 
          color="text-red-400"
          theme={theme}
        />
        <HealthMetricCard 
          title="Sleep" 
          value={`${latestData?.sleepHours ?? 'N/A'} hr`}
          icon={BedIcon} 
          color="text-purple-400"
          theme={theme}
        />
      </div>

      {/* Charts and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${cardBg} ${panelClasses}`}>
          <h3 className={`text-xl font-semibold mb-4 ${headerColor}`}>Activity Trends (Last 7 Days)</h3>
          {healthData.length > 0 ? (
            <ActivityChart data={healthData.slice(0, 7).reverse()} theme={theme} />
          ) : (
            <div className={`flex items-center justify-center h-64 ${subHeaderColor}`}>
              <p>Not enough data to display chart.</p>
            </div>
          )}
        </div>
        
        <div className={`${cardBg} ${panelClasses} flex flex-col`}>
          <h3 className={`text-xl font-semibold mb-4 ${headerColor}`}>Daily Mood Log</h3>
          <div className="space-y-3 overflow-y-auto flex-1">
            {healthData.slice(0, 5).map((day, index) => (
              <div key={index} className={`flex justify-between items-center ${moodCardBg} p-3 rounded-lg`}>
                <span className={`font-medium ${moodCardText}`}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="text-2xl">{getEmojiForMood(day.mood)}</span>
              </div>
            ))}
            {healthData.length === 0 && <p className={subHeaderColor}>No mood data logged.</p>}
          </div>
        </div>
      </div>
      
      {/* AI Weekly Insights */}
      <div className={`${panelClasses} ${theme === 'dark' ? 'bg-gradient-to-br from-sky-900 to-sky-900/50' : cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-7 h-7 text-cyan-400" />
            <h3 className={`text-xl font-semibold ${headerColor}`}>Your AI-Powered Weekly Insights</h3>
          </div>
          <button 
            onClick={onGenerateSummary}
            disabled={isSummaryLoading}
            className="mt-3 sm:mt-0 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform-gpu hover:scale-105 active:scale-95"
          >
            {isSummaryLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Generate Insights</span>
            )}
          </button>
        </div>

        {summaryError && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-3">
            <AlertTriangleIcon className="w-6 h-6" />
            <p>{summaryError}</p>
          </div>
        )}

        {weeklySummary && !isSummaryLoading && (
          <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} prose-p:${subHeaderColor} prose-headings:${headerColor} prose-strong:text-cyan-400 mt-4 max-w-none`}>
            <Markdown>{weeklySummary}</Markdown>
          </div>
        )}

        {!weeklySummary && !isSummaryLoading && !summaryError && (
            <div className={`text-center py-8 ${subHeaderColor}`}>
                <p>Click "Generate Insights" to get your personalized health summary for the week.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;