Coupon Redemption App
A React application for coupon redemption, built with Vite and deployable to Cloudflare Pages.

Project Structure
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles
│   └── components/
│       └── CouponRedemptionForm.tsx
├── components/              # UI components (your existing components)
├── imports/                # SVG imports and other assets
├── styles/                 # Additional styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── wrangler.toml          # Cloudflare Workers configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
Setup Instructions
1. Install Dependencies
bash
npm install
2. Development
Run the development server locally:

bash
npm run dev
The app will be available at http://localhost:5173

3. Build
Build the production version:

bash
npm run build
4. Preview Build Locally
Preview the production build locally:

bash
npm run preview
Deployment to Cloudflare Pages
Option 1: Using Wrangler CLI
Install Wrangler globally (if you haven't already):
bash
npm install -g wrangler
Login to Cloudflare:
bash
wrangler login
Build and deploy:
bash
npm run build
npm run pages:deploy
Option 2: Using Cloudflare Dashboard
Build the project:
bash
npm run build
Upload to Cloudflare Pages:
Go to Cloudflare Dashboard
Navigate to Pages
Click "Create a project"
Upload the dist folder
Option 3: Git Integration (Recommended)
Push your code to GitHub/GitLab
Connect to Cloudflare Pages:
Go to Cloudflare Dashboard → Pages
Click "Connect to Git"
Select your repository
Configure build settings:
Build command: npm run build
Build output directory: dist
Node.js version: 18 or 20
Deploy: Cloudflare will automatically build and deploy your app
Build Configuration
Framework: Vite + React + TypeScript
CSS: Tailwind CSS
Output: Static files in dist/ directory
Deployment: Cloudflare Pages (static hosting)
Environment Variables
If you need environment variables, create a .env file:

env
VITE_API_URL=your-api-url
VITE_API_KEY=your-api-key
And access them in your code as:

javascript
const apiUrl = import.meta.env.VITE_API_URL
File Organization
Make sure to organize your files as follows:

Move your existing files:
components/CouponRedemptionForm.tsx → Keep in components/
imports/ folder → Keep as is
styles/globals.css → Content goes into src/index.css
Create new files as shown in the artifacts above
Update imports in your components to use the new structure
Deployment URL
After deployment, your app will be available at: https://your-project-name.pages.dev

Custom Domain (Optional)
To use a custom domain:

Go to Cloudflare Pages dashboard
Select your project
Go to "Custom domains"
Add your domain and follow the DNS setup instructions
