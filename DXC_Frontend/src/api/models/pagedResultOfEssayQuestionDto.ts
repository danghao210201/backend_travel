import type { EssayQuestionDto } from './essayQuestionDto'

export interface PagedResultOfEssayQuestionDto {
  success?: boolean
  data: EssayQuestionDto[]
  total: number
  current: number
  pageSize: number
  message?: string | null
}

