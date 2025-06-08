export interface ProductImage {
  _key: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface ProductDetail {
  _key: string
  key: string
  value: string
}

export interface ProductVariant {
  _key: string
  name: string
  type?: string
  price?: number
  stock: number
}

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
    _type: 'slug'
  }
}

export interface Brand {
  _id: string
  name: string
  slug: {
    current: string
    _type: 'slug'
  }
}

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: {
    current: string
    _type: 'slug'
  }
  price: number
  originalPrice?: number
  description?: unknown[] // Portable Text
  images?: ProductImage[]
  details?: ProductDetail[]
  variants?: ProductVariant[]
  category?: Category
  brand?: Brand
  inStock?: boolean
  featured?: boolean
  _createdAt: string
  _updatedAt: string
} 