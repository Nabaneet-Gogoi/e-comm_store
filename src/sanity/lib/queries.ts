// GROQ queries for fetching data from Sanity

// Product queries
export const PRODUCTS_QUERY = `*[_type == "product"] {
  _id,
  name,
  slug,
  price,
  description,
  images,
  category->{
    _id,
    name,
    slug
  },
  brand->{
    _id,
    name,
    slug
  }
} | order(name asc)`

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  price,
  description,
  images,
  details,
  variants,
  category->{
    _id,
    name,
    slug
  },
  brand->{
    _id,
    name,
    slug
  }
}`

// Category queries
export const CATEGORIES_QUERY = `*[_type == "category"] {
  _id,
  name,
  slug
} | order(name asc)`

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  name,
  slug
}`

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category._ref == $categoryId] {
  _id,
  name,
  slug,
  price,
  description,
  images,
  brand->{
    _id,
    name,
    slug
  }
} | order(name asc)`

// Brand queries (required for subtask 5)
export const BRANDS_QUERY = `*[_type == "brand"] {
  _id,
  name,
  slug
} | order(name asc)`

export const BRAND_BY_SLUG_QUERY = `*[_type == "brand" && slug.current == $slug][0] {
  _id,
  name,
  slug
}`

export const PRODUCTS_BY_BRAND_QUERY = `*[_type == "product" && brand._ref == $brandId] {
  _id,
  name,
  slug,
  price,
  description,
  images,
  category->{
    _id,
    name,
    slug
  }
} | order(name asc)` 