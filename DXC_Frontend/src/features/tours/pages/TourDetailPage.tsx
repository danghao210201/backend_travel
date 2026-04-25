import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, Edit } from 'lucide-react'
import { useTourDetail } from '../hooks/useTours'

export const TourDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: detailData, isLoading } = useTourDetail(id as string)

  if (isLoading) return <div>Đang tải...</div>
  if (!detailData?.data) return <div>Không tìm thấy tour</div>

  const tour = detailData.data

  return (
    <FormPageLayout
      title="Chi tiết Tour"
      description="Xem chi tiết thông tin tour"
      formTitle={tour.name || 'Chi tiết tour'}
      breadcrumbItems={[
        { label: 'Quản lý tour', href: '/tours' },
        { label: 'Chi tiết', current: true }
      ]}
      actionBarContent={
        <>
          <Button variant="ghost" size="sm" onClick={() => navigate('/tours')} className="gap-2">
            <ChevronLeft className="w-4 h-4 text-blue-600" /> Quay lại
          </Button>
          <ActionBarDivider />
          <Button variant="ghost" size="sm" onClick={() => navigate(`/tours/${id}/edit`)} className="gap-2">
            <Edit className="w-4 h-4 text-amber-600" /> Chỉnh sửa
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Thông tin chung</h3>
          <p>Giá: {tour.price} {tour.priceCurrency}</p>
          <p>Thời gian: {tour.durationDays} ngày {tour.durationNights} đêm</p>
          <p>Địa điểm xuất phát: {tour.departureLocation}</p>
          <p>Số lượng tối đa: {tour.maxParticipants}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Hình ảnh</h3>
          <div className="flex gap-4">
            {tour.images?.map(img => (
              <img key={img.publicId} src={img.imageUrl!} alt="Tour image" className="w-32 h-32 object-cover rounded" />
            ))}
          </div>
        </div>
      </div>
    </FormPageLayout>
  )
}
