import type { SurveyDto } from './surveyDto'

export interface ApiResultOfSurveyDto {
  success?: boolean
  data?: SurveyDto | null
  message?: string | null
}
