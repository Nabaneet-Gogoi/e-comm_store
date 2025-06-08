import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2025-06-07',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
})

// Sample categories data
const categories = [
  {
    _type: 'category',
    name: 'Electronics',
    slug: { _type: 'slug', current: 'electronics' }
  },
  {
    _type: 'category',
    name: 'Apparel',
    slug: { _type: 'slug', current: 'apparel' }
  },
  {
    _type: 'category',
    name: 'Home Goods',
    slug: { _type: 'slug', current: 'home-goods' }
  },
  {
    _type: 'category',
    name: 'Sports & Outdoor',
    slug: { _type: 'slug', current: 'sports-outdoor' }
  },
  {
    _type: 'category',
    name: 'Books & Media',
    slug: { _type: 'slug', current: 'books-media' }
  }
]

// Sample brands data
const brands = [
  {
    _type: 'brand',
    name: 'Acme Corp',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder' // This will be replaced with actual image refs
      }
    }
  },
  {
    _type: 'brand',
    name: 'Globex Inc.',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder'
      }
    }
  },
  {
    _type: 'brand',
    name: 'Cyberdyne Systems',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder'
      }
    }
  },
  {
    _type: 'brand',
    name: 'Wayne Enterprises',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder'
      }
    }
  },
  {
    _type: 'brand',
    name: 'Stark Industries',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder'
      }
    }
  }
]

async function populateData() {
  try {
    console.log('Starting data population...')

    // First, create categories
    console.log('Creating categories...')
    for (let i = 0; i < categories.length; i++) {
      await client.createOrReplace({
        ...categories[i],
        _id: `category-${i + 1}`
      })
    }
    console.log(`Created ${categories.length} categories`)

    // Then, create brands
    console.log('Creating brands...')
    for (let i = 0; i < brands.length; i++) {
      await client.createOrReplace({
        ...brands[i],
        _id: `brand-${i + 1}`,
        // Remove logo for now since we don't have actual images
        logo: undefined
      })
    }
    console.log(`Created ${brands.length} brands`)

    // Create sample products
    console.log('Creating products...')
    const products = [
      {
        _id: 'product-1',
        _type: 'product',
        name: 'Wireless Bluetooth Headphones',
        slug: { _type: 'slug', current: 'wireless-bluetooth-headphones' },
        brand: { _type: 'reference', _ref: 'brand-1' }, // Acme Corp
        category: { _type: 'reference', _ref: 'category-1' }, // Electronics
        price: 99.99,
        description: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.'
            }]
          }
        ],
        details: [
          { _key: 'battery', key: 'Battery Life', value: '20 hours' },
          { _key: 'connectivity', key: 'Connectivity', value: 'Bluetooth 5.0' },
          { _key: 'weight', key: 'Weight', value: '250g' }
        ],
        variants: [
          { _key: 'black', name: 'Black', price: 99.99, stock: 50 },
          { _key: 'white', name: 'White', price: 99.99, stock: 30 },
          { _key: 'blue', name: 'Blue', price: 104.99, stock: 25 }
        ]
      },
      {
        _id: 'product-2',
        _type: 'product',
        name: 'Premium Cotton T-Shirt',
        slug: { _type: 'slug', current: 'premium-cotton-t-shirt' },
        brand: { _type: 'reference', _ref: 'brand-2' }, // Globex Inc
        category: { _type: 'reference', _ref: 'category-2' }, // Apparel
        price: 29.99,
        description: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'Soft, comfortable premium cotton t-shirt perfect for everyday wear.'
            }]
          }
        ],
        details: [
          { _key: 'material', key: 'Material', value: '100% Premium Cotton' },
          { _key: 'care', key: 'Care', value: 'Machine washable' },
          { _key: 'fit', key: 'Fit', value: 'Regular fit' }
        ],
        variants: [
          { _key: 'small', name: 'Small', price: 29.99, stock: 20 },
          { _key: 'medium', name: 'Medium', price: 29.99, stock: 35 },
          { _key: 'large', name: 'Large', price: 29.99, stock: 40 },
          { _key: 'xl', name: 'X-Large', price: 29.99, stock: 15 }
        ]
      },
      {
        _id: 'product-3',
        _type: 'product',
        name: 'Smart Coffee Maker',
        slug: { _type: 'slug', current: 'smart-coffee-maker' },
        brand: { _type: 'reference', _ref: 'brand-3' }, // Cyberdyne Systems
        category: { _type: 'reference', _ref: 'category-3' }, // Home Goods
        price: 149.99,
        description: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'WiFi-enabled smart coffee maker with app control and programmable brewing.'
            }]
          }
        ],
        details: [
          { _key: 'capacity', key: 'Capacity', value: '12 cups' },
          { _key: 'connectivity', key: 'Connectivity', value: 'WiFi' },
          { _key: 'features', key: 'Features', value: 'Programmable, Auto-shutoff' }
        ],
        variants: [
          { _key: 'stainless', name: 'Stainless Steel', price: 149.99, stock: 15 },
          { _key: 'black', name: 'Matte Black', price: 159.99, stock: 12 }
        ]
      },
      {
        _id: 'product-4',
        _type: 'product',
        name: 'Running Shoes',
        slug: { _type: 'slug', current: 'running-shoes' },
        brand: { _type: 'reference', _ref: 'brand-4' }, // Wayne Enterprises
        category: { _type: 'reference', _ref: 'category-4' }, // Sports & Outdoor
        price: 89.99,
        description: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'Lightweight running shoes with superior cushioning and breathable mesh upper.'
            }]
          }
        ],
        details: [
          { _key: 'weight', key: 'Weight', value: '280g' },
          { _key: 'drop', key: 'Heel-to-toe drop', value: '8mm' },
          { _key: 'upper', key: 'Upper', value: 'Breathable mesh' }
        ],
        variants: [
          { _key: 'us8', name: 'US 8', price: 89.99, stock: 10 },
          { _key: 'us9', name: 'US 9', price: 89.99, stock: 15 },
          { _key: 'us10', name: 'US 10', price: 89.99, stock: 12 },
          { _key: 'us11', name: 'US 11', price: 89.99, stock: 8 }
        ]
      },
      {
        _id: 'product-5',
        _type: 'product',
        name: 'Programming Fundamentals Book',
        slug: { _type: 'slug', current: 'programming-fundamentals-book' },
        brand: { _type: 'reference', _ref: 'brand-5' }, // Stark Industries
        category: { _type: 'reference', _ref: 'category-5' }, // Books & Media
        price: 39.99,
        description: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'Comprehensive guide to programming fundamentals covering multiple languages and concepts.'
            }]
          }
        ],
        details: [
          { _key: 'pages', key: 'Pages', value: '450' },
          { _key: 'format', key: 'Format', value: 'Paperback' },
          { _key: 'language', key: 'Language', value: 'English' }
        ],
        variants: [
          { _key: 'paperback', name: 'Paperback', price: 39.99, stock: 25 },
          { _key: 'hardcover', name: 'Hardcover', price: 54.99, stock: 15 },
          { _key: 'ebook', name: 'E-book', price: 24.99, stock: 999 }
        ]
      }
    ]

    for (const product of products) {
      await client.createOrReplace(product)
    }
    console.log(`Created ${products.length} products`)

    // Create sample orders
    console.log('Creating orders...')
    const orders = [
      {
        _id: 'order-1',
        _type: 'order',
        orderId: 'ORD-2024-001',
        userEmail: 'john.doe@example.com',
        items: [
          {
            _key: 'item1',
            product: { _type: 'reference', _ref: 'product-1' },
            quantity: 1
          },
          {
            _key: 'item2',
            product: { _type: 'reference', _ref: 'product-2' },
            quantity: 2
          }
        ],
        totalAmount: 159.97,
        shippingAddress: {
          street: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'United States'
        },
        status: 'processing'
      },
      {
        _id: 'order-2',
        _type: 'order',
        orderId: 'ORD-2024-002',
        userEmail: 'jane.smith@example.com',
        items: [
          {
            _key: 'item1',
            product: { _type: 'reference', _ref: 'product-3' },
            quantity: 1
          }
        ],
        totalAmount: 149.99,
        shippingAddress: {
          street: '456 Oak Avenue',
          city: 'Los Angeles',
          postalCode: '90210',
          country: 'United States'
        },
        status: 'shipped'
      },
      {
        _id: 'order-3',
        _type: 'order',
        orderId: 'ORD-2024-003',
        userEmail: 'mike.johnson@example.com',
        items: [
          {
            _key: 'item1',
            product: { _type: 'reference', _ref: 'product-4' },
            quantity: 1
          },
          {
            _key: 'item2',
            product: { _type: 'reference', _ref: 'product-5' },
            quantity: 1
          }
        ],
        totalAmount: 129.98,
        shippingAddress: {
          street: '789 Pine Road',
          city: 'Chicago',
          postalCode: '60601',
          country: 'United States'
        },
        status: 'delivered'
      }
    ]

    for (const order of orders) {
      await client.createOrReplace(order)
    }
    console.log(`Created ${orders.length} orders`)

    console.log('✅ Data population completed successfully!')
    console.log(`
Summary:
- ${categories.length} categories created
- ${brands.length} brands created  
- ${products.length} products created
- ${orders.length} orders created

You can now view and edit this data in your Sanity Studio.
    `)

  } catch (error) {
    console.error('❌ Error populating data:', error)
  }
}

populateData() 