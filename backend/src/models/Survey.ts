export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface Survey {
  id: string;
  userId?: string;
  answers: SurveyAnswer[];
  createdAt: Date;
}

