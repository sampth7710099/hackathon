import React from 'react';
import { Page, Theme } from '../types';
import { DashboardIcon, EditIcon, HeartPulseIcon } from './IconComponents';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, theme }) => {
  const navItems = [
    { page: Page.Dashboard, label: 'Dashboard', icon: DashboardIcon },
    { page: Page.LogData, label: 'Log Data', icon: EditIcon },
  ];

  const baseClasses = "flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-all duration-200 ease-in-out transform-gpu";
  
  const lightTheme = {
    aside: "bg-white border-r border-gray-200",
    headerText: "text-slate-800",
    button: "text-gray-600 hover:bg-gray-100 hover:-translate-y-1 active:scale-95",
    activeButton: "bg-cyan-500 text-white shadow-lg",
  };

  const darkTheme = {
    aside: "bg-sky-900/50",
    headerText: "text-white",
    button: "text-gray-300 hover:bg-sky-800 hover:-translate-y-1 active:scale-95",
    activeButton: "bg-cyan-500 text-white shadow-lg",
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <aside className={`${currentTheme.aside} md:w-64 flex-shrink-0`}>
      <div className="p-6 hidden md:flex items-center space-x-3">
        <HeartPulseIcon className="w-8 h-8 text-cyan-400" />
        <h1 className={`text-xl font-bold ${currentTheme.headerText}`}>Health Hub</h1>
      </div>
      <nav className="p-4 flex md:flex-col md:space-y-2 justify-center md:justify-start">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`${baseClasses} ${
              currentPage === item.page
                ? currentTheme.activeButton
                : currentTheme.button
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;