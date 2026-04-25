import type {
  ApiResult,
  ApiResultOfSurveyDetailDto,
  ApiResultOfSurveyDto,
  CreateSurveyCommand,
  DeleteSurveyCommand,
  GetApiZaloMiniAppAdminKhaosatParams,
  PagedResultOfSurveyDto,
  UpdateSurveyCommand,
} from '../models'
import type { PagedResultOfEssayQuestionDto } from '../models/pagedResultOfEssayQuestionDto'
import { customRequest } from '../request'

type ThongKeChiTietCauTraLoiDto = { idCauHoi: number; cauHoi: string; idTraLoi?: number | null; traLoi: string }
type ThongKeChiTietUserDto = { idUser: number; hoTen: string; diaChi: string; cauTraLoi: ThongKeChiTietCauTraLoiDto[] }
type ResponsesUsersPagedDto = { success?: boolean; data: number[]; total?: number; current?: number; pageSize?: number; message?: string | null }
type EssayResponseByUserDto = { idUser: number; surveyId: number; essayQuestionId: number; cauHoiTuLuan: string; content: string; createdAt: string }

export const getZaloMiniAppKhaoSatAdmin = () => {
  const getApiZaloMiniAppAdminKhaosat = (params?: GetApiZaloMiniAppAdminKhaosatParams) => {
    return customRequest<PagedResultOfSurveyDto>({
      url: `/api/zalo-mini-app/admin/khaosat`,
      method: 'GET',
      params,
    })
  }
  const getApiZaloMiniAppAdminKhaosatId = (id: number) => {
    return customRequest<ApiResultOfSurveyDetailDto>({
      url: `/api/zalo-mini-app/admin/khaosat/${id}`,
      method: 'GET',
    })
  }
  const postApiZaloMiniAppAdminKhaosatCreate = (createSurveyCommand: CreateSurveyCommand) => {
    return customRequest<ApiResultOfSurveyDto>({
      url: `/api/zalo-mini-app/admin/khaosat/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createSurveyCommand,
    })
  }
  const postApiZaloMiniAppAdminKhaosatUpdate = (updateSurveyCommand: UpdateSurveyCommand) => {
    return customRequest<ApiResultOfSurveyDto>({
      url: `/api/zalo-mini-app/admin/khaosat/update`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: updateSurveyCommand,
    })
  }
  const postApiZaloMiniAppAdminKhaosatDelete = (deleteSurveyCommand: DeleteSurveyCommand) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/delete`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: deleteSurveyCommand,
    })
  }
  const postApiZaloMiniAppAdminKhaosatQuestionsCreate = (data: { SurveyId: number; NoiDung: string; CauHoiTuLuan?: string | null; STT?: number | null }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/questions/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatQuestionsUpdate = (data: { Id: number; NoiDung: string; STT?: number | null }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/questions/update`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatQuestionsDelete = (data: { Id: number }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/questions/delete`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatAnswersCreate = (data: { QuestionId: number; TraLoi: string }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/answers/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatAnswersUpdate = (data: { Id: number; TraLoi: string }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/answers/update`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatAnswersDelete = (data: { Id: number }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/answers/delete`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const getApiZaloMiniAppAdminKhaosatTuLuan = (params: { SurveyId: number; Current?: number; PageSize?: number }) => {
    return customRequest<PagedResultOfEssayQuestionDto>({
      url: `/api/zalo-mini-app/admin/khaosat/tuluan`,
      method: 'GET',
      params,
    })
  }
  const postApiZaloMiniAppAdminKhaosatTuLuanCreate = (data: { SurveyId: number; CauHoiTuLuan: string }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/tuluan/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatTuLuanUpdate = (data: { Id: number; CauHoiTuLuan: string }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/tuluan/update`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const postApiZaloMiniAppAdminKhaosatTuLuanDelete = (data: { Id: number }) => {
    return customRequest<ApiResult>({
      url: `/api/zalo-mini-app/admin/khaosat/tuluan/delete`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data,
    })
  }
  const getApiZaloMiniAppAdminKhaosatThongKeChiTiet = (params: { SurveyId: number }) => {
    return customRequest<{ success?: boolean; data: ThongKeChiTietUserDto[]; message?: string | null }>({
      url: `/api/zalo-mini-app/admin/khaosat/thongke/chitiet`,
      method: 'GET',
      params,
    })
  }
  const getApiZaloMiniAppAdminKhaosatResponsesUsers = (params: { SurveyId: number; QuestionId?: number; Current?: number; PageSize?: number }) => {
    return customRequest<ResponsesUsersPagedDto>({
      url: `/api/zalo-mini-app/admin/khaosat/responses/users`,
      method: 'GET',
      params,
    })
  }
  const getApiZaloMiniAppAdminKhaosatTuLuanResponsesByUser = (params: { SurveyId: number; IDUser?: number }) => {
    return customRequest<{ success?: boolean; data: EssayResponseByUserDto[]; message?: string | null }>({
      url: `/api/zalo-mini-app/admin/khaosat/tuluan/responses/by-user`,
      method: 'GET',
      params,
    })
  }
  return {
    getApiZaloMiniAppAdminKhaosat,
    getApiZaloMiniAppAdminKhaosatId,
    postApiZaloMiniAppAdminKhaosatCreate,
    postApiZaloMiniAppAdminKhaosatUpdate,
    postApiZaloMiniAppAdminKhaosatDelete,
    postApiZaloMiniAppAdminKhaosatQuestionsCreate,
    postApiZaloMiniAppAdminKhaosatQuestionsUpdate,
    postApiZaloMiniAppAdminKhaosatQuestionsDelete,
    postApiZaloMiniAppAdminKhaosatAnswersCreate,
    postApiZaloMiniAppAdminKhaosatAnswersUpdate,
    postApiZaloMiniAppAdminKhaosatAnswersDelete,
    getApiZaloMiniAppAdminKhaosatTuLuan,
    postApiZaloMiniAppAdminKhaosatTuLuanCreate,
    postApiZaloMiniAppAdminKhaosatTuLuanUpdate,
    postApiZaloMiniAppAdminKhaosatTuLuanDelete,
    getApiZaloMiniAppAdminKhaosatThongKeChiTiet,
    getApiZaloMiniAppAdminKhaosatResponsesUsers,
    getApiZaloMiniAppAdminKhaosatTuLuanResponsesByUser,
  }
}
export type GetApiZaloMiniAppAdminKhaosatResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getZaloMiniAppKhaoSatAdmin>['getApiZaloMiniAppAdminKhaosat']>>
>
export type GetApiZaloMiniAppAdminKhaosatIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getZaloMiniAppKhaoSatAdmin>['getApiZaloMiniAppAdminKhaosatId']>>
>
export type PostApiZaloMiniAppAdminKhaosatCreateResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getZaloMiniAppKhaoSatAdmin>['postApiZaloMiniAppAdminKhaosatCreate']>>
>
export type PostApiZaloMiniAppAdminKhaosatUpdateResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getZaloMiniAppKhaoSatAdmin>['postApiZaloMiniAppAdminKhaosatUpdate']>>
>
export type PostApiZaloMiniAppAdminKhaosatDeleteResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getZaloMiniAppKhaoSatAdmin>['postApiZaloMiniAppAdminKhaosatDelete']>>
>
