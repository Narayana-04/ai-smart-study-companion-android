
import React, { useState } from 'react';
import { generateQuiz } from '../geminiService';
import { QuizQuestion } from '../types';

const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    try {
      const res = await generateQuiz(topic);
      setQuestions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (idx: number, option: string) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [idx]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
          <i className="fas fa-vial-circle-check text-purple-600"></i>
          AI Quiz Master
        </h2>
        <p className="text-slate-500 text-sm mb-4 font-medium">Generate 5 quick MCQs to test your grip on the subject.</p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter Topic (e.g. SQL Joins)"
            className="flex-1 bg-white border-2 border-slate-300 text-black font-semibold rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition shadow-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-purple-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
          >
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-play"></i>}
            Start Quiz
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-4 animate-fadeIn pb-10">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-800 mb-4">{idx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(idx, opt)}
                    className={`text-left p-3 rounded-lg border-2 transition-all ${
                      selectedAnswers[idx] === opt
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    } ${
                      showResults && opt === q.answer ? 'bg-green-100 border-green-500 text-green-700' : ''
                    } ${
                      showResults && selectedAnswers[idx] === opt && opt !== q.answer ? 'bg-red-100 border-red-500 text-red-700' : ''
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-black transition shadow-lg"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-2xl font-bold">Your Score: {calculateScore()} / {questions.length}</h3>
              <p className="mt-2 opacity-90">{calculateScore() === questions.length ? 'Outstanding! You are ready for the exam.' : 'Good try! Review the topics again.'}</p>
              <button 
                onClick={handleGenerate}
                className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-slate-50 transition shadow-md"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
