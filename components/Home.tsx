
import React from 'react';
import { AppTab } from '../types';

interface HomeProps {
  onNavigate: (tab: AppTab) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome, Engineer! 🎓</h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Struggling with complex concepts or exam preparation? Your AI Smart Study Companion is here to help you ace your subjects with ease.
          </p>
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => onNavigate(AppTab.CHAT)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Ask Gemini Now
            </button>
            <button 
              onClick={() => onNavigate(AppTab.DOCS)}
              className="bg-white text-slate-700 border border-slate-300 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Technical Docs
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <i className="fas fa-atom text-9xl text-blue-600 rotate-12"></i>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { tab: AppTab.CHAT, title: 'Concept Chat', desc: 'Detailed explanations of engineering topics.', icon: 'fa-brain', color: 'bg-indigo-50 text-indigo-600' },
          { tab: AppTab.EXAM, title: 'Exam Mode', desc: 'Get 5, 10, or 15 mark structured answers.', icon: 'fa-pen-to-square', color: 'bg-emerald-50 text-emerald-600' },
          { tab: AppTab.NOTES, title: 'Quick Notes', desc: 'Summaries, definitions & key points.', icon: 'fa-book', color: 'bg-orange-50 text-orange-600' },
          { tab: AppTab.QUIZ, title: 'Practice Quiz', desc: 'Test your knowledge with AI generated MCQs.', icon: 'fa-vial', color: 'bg-purple-50 text-purple-600' },
        ].map((feat, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(feat.tab)}
            className="group bg-white p-6 rounded-2xl border border-slate-200 text-left hover:border-blue-400 hover:shadow-lg transition-all"
          >
            <div className={`w-12 h-12 ${feat.color} rounded-xl flex items-center justify-center mb-4 text-xl`}>
              <i className={`fas ${feat.icon}`}></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{feat.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
          </button>
        ))}
      </section>

      <section className="bg-blue-900 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Why use AI Smart Study Companion?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="bg-blue-800/50 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-bolt text-blue-300"></i>
            </div>
            <div>
              <h4 className="font-semibold">Instant Revision</h4>
              <p className="text-sm text-blue-100 mt-1">Generate notes in seconds right before your exams.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-800/50 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-check-double text-blue-300"></i>
            </div>
            <div>
              <h4 className="font-semibold">Exam Focused</h4>
              <p className="text-sm text-blue-100 mt-1">Get answers structured exactly as university evaluators expect.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-800/50 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-mobile-screen-button text-blue-300"></i>
            </div>
            <div>
              <h4 className="font-semibold">Pocket Guide</h4>
              <p className="text-sm text-blue-100 mt-1">Access advanced engineering intelligence anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
