import { type SchemaTypeDefinition } from 'sanity'

import brand from './brand'
import category from './category'
import order from './order'
import product from './product'
import user from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, brand, product, order, user],
}
