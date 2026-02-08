
import React, { useState } from 'react';
import { AppTab } from './types';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ChatAssistant from './components/ChatAssistant';
import ExamMode from './components/ExamMode';
import NotesGenerator from './components/NotesGenerator';
import QuizGenerator from './components/QuizGenerator';
import Documentation from './components/Documentation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME: return <Home onNavigate={setActiveTab} />;
      case AppTab.CHAT: return <ChatAssistant />;
      case AppTab.EXAM: return <ExamMode />;
      case AppTab.NOTES: return <NotesGenerator />;
      case AppTab.QUIZ: return <QuizGenerator />;
      case AppTab.DOCS: return <Documentation />;
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 z-50">
        <button onClick={() => setActiveTab(AppTab.HOME)} className={`flex flex-col items-center ${activeTab === AppTab.HOME ? 'text-blue-600' : 'text-slate-400'}`}>
          <i className="fas fa-home text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.CHAT)} className={`flex flex-col items-center ${activeTab === AppTab.CHAT ? 'text-blue-600' : 'text-slate-400'}`}>
          <i className="fas fa-comment-dots text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">AI Chat</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.EXAM)} className={`flex flex-col items-center ${activeTab === AppTab.EXAM ? 'text-blue-600' : 'text-slate-400'}`}>
          <i className="fas fa-file-pen text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Exam</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.NOTES)} className={`flex flex-col items-center ${activeTab === AppTab.NOTES ? 'text-blue-600' : 'text-slate-400'}`}>
          <i className="fas fa-notes-medical text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Notes</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.QUIZ)} className={`flex flex-col items-center ${activeTab === AppTab.QUIZ ? 'text-blue-600' : 'text-slate-400'}`}>
          <i className="fas fa-brain text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default App;
