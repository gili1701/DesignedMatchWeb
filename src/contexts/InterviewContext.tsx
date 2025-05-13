import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { getNextQuestion, submitAnswer as submitAnswerApi } from '../services/api';

interface InterviewState {
  currentSection: string;
  currentField: string;
  answers: Record<string, any>;
}

interface InterviewContextType {
  isInterviewComplete: boolean;
  currentQuestion: string | null;
  startInterview: () => void;
  submitAnswer: (answer: string) => Promise<void>;
  interviewState: InterviewState;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [interviewState, setInterviewState] = useState<InterviewState>({
    currentSection: 'פרטים אישיים',
    currentField: '',
    answers: {}
  });

  const startInterview = async () => {
    if (!user?.id) {
      showToast('User not authenticated', 'error');
      return;
    }

    try {
      const data = await getNextQuestion(user.id);
      if (data.question) {
        setCurrentQuestion(data.question);
      }
    } catch (error) {
      showToast('Failed to start interview', 'error');
    }
  };

  const submitAnswer = async (answer: string) => {
    if (!user?.id) {
      showToast('User not authenticated', 'error');
      return;
    }

    try {
      const data = await submitAnswerApi(user.id, answer);
      
      if (data.done) {
        setIsInterviewComplete(true);
        setCurrentQuestion(null);
        showToast('Interview completed successfully!', 'success');
      } else {
        setCurrentQuestion(data.next_question);
        setInterviewState(prevState => ({
          ...prevState,
          currentSection: data.current_section || prevState.currentSection,
          currentField: data.current_field || '',
          answers: { ...prevState.answers, [data.current_field]: answer }
        }));
      }
    } catch (error) {
      showToast('Failed to submit answer', 'error');
    }
  };

  return (
    <InterviewContext.Provider
      value={{
        isInterviewComplete,
        currentQuestion,
        startInterview,
        submitAnswer,
        interviewState,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};