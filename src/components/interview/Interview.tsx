import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useInterview } from '../../contexts/InterviewContext';

const Interview: React.FC = () => {
  const { currentQuestion, submitAnswer, interviewState } = useInterview();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitAnswer(answer);
      setAnswer('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-800">
            {interviewState.currentSection}
          </h3>
          <span className="text-sm text-neutral-500">
            {interviewState.currentField}
          </span>
        </div>

        <div className="min-h-[100px] bg-neutral-50 rounded-lg p-4">
          <p className="text-neutral-800 text-right">{currentQuestion}</p>
        </div>
        
        <div className="flex gap-2">
          <textarea
            className="flex-1 rounded-lg border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 text-right"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="הקלד את תשובתך כאן..."
            rows={3}
            dir="rtl"
          />
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
            loading={isSubmitting}
            icon={<Send size={18} />}
          >
            שלח
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Interview;