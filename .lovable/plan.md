

## Problem

The admin dashboard shows no images because it fetches from the database (`gallery_images` and `featured_models` tables), which are both empty. The website currently displays hardcoded images imported from `src/assets/` as fallbacks. The admin has no visibility into what's currently live on the site.

## Solution

### 1. Seed the database with existing static images

Create a one-time admin action (or auto-seed on first load) that:
- Uploads all 20 static gallery images (`111.jpeg` through `130.png`) from `src/assets/` to the `gallery-images` storage bucket
- Inserts corresponding records into `gallery_images` table
- Uploads location-specific images (`b1-b8`, `c1-c8`, `h1-h2`) to `featured-models` bucket under city folders
- Inserts records into `featured_models` table with correct `city`/`location_name`

### 2. Add "Seed Existing Images" button in Admin Dashboard

Add a one-click button in both Gallery and Featured Models admin sections:
- "Import Static Images" button that programmatically uploads the bundled assets to storage and creates DB records
- Shows progress during seeding
- Disabled/hidden after images exist

### 3. Update Gallery page to stop using fallbacks when DB has data

Modify `Gallery.tsx` to only use fallback images when the database query returns empty. Currently it already does this, but the DB is empty so fallbacks always show.

### 4. Update Admin Gallery to show fallback images info

When the DB is empty, show a message: "The website is currently showing 20 built-in static images. Click 'Import Static Images' to add them to the database so you can manage them."

## Files to modify

- **`src/pages/admin/AdminGallery.tsx`** -- Add "Import Static Images" button that uploads all 20 assets to storage + inserts DB records. Show info banner when DB is empty.
- **`src/pages/admin/AdminFeaturedModels.tsx`** -- Add "Import Static Images" button per city for location images. Show info when DB is empty.
- **`src/pages/Gallery.tsx`** -- No changes needed (fallback logic already works).
- **`src/pages/locations/LocationPage.tsx`** -- No changes needed (fallback logic already works).

## Technical approach

The import buttons will:
1. Dynamically import each asset file using static imports already in the codebase
2. Fetch each image as a blob, upload to the correct storage bucket
3. Get the public URL and insert a record in the database
4. Invalidate the React Query cache to refresh the view
5. Show upload progress throughout

