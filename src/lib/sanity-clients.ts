import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../sanity/env'

// Read client (optimized for fetching data)
export const readClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true, // Use CDN for faster reads
})

// Write client (for mutations like create, update, delete)
export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_TOKEN, // Requires API token for write operations
})

// Default export for backward compatibility
export const client = readClient

// Utility function to get appropriate client based on operation
export function getSanityClient(operation: 'read' | 'write' = 'read') {
  return operation === 'write' ? writeClient : readClient
} 