import type { AnswerDto } from './answerDto'

export interface QuestionDto {
  Id: number
  NoiDung: string
  CauHoiTuLuan?: string | null
  STT?: number | null
  Answers: AnswerDto[]
}
