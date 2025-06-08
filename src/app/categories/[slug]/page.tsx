import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getProductsByCategory, getCategories } from '@/sanity/lib/utils'
import { urlFor } from '@/sanity/lib/client'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  const products = await getProductsByCategory(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
      </div>

      {/* Products Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Products in {category.name} ({products.length})
        </h2>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {product.images && product.images[0] && (
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={urlFor(product.images[0]).width(300).height(300).url()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  {product.price && (
                    <p className="text-lg font-bold text-green-600">
                      ${product.price}
                    </p>
                  )}
                  {product.brand && (
                    <p className="text-sm text-gray-500 mt-1">
                      {product.brand.name}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <Link
          href="/categories"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category: any) => ({
    slug: category.slug.current,
  }))
}

// For static generation in app router
export const revalidate = 3600 // Revalidate every hour 