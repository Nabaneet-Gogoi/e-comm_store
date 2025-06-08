import Link from 'next/link'
import { getBrands } from '@/sanity/lib/utils'

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Brands</h1>
      
      {brands.length === 0 ? (
        <p className="text-gray-600">No brands found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand: any) => (
            <Link
              key={brand._id}
              href={`/brands/${brand.slug?.current || brand._id}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 