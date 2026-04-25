export interface InsertQuestionCommand {
  SurveyId: number
  NoiDung: string
  CauHoiTuLuan?: string | null
  STT?: number | null
}

