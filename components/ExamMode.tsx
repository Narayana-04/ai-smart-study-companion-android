
import React, { useState } from 'react';
import { generateExamAnswer } from '../geminiService';

const ExamMode: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [marks, setMarks] = useState(5);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await generateExamAnswer(topic, marks);
      setResult(res);
    } catch (e) {
      setResult("Error generating answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <i className="fas fa-file-pen text-blue-600"></i>
          Exam Preparation Mode
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Question Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Working of Three Phase Induction Motor"
              className="w-full bg-white border-2 border-slate-300 text-black font-semibold rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Marks Weightage</label>
            <select
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-full bg-white border-2 border-slate-300 text-black font-semibold rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
            >
              <option value={5}>5 Marks (Concise)</option>
              <option value={10}>10 Marks (Detailed)</option>
              <option value={15}>15 Marks (Comprehensive)</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
        >
          {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
          Generate Standard Answer
        </button>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-inner border border-slate-200 animate-fadeIn overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="font-bold text-lg text-slate-800">Suggested Solution ({marks} Marks)</h3>
            <button 
               onClick={() => {
                 navigator.clipboard.writeText(result);
                 alert("Copied to clipboard!");
               }}
               className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1"
            >
              <i className="fas fa-copy"></i> Copy Answer
            </button>
          </div>
          <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamMode;
