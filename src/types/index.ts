export * from './sanity'

// Common types for the application
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
}

// Component prop types
export interface ProductListingProps {
  initialProducts?: any[]
  initialCategories?: any[]
  initialBrands?: any[]
} 