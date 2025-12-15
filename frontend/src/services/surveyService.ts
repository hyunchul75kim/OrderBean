import { apiClient } from './api';

export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface SurveyResponse {
  surveyId: string;
  answers: SurveyAnswer[];
}

export const surveyService = {
  submitSurvey: async (answers: SurveyAnswer[]): Promise<SurveyResponse> => {
    return apiClient.post('/survey', { answers });
  },
};

