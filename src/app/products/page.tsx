'use client'

import { useState, useEffect, useMemo } from 'react'
import { getProducts, getCategories, getBrands } from '@/sanity/lib/utils'
import { Product, Category, Brand, SortOption, FilterState } from '@/types'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import SortDropdown from '@/components/SortDropdown'
import { ProductSkeletonGrid } from '@/components/ProductSkeleton'

export default function ProductsPage() {
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter and sort state
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 1000 }
  })
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')
  const [showFilters, setShowFilters] = useState(false)

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          getProducts(),
          getCategories(),
          getBrands()
        ])
        
        setProducts(productsData)
        setCategories(categoriesData)
        setBrands(brandsData)
        
        // Set initial price range based on actual product prices
        const prices = productsData.map((p: Product) => p.price).filter(Boolean)
        if (prices.length > 0) {
          setFilters(prev => ({
            ...prev,
            priceRange: {
              min: Math.min(...prices),
              max: Math.max(...prices)
            }
          }))
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && product.category) {
        if (!filters.categories.includes(product.category._id)) {
          return false
        }
      }
      
      // Brand filter
      if (filters.brands.length > 0 && product.brand) {
        if (!filters.brands.includes(product.brand._id)) {
          return false
        }
      }
      
      // Price range filter
      if (product.price) {
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
          return false
        }
      }
      
      return true
    })

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        default:
          return 0
      }
    })
  }, [products, filters, sortBy])

  // Filter handlers
  const handleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  const handleBrandFilter = (brandId: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(id => id !== brandId)
        : [...prev.brands, brandId]
    }))
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 1000 }
    })
  }

  const hasActiveFilters = filters.categories.length > 0 || filters.brands.length > 0

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse lg:hidden"></div>
            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar skeleton */}
          <aside className="lg:w-64">
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products skeleton */}
          <main className="flex-1">
            <ProductSkeletonGrid count={8} />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>
        
        {/* Mobile filter toggle */}
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            Filters {hasActiveFilters && `(${filters.categories.length + filters.brands.length})`}
          </Button>
          
          {/* Sort dropdown */}
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <FilterSidebar
          categories={categories}
          brands={brands}
          filters={filters}
          onCategoryFilter={handleCategoryFilter}
          onBrandFilter={handleBrandFilter}
          onPriceRangeChange={handlePriceRangeChange}
          onClearFilters={clearAllFilters}
          showFilters={showFilters}
        />

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 