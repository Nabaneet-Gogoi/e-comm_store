import { Category, Brand, FilterState } from '@/types'
import { Button } from '@/components/ui/button'

interface FilterSidebarProps {
  categories: Category[]
  brands: Brand[]
  filters: FilterState
  onCategoryFilter: (categoryId: string) => void
  onBrandFilter: (brandId: string) => void
  onPriceRangeChange: (min: number, max: number) => void
  onClearFilters: () => void
  showFilters: boolean
}

export default function FilterSidebar({
  categories,
  brands,
  filters,
  onCategoryFilter,
  onBrandFilter,
  onPriceRangeChange,
  onClearFilters,
  showFilters
}: FilterSidebarProps) {
  const hasActiveFilters = filters.categories.length > 0 || filters.brands.length > 0

  return (
    <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map(category => (
                <label key={category._id} className="flex items-center cursor-pointer hover:bg-white p-2 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category._id)}
                    onChange={() => onCategoryFilter(category._id)}
                    className="mr-3 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
                    aria-describedby={`category-${category._id}`}
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Brands</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand._id} className="flex items-center cursor-pointer hover:bg-white p-2 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand._id)}
                    onChange={() => onBrandFilter(brand._id)}
                    className="mr-3 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
                    aria-describedby={`brand-${brand._id}`}
                  />
                  <span className="text-sm">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.priceRange.min}
                  onChange={(e) => onPriceRangeChange(Number(e.target.value), filters.priceRange.max)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <span className="text-gray-500 mt-4">-</span>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  placeholder="1000"
                  value={filters.priceRange.max}
                  onChange={(e) => onPriceRangeChange(filters.priceRange.min, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 