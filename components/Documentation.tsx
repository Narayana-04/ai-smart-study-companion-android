
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Android Technical Prototype Guide</h1>
        <p className="text-slate-600">Documentation for building the AI Smart Study Companion in Android Studio.</p>
      </header>

      <section className="bg-white p-6 rounded-2xl shadow border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-blue-600">1. Android Folder Structure</h2>
        <pre className="bg-slate-900 text-blue-300 p-4 rounded-xl text-xs overflow-x-auto">
{`app/
├── src/main/
│   ├── java/com.example.studycompanion/
│   │   ├── api/
│   │   │   └── GeminiApiService.kt   <-- Retrofit Interface
│   │   ├── repository/
│   │   │   └── StudyRepository.kt    <-- Logic & Data
│   │   ├── viewmodel/
│   │   │   └── StudyViewModel.kt     <-- MVVM state
│   │   ├── ui/
│   │   │   ├── ChatFragment.kt
│   │   │   ├── ExamFragment.kt
│   │   │   └── MainActivity.kt
│   │   └── model/
│   │       └── GeminiModels.kt       <-- Data Classes
│   └── res/
│       ├── layout/                   <-- XML UIs
│       └── drawable/                 <-- Icons`}
        </pre>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-emerald-600">2. Kotlin API Integration Code</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Retrofit Interface (GeminiApiService.kt)</p>
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto">
{`interface GeminiApiService {
    @POST("v1beta/models/gemini-pro:generateContent")
    suspend fun getCompletion(
        @Query("key") apiKey: String,
        @Body request: GeminiRequest
    ): Response<GeminiResponse>
}`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Request Execution (StudyRepository.kt)</p>
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto">
{`class StudyRepository(private val api: GeminiApiService) {
    suspend fun fetchStudyNotes(topic: String): String? {
        val prompt = "Generate short notes for: $topic"
        val request = GeminiRequest(contents = listOf(Content(parts = listOf(Part(text = prompt)))))
        val response = api.getCompletion(API_KEY, request)
        return if (response.isSuccessful) {
            response.body()?.candidates?.get(0)?.content?.parts?.get(0)?.text
        } else null
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-purple-600">3. AI Prompts Used</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li><strong>Exam Mode:</strong> "Provide a comprehensive answer for [topic] for a [marks]-mark question including Diagram description, Principle, and Pros/Cons."</li>
          <li><strong>Notes:</strong> "Summarize [topic] in bullet points for quick revision with key definitions."</li>
          <li><strong>Quiz:</strong> "Generate 5 JSON formatted MCQs for [topic] for testing engineering knowledge."</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-red-600">4. Security & Error Handling</h2>
        <div className="space-y-3 text-sm text-slate-700">
          <p><strong>API Key Security:</strong> Store keys in <code>local.properties</code> and access via <code>BuildConfig</code>. Never hardcode keys in public repos.</p>
          <p><strong>Error Handling:</strong> Use <code>try-catch</code> blocks for network exceptions. Show <code>Snackbar</code> or <code>Toast</code> for API timeouts or 401 Unauthorized errors.</p>
        </div>
      </section>
      
      <div className="bg-slate-100 p-6 rounded-2xl text-center">
        <p className="text-slate-600 font-medium">Ready to deploy? Open Android Studio and start coding with the MVVM architecture patterns described above!</p>
      </div>
    </div>
  );
};

export default Documentation;
