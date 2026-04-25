import { useNavigate } from 'react-router-dom'
import { Eye, Edit, Trash2 } from 'lucide-react'
import type { Column } from '@/shared/components'
import { DataTable } from '@/shared/components'
import type { TicketTableRow } from '../types'

interface TicketTableProps {
  items: TicketTableRow[]
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

export const TicketTable = ({
  items,
  isLoading,
  pagination,
  onDelete,
}: TicketTableProps) => {
  const navigate = useNavigate()

  // Define columns to display
  const columns: Column<TicketTableRow>[] = [
    {
      key: 'name',
      label: 'Tên vé',
      width: '250px',
      sortable: true,
    },
    {
      key: 'code',
      label: 'Mã vé',
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
      onClick: (row: TicketTableRow) => {
        if (row.publicId) navigate(`/tickets/${row.publicId}`)
      },
    },
    {
      label: 'Sửa',
      icon: Edit,
      onClick: (row: TicketTableRow) => {
        if (row.publicId) navigate(`/tickets/${row.publicId}/edit`)
      },
    },
    {
      label: 'Xóa',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (row: TicketTableRow) => {
        if (row.publicId) onDelete?.(row.publicId)
      },
    },
  ]

  // Handle row click to view details
  const handleRowClick = (row: TicketTableRow) => {
    if (row.publicId) {
      navigate(`/tickets/${row.publicId}`)
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
        description: 'Hãy tạo vé đầu tiên của bạn',
      }}
    />
  )
}

export default TicketTable
