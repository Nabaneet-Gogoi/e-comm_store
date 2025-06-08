import { SortOption } from '@/types'

interface SortDropdownProps {
  sortBy: SortOption
  onSortChange: (sortOption: SortOption) => void
}

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <label htmlFor="sort-dropdown" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-dropdown"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
      >
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
} 