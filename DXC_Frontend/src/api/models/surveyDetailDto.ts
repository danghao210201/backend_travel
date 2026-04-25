import type { SurveyDto } from './surveyDto'
import type { QuestionDto } from './questionDto'

export interface SurveyDetailDto extends SurveyDto {
  Questions: QuestionDto[]
}
