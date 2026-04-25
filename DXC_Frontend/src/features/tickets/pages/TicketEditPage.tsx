import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, X, Check } from 'lucide-react'
import { TicketForm } from '../components/TicketForm'
import { useUpdateTicket } from '../hooks/useTickets'
import { useTicketDetail } from '../hooks/useTicketDetail'

export const TicketEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const updateMutation = useUpdateTicket()
  const submitRef = useRef<(() => void) | null>(null)

  // ====== DATA FETCHING ======
  const { data, isLoading, error } = useTicketDetail(id!)

  // ====== EVENT HANDLERS ======
  const handleSave = () => {
    if (submitRef.current) {
      submitRef.current()
    }
  }

  // ====== ERROR STATE ======
  if (error || !data?.data) {
    return (
      <FormPageLayout
        formTitle="Không tìm thấy"
        breadcrumbItems={[
          { label: 'Quản lý vé', href: '/tickets' }
        ]}
        actionBarContent={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tickets')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            Quay lại
          </Button>
        }
      >
        <p className="text-center text-gray-600 py-8">
          Vé không tồn tại hoặc đã bị xóa.
        </p>
      </FormPageLayout>
    )
  }

  const item = data.data

  // ====== RENDER ======
  return (
    <FormPageLayout
     title="Quản lý vé"
        description="Danh sách tất cả vé và quyền hạn"
      formTitle={`Chỉnh sửa: ${item.name}`}
      breadcrumbItems={[
        { label: 'Quản lý vé', href: '/tickets' },
        { label: 'Chỉnh sửa', current: true }
      ]}
      actionBarContent={
        <>
          {/* Navigation: Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tickets')}
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
            onClick={() => navigate('/tickets')}
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
      <TicketForm
        initialData={item}
        onSuccess={() => navigate('/tickets')}
        onSave={(submit) => {
          submitRef.current = submit
        }}
      />
    </FormPageLayout>
  )
}

export default TicketEditPage
