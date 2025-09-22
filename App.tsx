import React, { useState, useCallback } from 'react';
import { HealthData, Page, Theme } from './types';
import { MOCK_HEALTH_DATA } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataInputForm from './components/DataInputForm';
import { generateWeeklyReport } from './services/geminiService';
import { HeartPulseIcon, MoonIcon, SunIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData[]>(MOCK_HEALTH_DATA);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [weeklySummary, setWeeklySummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  const handleDataSubmit = (newData: HealthData) => {
    setHealthData(prevData => [newData, ...prevData]);
    setCurrentPage(Page.Dashboard);
  };

  const handleGenerateSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    setSummaryError(null);
    setWeeklySummary(null);
    try {
      const summary = await generateWeeklyReport(healthData);
      setWeeklySummary(summary);
    } catch (error) {
      console.error("Error generating weekly summary:", error);
      setSummaryError("Sorry, the AI failed to generate insights. Please try again later.");
    } finally {
      setIsSummaryLoading(false);
    }
  }, [healthData]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return (
          <Dashboard 
            healthData={healthData} 
            onGenerateSummary={handleGenerateSummary}
            weeklySummary={weeklySummary}
            isSummaryLoading={isSummaryLoading}
            summaryError={summaryError}
            theme={theme}
          />
        );
      case Page.LogData:
        return <DataInputForm onSubmit={handleDataSubmit} theme={theme} />;
      default:
        return <Dashboard 
          healthData={healthData} 
          onGenerateSummary={handleGenerateSummary}
          weeklySummary={weeklySummary}
          isSummaryLoading={isSummaryLoading}
          summaryError={summaryError}
          theme={theme}
        />;
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'bg-sky-950 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto [perspective:1200px]">
        <header className="flex items-center justify-between mb-8">
          <div className={`flex items-center space-x-3 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'} md:hidden`}>
            <HeartPulseIcon className="w-8 h-8 text-cyan-400" />
            <h1>Health Intelligence Hub</h1>
          </div>
           <div className="w-full flex justify-end">
             <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'text-gray-300 hover:bg-sky-800' : 'text-gray-600 hover:bg-gray-200'} hover:scale-110 active:scale-100`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </div>
        </header>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;