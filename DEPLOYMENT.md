# Deploying to GitHub Pages

## Setup Instructions

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name it `kickstart` (or any name you prefer)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/kickstart.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The workflow will automatically deploy on push to main

5. **Access Your Site**:
   After the GitHub Action completes (check the Actions tab), your site will be available at:
   ```
   https://YOUR-USERNAME.github.io/kickstart/
   ```

## Manual Build (Optional)

To build locally and preview:
```bash
npm run build
npm run preview
```

## Updating the Site

Simply push changes to the main branch:
```bash
git add .
git commit -m "Update feature"
git push
```

The site will automatically rebuild and deploy!

## Custom Domain (Optional)

1. Go to Settings → Pages
2. Add your custom domain
3. Update the `base` in `vite.config.ts` to `/` if using a custom domain
