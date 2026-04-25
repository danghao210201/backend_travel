import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DetailPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, Edit, Trash2, AlertCircle } from 'lucide-react'
import { TourProfile } from '../components/TourProfile'
import { ImageGallery } from '../components/ImageGallery'
import { useTourDetail, useDeleteTour } from '../hooks/useTours'

export const TourDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // ====== DATA FETCHING ======
  const { data, isLoading, error } = useTourDetail(id || '')
  const deleteQuery = useDeleteTour()

  // ====== EVENT HANDLERS ======
  const handleEdit = () => {
    navigate(`/tours/${id}/edit`)
  }

  const handleDelete = () => {
    deleteQuery.mutate(id!, {
      onSuccess: () => {
        navigate('/tours')
      },
    })
  }

  // ====== ERROR STATE ======
  if (error || !data) {
    return (
      <DetailPageLayout
        title="Quản lý tour"
        description="Quản lý danh sách tour trong hệ thống"
        objectName="Không tìm thấy"
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
      </DetailPageLayout>
    )
  }

  const tour = data

  // ====== RENDER ======
  return (
    <>
      <DetailPageLayout
        title="Quản lý tour"
        description="Quản lý danh sách tour trong hệ thống"
        objectName={tour.name || 'Chi tiết tour'}
        breadcrumbItems={[
          { label: 'Quản lý tour', href: '/tours' },
          { label: tour.name || 'Chi tiết', current: true }
        ]}
        actionBarContent={
          <>
            {/* Navigation: Back */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tours')}
              disabled={isLoading}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600" />
              Quay lại
            </Button>

            {/* Divider between groups */}
            <ActionBarDivider />

            {/* Action: Edit */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              disabled={isLoading}
              className="gap-2"
            >
              <Edit className="w-4 h-4 text-blue-600" />
              Chỉnh sửa
            </Button>

            {/* Divider */}
            <ActionBarDivider />

            {/* Action: Delete */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={deleteQuery.isPending}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              Xóa
            </Button>
          </>
        }
      >
        {/* Detail Content */}
        <div className="space-y-6">
          <TourProfile tour={tour} />

          {/* Images Section */}
          {tour.images && tour.images.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Ảnh</h3>
              <ImageGallery images={tour.images} />
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xóa tour?</DialogTitle>
              <DialogDescription>
                Hành động này không thể hoàn tác. Tour sẽ bị xóa vĩnh viễn.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleteQuery.isPending}
              >
                Hủy
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteQuery.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteQuery.isPending ? 'Đang xóa...' : 'Xóa'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DetailPageLayout>
    </>
  )
}
