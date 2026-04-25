import { useNavigate } from 'react-router-dom'
import { Eye, Edit, Trash2 } from 'lucide-react'
import type { Column } from '@/shared/components'
import { DataTable } from '@/shared/components'
import type { OrderTableRow } from '../types'

interface OrderTableProps {
  items: OrderTableRow[]
  isLoading?: boolean
  pagination: {
    current: number
    total: number
    pageSize: number
    onChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
  }
  onDelete?: (id: string) => void
}

export const OrderTable = ({
  items,
  isLoading,
  pagination,
  onDelete,
}: OrderTableProps) => {
  const navigate = useNavigate()

  // Define columns to display
  const columns: Column<OrderTableRow>[] = [
    {
      key: 'name',
      label: 'Tên đơn hàng',
      width: '250px',
      sortable: true,
    },
    {
      key: 'code',
      label: 'Mã đơn hàng',
      width: '150px',
      render: (value) => <span className="font-mono text-sm">{value || '-'}</span>,
    },
    {
      key: 'description',
      label: 'Mô tả',
      width: '300px',
      render: (value) => value?.substring(0, 100) + (value && value.length > 100 ? '...' : '') || '-',
    },
    {
      key: 'createdDate',
      label: 'Ngày tạo',
      width: '150px',
      render: (value) => value ? new Date(value).toLocaleDateString('vi-VN') : '-',
    },
  ]

  // Define actions
  const actions = [
    {
      label: 'Xem',
      icon: Eye,
      onClick: (row: OrderTableRow) => {
        if (row.publicId) navigate(`/orders/${row.publicId}`)
      },
    },
    {
      label: 'Sửa',
      icon: Edit,
      onClick: (row: OrderTableRow) => {
        if (row.publicId) navigate(`/orders/${row.publicId}/edit`)
      },
    },
    {
      label: 'Xóa',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (row: OrderTableRow) => {
        if (row.publicId) onDelete?.(row.publicId)
      },
    },
  ]

  // Handle row click to view details
  const handleRowClick = (row: OrderTableRow) => {
    if (row.publicId) {
      navigate(`/orders/${row.publicId}`)
    }
  }

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      actions={actions}
      pagination={pagination}
      rowKey="publicId"
      onRowClick={handleRowClick}
      emptyState={{
        icon: null,
        title: 'Không có dữ liệu',
        description: 'Hãy tạo đơn hàng đầu tiên của bạn',
      }}
    />
  )
}

export default OrderTable
