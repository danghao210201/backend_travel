import { Phone, Mail, Globe, MapPin, Star } from 'lucide-react'
import type { TourWithImagesDto } from '@/api/models'

interface TourProfileProps {
  tour: TourWithImagesDto | null | undefined
}

export const TourProfile = ({ tour }: TourProfileProps) => {
  if (!tour) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Thông tin cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tour.description && (
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-600 mb-2">Mô tả</p>
              <p className="text-gray-900 whitespace-pre-wrap">{tour.description}</p>
            </div>
          )}

          {tour.address && (
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Địa chỉ</p>
                <p className="text-gray-900">{tour.address}</p>
              </div>
            </div>
          )}

          {tour.starRating && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Xếp hạng</p>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.floor(tour.starRating) }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-900">{tour.starRating.toFixed(1)}/5</span>
              </div>
            </div>
          )}

          {tour.operatingHours && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Giờ hoạt động</p>
              <p className="text-gray-900">{tour.operatingHours}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Thông tin liên hệ</h3>
        <div className="space-y-4">
          {tour.phoneNumber && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <a href={`tel:${tour.phoneNumber}`} className="text-blue-600 hover:underline">
                {tour.phoneNumber}
              </a>
            </div>
          )}

          {tour.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <a href={`mailto:${tour.email}`} className="text-blue-600 hover:underline">
                {tour.email}
              </a>
            </div>
          )}

          {tour.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <a
                href={tour.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {tour.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Location Section */}
      {(tour.latitude || tour.longitude || tour.vr360Link) && (
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Thông tin vị trí</h3>
          <div className="space-y-4">
            {tour.latitude && tour.longitude && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Tọa độ</p>
                <p className="text-gray-900 font-mono">
                  {tour.latitude.toFixed(6)}, {tour.longitude.toFixed(6)}
                </p>
              </div>
            )}

            {tour.vr360Link && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">VR 360°</p>
                <a
                  href={tour.vr360Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  Xem VR 360°
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {tour.priceFrom && (
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Thông tin giá</h3>
          <p className="text-gray-900">
            Từ {tour.priceFrom.toLocaleString()} {tour.priceFromCurrency || 'VND'}
          </p>
        </div>
      )}

      {/* Status Section */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Trạng thái</h3>
        <span className={tour.isActive ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          {tour.isActive ? 'Hoạt động' : 'Vô hiệu'}
        </span>
      </div>
    </div>
  )
}

export default TourProfile
