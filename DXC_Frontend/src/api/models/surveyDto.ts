export interface SurveyDto {
  Id: number
  TenKhaoSat: string
  ThoiGian: string
  DisplayWebsite?: string | null
  Header?: string | null
  Footer?: string | null
  VeViec?: string | null
  IsActive: boolean
  CreatedAt: string
  UpdatedAt: string
}
