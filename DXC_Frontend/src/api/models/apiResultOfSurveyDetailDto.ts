import type { SurveyDetailDto } from './surveyDetailDto'

export interface ApiResultOfSurveyDetailDto {
  success?: boolean
  data?: SurveyDetailDto | null
  message?: string | null
}
