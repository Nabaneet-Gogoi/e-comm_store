import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/sanity/lib/utils'
import { PortableText } from '@portabletext/react'
import ProductImageGallery from '@/components/ProductImageGallery'
import AddToCartSection from '@/components/AddToCartSection'
import { Product, ProductDetail, ProductVariant } from '@/types/product'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product: Product | null = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
          <li>•</li>
          <li><Link href="/products" className="hover:text-gray-700">Products</Link></li>
          {product.category && (
            <>
              <li>•</li>
              <li>
                <Link 
                  href={`/categories/${product.category.slug.current}`}
                  className="hover:text-gray-700"
                >
                  {product.category.name}
                </Link>
              </li>
            </>
          )}
          <li>•</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Product Images Gallery Section */}
          <div className="product-gallery">
            <ProductImageGallery 
              images={product.images} 
              productName={product.name}
            />
          </div>

          {/* Product Details Section */}
          <div className="product-details space-y-6 sm:space-y-8">
            {/* Product Header */}
            <div className="product-header">
              <div className="mb-4">
                {product.brand && product.brand.slug?.current && (
                  <Link 
                    href={`/brands/${product.brand.slug.current}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wide"
                  >
                    {product.brand.name}
                  </Link>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
                             <div className="price-section mb-6">
                 <div className="flex items-baseline space-x-3">
                   <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">
                     ${product.price}
                   </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="stock-status mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">In Stock</span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="product-description">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <PortableText value={product.description} />
                </div>
              </div>
            )}

            {/* Product Specifications */}
            {product.details && product.details.length > 0 && (
              <div className="product-specifications">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <dl className="grid grid-cols-1 gap-4">
                    {product.details.map((detail: ProductDetail) => (
                      <div key={detail.key} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <dt className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                          {detail.key}
                        </dt>
                        <dd className="text-gray-700">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="product-variants">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Options</h2>
                <div className="space-y-3">
                  {product.variants.map((variant: ProductVariant) => (
                    <div key={variant.name} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div>
                        <span className="font-medium text-gray-900">{variant.name}</span>
                        {variant.type && (
                          <span className="text-sm text-gray-500 ml-2">({variant.type})</span>
                        )}
                      </div>
                      <div className="text-right">
                        {variant.price && variant.price !== product.price && (
                          <p className="font-bold text-green-600 text-lg">
                            ${variant.price}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          Stock: {variant.stock}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

                         {/* Add to Cart Section */}
             <div className="add-to-cart-section lg:sticky lg:bottom-0 bg-white pt-6 border-t border-gray-200">
              <AddToCartSection 
                product={product}
                variants={product.variants}
              />
            </div>
          </div>
        </div>

        {/* Additional Product Information Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional Information</h2>
            
            {/* Tabs for future enhancement */}
            <div className="space-y-8">
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="prose max-w-none text-gray-700">
                    <PortableText value={product.description} />
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
                <div className="text-gray-700 space-y-2">
                  <p>• Free shipping on orders over $50</p>
                  <p>• 30-day return policy</p>
                  <p>• Ships within 1-2 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to all products
          </Link>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all products
export async function generateStaticParams() {
  const products: Product[] = await getProducts()
  
  return products.map((product: Product) => ({
    slug: product.slug.current,
  }))
}

// For static generation in app router
export const revalidate = 3600 // Revalidate every hour 