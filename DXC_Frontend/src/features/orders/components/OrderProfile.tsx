import type { OrderDto } from '@/api/models'

interface OrderProfileProps {
  order: OrderDto | null | undefined
}

export const OrderProfile = ({ order }: OrderProfileProps) => {
  if (!order) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Name and Code Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Tên</h3>
          <p className="text-lg text-gray-900">{order.name || '-'}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Mã</h3>
          <p className="text-lg text-gray-900 font-mono">{order.code || '-'}</p>
        </div>
      </div>

      {/* Description Section */}
      {order.description && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Mô tả</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{order.description}</p>
        </div>
      )}

      {/* Metadata Section */}
      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h3 className="font-semibold text-gray-600 mb-1">ID hệ thống</h3>
          <p className="text-gray-600 font-mono">{order.publicId || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderProfile
