import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, X, Check, AlertCircle } from 'lucide-react'
import { TourForm } from '../components/TourForm'
import { useTourDetail, useUpdateTour } from '../hooks/useTours'

export const TourEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const updateMutation = useUpdateTour()
  const submitRef = useRef<(() => void) | null>(null)

  // ====== DATA FETCHING ======
  const { data: tour, isLoading, error } = useTourDetail(id || '')

  // ====== EVENT HANDLERS ======
  const handleSave = () => {
    if (submitRef.current) {
      submitRef.current()
    }
  }

  // ====== ERROR STATE ======
  if (error || !tour) {
    return (
      <FormPageLayout
        title="Quản lý tour"
        description="Quản lý danh sách tour trong hệ thống"
        formTitle="Không tìm thấy"
        breadcrumbItems={[
          { label: 'Quản lý tour', href: '/tours' }
        ]}
        actionBarContent={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            Quay lại
          </Button>
        }
      >
        <div className="text-center py-12 space-y-4">
          <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy tour
            </h3>
            <p className="text-gray-600 mb-6">
              Tour bạn đang tìm không tồn tại hoặc đã bị xóa.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/tours')}
            >
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </FormPageLayout>
    )
  }

  // ====== RENDER ======
  return (
    <FormPageLayout
      title="Quản lý tour"
      description="Quản lý danh sách tour trong hệ thống"
      formTitle={`Chỉnh sửa: ${tour.name}`}
      breadcrumbItems={[
        { label: 'Quản lý tour', href: '/tours' },
        { label: 'Chỉnh sửa', current: true }
      ]}
      actionBarContent={
        <>
          {/* Navigation: Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            Quay lại
          </Button>

          {/* Divider */}
          <ActionBarDivider />

          {/* Form Actions: Cancel, Save */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <X className="w-4 h-4 text-blue-600" />
            Hủy
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <Check className="w-4 h-4 text-blue-600" />
            {updateMutation.isPending ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </>
      }
    >
      {/* Form Component */}
      <TourForm
        initialData={tour}
        onSuccess={() => navigate(`/tours/${id}`)}
        onSave={(submit) => {
          submitRef.current = submit
        }}
      />
    </FormPageLayout>
  )
}
