# Sanity Data Population Script

This script populates your Sanity CMS with initial sample data for categories, brands, products, and orders.

## Prerequisites

Before running the script, you need to generate a Sanity API token with write permissions.

## Step 1: Generate Sanity API Token

1. Go to [Sanity Management Console](https://manage.sanity.io)
2. Select your project (`mf3yhv7r`)
3. Navigate to **Settings** > **API** > **Tokens**
4. Click **Add new token**
5. Give it a name like "Data Population Script"
6. Set permissions to **Editor** (read + write access)
7. Click **Save**
8. Copy the generated token (it will only be shown once!)

## Step 2: Add Token to Environment

1. Open `.env.local` in your project root
2. Replace `your_sanity_api_token_here` with your actual token:
   ```
   SANITY_API_TOKEN=sk1234567890abcdef...
   ```

## Step 3: Run the Population Script

Execute the following command to populate your Sanity CMS with sample data:

```bash
npm run populate-data
```

## What Gets Created

The script will create:

### Categories (5 items)
- Electronics
- Apparel  
- Home Goods
- Sports & Outdoor
- Books & Media

### Brands (5 items)
- Acme Corp
- Globex Inc.
- Cyberdyne Systems
- Wayne Enterprises
- Stark Industries

### Products (5 items)
- Wireless Bluetooth Headphones (Electronics, Acme Corp)
- Premium Cotton T-Shirt (Apparel, Globex Inc.)
- Smart Coffee Maker (Home Goods, Cyberdyne Systems)
- Running Shoes (Sports & Outdoor, Wayne Enterprises)
- Programming Fundamentals Book (Books & Media, Stark Industries)

### Orders (3 items)
- Sample orders with different statuses (processing, shipped, delivered)
- Realistic order data with multiple products and shipping addresses

## Verification

After running the script:

1. Start your Sanity Studio: `npm run dev` and visit `http://localhost:3000/studio`
2. You should see all the sample data in your CMS
3. You can edit, add, or delete any of the sample data as needed

## Notes

- The script uses `createOrReplace`, so it's safe to run multiple times
- Brand logos are omitted in this script but can be added manually in the Studio
- Product images are omitted but can be added manually in the Studio
- All data follows the schema definitions created in previous steps 