import type { TransactionDto } from '@/api/models'

interface TransactionProfileProps {
  transaction: TransactionDto | null | undefined
}

export const TransactionProfile = ({ transaction }: TransactionProfileProps) => {
  if (!transaction) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Name and Code Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Tên</h3>
          <p className="text-lg text-gray-900">{transaction.name || '-'}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Mã</h3>
          <p className="text-lg text-gray-900 font-mono">{transaction.code || '-'}</p>
        </div>
      </div>

      {/* Description Section */}
      {transaction.description && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Mô tả</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{transaction.description}</p>
        </div>
      )}

      {/* Metadata Section */}
      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h3 className="font-semibold text-gray-600 mb-1">ID hệ thống</h3>
          <p className="text-gray-600 font-mono">{transaction.publicId || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default TransactionProfile
