import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, X, Check } from 'lucide-react'
import { TransactionForm } from '../components/TransactionForm'
import { useCreateTransaction } from '../hooks/useTransactions'

export const TransactionCreatePage = () => {
  const navigate = useNavigate()
  const createMutation = useCreateTransaction()
  const submitRef = useRef<(() => void) | null>(null)

  // ====== EVENT HANDLERS ======
  const handleSave = () => {
    if (submitRef.current) {
      submitRef.current()
    }
  }

  // ====== RENDER ======
  return (
    <FormPageLayout
     title="Quản lý giao dịch"
        description="Danh sách tất cả giao dịch và quyền hạn"
      formTitle="Tạo giao dịch mới"
      breadcrumbItems={[
        { label: 'Quản lý giao dịch', href: '/transactions' },
        { label: 'Tạo mới', current: true }
      ]}
      actionBarContent={
        <>
          {/* Navigation: Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/transactions')}
            disabled={createMutation.isPending}
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
            onClick={() => navigate('/transactions')}
            disabled={createMutation.isPending}
            className="gap-2"
          >
            <X className="w-4 h-4 text-blue-600" />
            Hủy
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={createMutation.isPending}
            className="gap-2"
          >
            <Check className="w-4 h-4 text-blue-600" />
            {createMutation.isPending ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </>
      }
    >
      {/* Form Component */}
      <TransactionForm
        onSuccess={() => navigate('/transactions')}
        onSave={(submit) => {
          submitRef.current = submit
        }}
      />
    </FormPageLayout>
  )
}

export default TransactionCreatePage
