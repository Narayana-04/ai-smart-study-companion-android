
export enum AppTab {
  HOME = 'home',
  CHAT = 'chat',
  EXAM = 'exam',
  NOTES = 'notes',
  QUIZ = 'quiz',
  DOCS = 'docs'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface ExamAnswer {
  marks: number;
  topic: string;
  content: string;
}
