import { client } from './client'
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  BRANDS_QUERY,
  BRAND_BY_SLUG_QUERY,
  PRODUCTS_BY_BRAND_QUERY,
} from './queries'

// Product utilities
export async function getProducts() {
  try {
    return await client.fetch(PRODUCTS_QUERY)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(slug: string) {
  try {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
}

// Category utilities
export async function getCategories() {
  try {
    return await client.fetch(CATEGORIES_QUERY)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategory(slug: string) {
  try {
    return await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error)
    return null
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    // First get the category to get its ID
    const category = await getCategory(categorySlug)
    if (!category) return []
    
    return await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, { categoryId: category._id })
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error)
    return []
  }
}

// Brand utilities (required for subtask 5)
export async function getBrands() {
  try {
    return await client.fetch(BRANDS_QUERY)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

export async function getBrand(slug: string) {
  try {
    return await client.fetch(BRAND_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching brand with slug ${slug}:`, error)
    return null
  }
}

export async function getProductsByBrand(brandSlug: string) {
  try {
    // First get the brand to get its ID
    const brand = await getBrand(brandSlug)
    if (!brand) return []
    
    return await client.fetch(PRODUCTS_BY_BRAND_QUERY, { brandId: brand._id })
  } catch (error) {
    console.error(`Error fetching products for brand ${brandSlug}:`, error)
    return []
  }
} 