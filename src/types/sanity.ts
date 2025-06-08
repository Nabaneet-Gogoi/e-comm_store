// Sanity content types

export interface SanitySlug {
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Product {
  _id: string
  name: string
  slug: SanitySlug
  price: number
  description?: any[] // Rich text blocks
  images?: SanityImage[]
  details?: Array<{
    _key: string
    key: string
    value: string
  }>
  variants?: Array<{
    _key: string
    name: string
    type: string
    price?: number
    stock: number
  }>
  category?: {
    _id: string
    name: string
    slug: SanitySlug
  }
  brand?: {
    _id: string
    name: string
    slug: SanitySlug
  }
}

export interface Category {
  _id: string
  name: string
  slug: SanitySlug
}

export interface Brand {
  _id: string
  name: string
  slug: SanitySlug
  logo?: SanityImage
} 