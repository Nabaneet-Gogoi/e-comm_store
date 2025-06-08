import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.images && product.images[0] ? (
          <Image
            src={urlFor(product.images[0]).width(400).height(400).url()}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {product.price && (
          <p className="text-lg font-semibold text-green-600 mb-2">
            ${product.price.toFixed(2)}
          </p>
        )}
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          {product.category && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              {product.category.name}
            </span>
          )}
          {product.brand && (
            <span>{product.brand.name}</span>
          )}
        </div>
      </div>
    </Link>
  )
} 