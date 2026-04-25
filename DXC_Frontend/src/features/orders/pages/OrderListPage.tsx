import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ListPageLayout, ActionBarDivider } from '@/shared/components'
import { usePagination } from '@/shared/hooks'
import { Plus, Search } from 'lucide-react'
import { OrderTable } from '../components/OrderTable'
import { useOrders, useDeleteOrder } from '../hooks/useOrders'

export const OrderListPage = () => {
  const navigate = useNavigate()

  // ====== STATE MANAGEMENT ======
  
  // Pagination
  const { page, pageSize, setPage, setPageSize, getPaginationParams } = 
    usePagination(10)
  
  // Search
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm)
  
  // ====== DATA FETCHING ======
  const { data, isLoading } = useOrders({
    ...getPaginationParams(),
    Name: searchTerm || undefined,
  })
  
  const deleteQuery = useDeleteOrder()

  // ====== EVENT HANDLERS ======

  // Apply search
  const handleSearch = () => {
    setSearchTerm(tempSearchTerm)
    setPage(1) // Reset to page 1 when searching
    setIsSearchOpen(false)
  }

  // Cancel search
  const handleCancelSearch = () => {
    setTempSearchTerm(searchTerm)
    setIsSearchOpen(false)
  }

  // Toggle search dialog
  const handleOpenSearch = (open: boolean) => {
    if (open) {
      setTempSearchTerm(searchTerm)
    }
    setIsSearchOpen(open)
  }

  // Delete item
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      deleteQuery.mutate(id)
    }
  }

  // ====== RENDER ======
  return (
    <>
      {/* Main List Page */}
      <ListPageLayout
        title="Quản lý đơn hàng"
        description="Danh sách tất cả đơn hàng và quyền hạn"
        breadcrumbItems={[
          { label: 'Quản lý đơn hàng', current: true }
        ]}
        actionBarContent={
          <>
            {/* Create Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/orders/create')}
              className="gap-2"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              Thêm đơn hàng
            </Button>

            {/* Divider between button groups */}
            <ActionBarDivider />

            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenSearch(true)}
              className="gap-2"
            >
              <Search className="w-4 h-4 text-blue-600" />
              Tìm kiếm
            </Button>
          </>
        }
      >
        {/* Table Component */}
        <OrderTable
          items={data?.data || []}
          isLoading={isLoading}
          pagination={{
            current: page,
            total: data?.total || 0,
            pageSize: pageSize,
            onChange: setPage,
            onPageSizeChange: setPageSize,
          }}
          onDelete={handleDelete}
        />
      </ListPageLayout>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={handleOpenSearch}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tìm kiếm đơn hàng</DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <Input
            autoFocus
            placeholder="Nhập tên hoặc mã đơn hàng..."
            value={tempSearchTerm}
            onChange={(e) => setTempSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
          />

          {/* Dialog Actions */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancelSearch}
            >
              Hủy
            </Button>
            <Button onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderListPage
