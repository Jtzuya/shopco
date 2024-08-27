The main goal of this project is to convert a design from Figma to HTML/CSS that ended up becoming an interactive Fullstack app with an admin dashboard.

Stack used:
- Supabase for db
- ReactJS + TS frontend, deployed in Netlify
- NodeJS + TS backend, deployed in Render (server might be slow due to its free tier limits) [repo](https://github.com/Jtzuya/shopco-server)
- AWS S3 API + Cloudflare R2 Bucket
- SCSS for styles

Reminder:
- Animations are not the primary focus
- Interaction is limited to storefront homepage products
- Most data is static
- /admin route can be viewed but cannot create/update/delete products/collections due to db RLS policy
