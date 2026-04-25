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
import { TourTable } from '../components/TourTable'
import { useTours, useDeleteTour } from '../hooks/useTours'
import type { TourTableRow } from '../types'

export const TourListPage = () => {
  const navigate = useNavigate()

  // ====== STATE MANAGEMENT ======

  // Pagination
  const { page, pageSize, setPage, setPageSize, getPaginationParams } = 
    usePagination(20)

  // Search
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm)

  // ====== DATA FETCHING ======
  const { data, isLoading } = useTours({
    ...getPaginationParams(),
    Name: searchTerm || undefined,
  })

  const deleteQuery = useDeleteTour()

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
    if (confirm('Bạn có chắc muốn xóa tour này?')) {
      deleteQuery.mutate(id)
    }
  }

  // ====== RENDER ======
  const items = (data?.data || []) as TourTableRow[]
  const sortedItems = [...items].sort((a, b) => {
    const aOrder = (a as any)?.thuTu ?? 0
    const bOrder = (b as any)?.thuTu ?? 0
    if (aOrder !== bOrder) return aOrder - bOrder
    return String(a?.name || '').localeCompare(String(b?.name || ''))
  })

  return (
    <>
      {/* Main List Page */}
      <ListPageLayout
      title="Quản lý tour"
      description="Quản lý danh sách tour trong hệ thống"
      breadcrumbItems={[
        { label: 'Quản lý tour', current: true }
      ]}
      actionBarContent={
        <>
          {/* Create Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours/create')}
            className="gap-2"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            Thêm tour
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
      <TourTable
        items={sortedItems}
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
          <DialogTitle>Tìm kiếm tour</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <Input
          autoFocus
          placeholder="Nhập tên tour..."
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
