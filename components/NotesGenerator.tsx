
import React, { useState } from 'react';
import { generateNotes } from '../geminiService';

const NotesGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await generateNotes(topic);
      setResult(res);
    } catch (e) {
      setResult("Error generating notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
          <i className="fas fa-notes-medical text-orange-600"></i>
          Quick Notes Generator
        </h2>
        <p className="text-slate-500 text-sm mb-4 font-medium">Convert complex topics into bullet points and key definitions.</p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic name (e.g. OSI Model Layers)"
            className="flex-1 bg-white border-2 border-slate-300 text-black font-semibold rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition shadow-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-orange-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
          >
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-bolt"></i>}
            Summarize
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fas fa-list-check text-orange-500"></i> Revision Summary
            </h3>
            <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-microchip text-blue-400"></i> Digital Flashcard
            </h3>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-blue-300 text-xs font-bold uppercase mb-2">Subject Context</p>
              <p className="text-lg font-medium">"{topic}"</p>
              <div className="mt-4 pt-4 border-t border-slate-700 text-slate-300 text-sm italic">
                Focus on the core architecture and primary use-case for this topic in engineering exams.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesGenerator;
