export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export const surveyService = {
  processSurvey: async (answers: SurveyAnswer[]) => {
    // TODO: 설문 응답 처리 로직 구현
    return { surveyId: 'survey-1' };
  },
};

