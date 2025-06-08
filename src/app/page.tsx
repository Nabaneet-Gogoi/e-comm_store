import Link from "next/link";
import { getProducts, getCategories, getBrands } from "@/sanity/lib/utils";
import { urlFor } from "@/sanity/lib/client";

export default async function Home() {
  // Fetch initial data for the homepage
  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products from top brands across multiple categories. 
            Built with Next.js and powered by Sanity CMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/studio"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Manage Content
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold">{products.length}</h3>
              <p className="text-blue-100">Products Available</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{categories.length}</h3>
              <p className="text-blue-100">Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{brands.length}</h3>
              <p className="text-blue-100">Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {product.images && product.images[0] && (
                    <div className="aspect-square bg-gray-200">
                      <img
                        src={urlFor(product.images[0]).width(400).height(400).url()}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${product.price}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{product.category?.name}</span>
                      <span>{product.brand?.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No products available. Please populate the database first.</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run populate-data</code>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/products"
              className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">All Products</h3>
              <p className="text-gray-600">Browse our complete product catalog</p>
            </Link>
            <Link
              href="/categories"
              className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-semibold mb-2">Categories</h3>
              <p className="text-gray-600">Shop by product categories</p>
            </Link>
            <Link
              href="/brands"
              className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold mb-2">Brands</h3>
              <p className="text-gray-600">Discover products by brand</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// For static generation in app router
export const revalidate = 3600; // Revalidate every hour
