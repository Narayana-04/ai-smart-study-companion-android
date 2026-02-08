
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: AppTab.HOME, label: 'Dashboard', icon: 'fa-house' },
    { id: AppTab.CHAT, label: 'Concept Chat', icon: 'fa-comments' },
    { id: AppTab.EXAM, label: 'Exam Mode', icon: 'fa-file-signature' },
    { id: AppTab.NOTES, label: 'Notes Generator', icon: 'fa-book-open' },
    { id: AppTab.QUIZ, label: 'Practice Quiz', icon: 'fa-vial-circle-check' },
    { id: AppTab.DOCS, label: 'Android Docs', icon: 'fa-code' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen sticky top-0 shadow-xl">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
          <i className="fas fa-graduation-cap"></i>
          Study Companion
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">AI Powered Assistant</p>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 text-slate-500 text-[10px] text-center italic">
        "Knowledge is power. AI is the engine."
      </div>
    </aside>
  );
};

export default Sidebar;
