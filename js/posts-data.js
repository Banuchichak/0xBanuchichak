// posts-data.js — Central data layer for 0xbanuchichak blog
const STORAGE_KEY = 'banu_posts';
const PASS_KEY = 'banu_auth';
const ADMIN_PASSWORD = 'BanuChi@2025'; // ← Change this!

const PostsDB = {
  getAll() { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; } },
  save(posts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); },
  add(post) { const posts = this.getAll(); post.id = Date.now().toString(); post.createdAt = new Date().toISOString(); post.updatedAt = post.createdAt; posts.unshift(post); this.save(posts); return post; },
  update(id, data) { const posts = this.getAll(); const idx = posts.findIndex(p => p.id === id); if (idx === -1) return false; posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() }; this.save(posts); return posts[idx]; },
  delete(id) { this.save(this.getAll().filter(p => p.id !== id)); },
  getById(id) { return this.getAll().find(p => p.id === id) || null; },
  getCategories() { const cats = new Set(); this.getAll().forEach(p => { if (p.category) cats.add(p.category); }); return [...cats]; }
};

const Auth = {
  isLoggedIn() { return sessionStorage.getItem(PASS_KEY) === 'true'; },
  login(pass) {
    const override = localStorage.getItem('banu_pass_override');
    if (pass === (override || ADMIN_PASSWORD)) { sessionStorage.setItem(PASS_KEY, 'true'); return true; }
    return false;
  },
  logout() { sessionStorage.removeItem(PASS_KEY); }
};

const ImagesDB = {
  KEY: 'banu_images',
  getAll() { try { const r = localStorage.getItem(this.KEY); return r ? JSON.parse(r) : []; } catch { return []; } },
  add(name, dataUrl) {
    const imgs = this.getAll();
    const entry = { id: Date.now().toString(), name, url: dataUrl, createdAt: new Date().toISOString() };
    imgs.push(entry);
    try { localStorage.setItem(this.KEY, JSON.stringify(imgs)); return entry; }
    catch(e) { console.error('Storage full:', e); return null; }
  },
  delete(id) { localStorage.setItem(this.KEY, JSON.stringify(this.getAll().filter(i => i.id !== id))); }
};
