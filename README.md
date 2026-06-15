# 0xbanuchichak — Cybersecurity Blog

A hacker-aesthetic static blog site with a full GUI admin panel. No backend, no database — everything runs in the browser using localStorage.

## Features
- 🖥️ Matrix rain animated background
- ✏️ Admin panel to write & manage posts from the browser
- 🖼️ Image library with drag & drop upload
- 🔍 Search + category filtering
- 💾 Export / import backups as JSON
- 📱 Responsive on all devices
- 🔒 Password-protected admin panel

---

## 📁 Project Structure

```
0xbanuchichak/
├── index.html          # Homepage
├── posts.html          # All posts list
├── post.html           # Single post view
├── about.html          # About page
├── 404.html            # Error page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── posts-data.js   # Data layer (localStorage)
│   ├── main.js         # Homepage logic
│   └── matrix.js       # Matrix rain animation
├── admin/
│   └── index.html      # Admin panel
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages auto-deploy
```

---

## 🚀 Deploying to GitHub Pages (Free, No Purchase Needed)

### Step 1 — Create a GitHub Account
Go to https://github.com and sign up if you haven't already.

### Step 2 — Create a New Repository
1. Click the **+** icon → **New repository**
2. Name it: `0xbanuchichak` (or any name you like)
3. Set it to **Public**
4. Do NOT initialize with README (we'll push our own)
5. Click **Create repository**

### Step 3 — Initialize Git and Push

Open a terminal in your project folder and run these commands:

```bash
# Navigate to your project folder
cd 0xbanuchichak

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "initial commit: 0xbanuchichak cybersecurity blog"

# Add your GitHub repo as origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/0xbanuchichak.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will auto-deploy!

### Step 5 — Visit Your Site
After ~1-2 minutes your site will be live at:
```
https://YOUR_USERNAME.github.io/0xbanuchichak/
```

---

## 🔐 Admin Panel

Visit: `https://YOUR_USERNAME.github.io/0xbanuchichak/admin/`

**Default password:** `BanuChi@2025`

**⚠️ IMPORTANT:** Change it by editing `js/posts-data.js`:
```javascript
const ADMIN_PASSWORD = 'YourNewPassword';
```
Then push the change to GitHub.

---

## ✏️ Writing Posts (from the GUI)

1. Go to `/admin/` and log in
2. Click **New Post** in the sidebar
3. Fill in Title, Category, Excerpt
4. Write your content using the editor toolbar (supports HTML)
5. Upload a cover image via drag & drop or URL
6. Click **Publish Post** — it appears instantly on the site!

> ⚠️ Posts are stored in the **browser's localStorage**. This means:
> - Posts are only visible on the device/browser you write them on
> - To make posts visible to everyone, use the **Export** feature in Settings, then see "Baking Posts" below

---

## 📦 Making Posts Permanent (Visible to Everyone)

Since there's no backend, posts written in the admin GUI live in YOUR browser's localStorage. To make them public:

### Option A — Bake posts into the repo (recommended)

1. In the admin panel, go to **Settings → Export All Data**
2. This downloads `0xbanuchichak-backup.json`
3. Create a file `js/initial-posts.js` in your repo with the post data:

```javascript
// js/initial-posts.js
// Auto-loads posts if localStorage is empty
(function() {
  if (!localStorage.getItem('banu_posts')) {
    const posts = [
      // paste your exported posts array here
    ];
    localStorage.setItem('banu_posts', JSON.stringify(posts));
  }
})();
```

4. Add this script to `index.html`, `posts.html`, and `post.html` BEFORE `posts-data.js`:
```html
<script src="js/initial-posts.js"></script>
```

5. Push to GitHub — posts will now load for all visitors.

### Option B — Use a free backend (advanced)
If you want a real backend, consider:
- **Supabase** (free tier, PostgreSQL) — replace localStorage calls with API calls
- **Firebase Firestore** (free tier)
- **Netlify + Netlify CMS** (free hosting with a real CMS)

---

## 🔄 Updating the Site

After making changes locally:

```bash
git add .
git commit -m "add new post / update styles"
git push
```

GitHub Actions will automatically redeploy within ~1 minute.

---

## 🛠️ Customization

### Change colors
Edit `css/style.css`, variables at the top:
```css
--green: #00ff41;      /* Main accent color */
--bg: #050a05;         /* Background */
```

### Change blog name / tagline
Edit `index.html` and `admin/index.html` — search for `0xbanuchichak`

### Add social links
Edit the footer in each HTML file and update the About page links.

### Add custom categories
Edit the `<select>` in `admin/index.html` to add new categories.

---

## 📱 Custom Domain (Optional, Still Free)

1. Get a free domain from https://www.freenom.com or buy one (~$10/yr)
2. In GitHub Pages settings, add your custom domain
3. Create a `CNAME` file in the repo root with your domain:
```
yourdomain.com
```

---

Happy hacking! 🐚
