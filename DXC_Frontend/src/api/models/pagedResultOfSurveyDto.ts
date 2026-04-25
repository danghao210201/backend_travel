import type { SurveyDto } from './surveyDto'

export interface PagedResultOfSurveyDto {
  success?: boolean
  data: SurveyDto[]
  total: number
  current: number
  pageSize: number
  message?: string | null
}
