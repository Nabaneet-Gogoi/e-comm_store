import Link from 'next/link'
import { getCategories } from '@/sanity/lib/utils'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600">Browse products in this category</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// For static generation in app router
export const revalidate = 3600 // Revalidate every hour 