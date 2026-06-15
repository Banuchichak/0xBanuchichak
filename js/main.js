document.addEventListener('DOMContentLoaded', () => { renderHomePosts(); updateStats(); });
function updateStats() {
  const posts = PostsDB.getAll(); const cats = PostsDB.getCategories();
  const e1 = document.getElementById('postCount'); const e2 = document.getElementById('categoryCount');
  if (e1) animateNum(e1, posts.length); if (e2) animateNum(e2, cats.length);
}
function animateNum(el, target) {
  let current = 0; const step = Math.max(1, Math.ceil(target/20));
  const iv = setInterval(() => { current = Math.min(current+step,target); el.textContent = current; if(current>=target) clearInterval(iv); }, 50);
}
function renderHomePosts(filter='all') {
  const grid = document.getElementById('postsGrid'); const noPost = document.getElementById('noPosts');
  if (!grid) return;
  let posts = PostsDB.getAll();
  if (filter !== 'all') posts = posts.filter(p => p.category === filter);
  grid.querySelectorAll('.post-card').forEach(el => el.remove());
  buildFilterButtons();
  if (posts.length === 0) { if (noPost) noPost.style.display = ''; return; }
  if (noPost) noPost.style.display = 'none';
  posts.forEach((post, i) => grid.appendChild(createPostCard(post, i)));
}
function buildFilterButtons() {
  const bar = document.getElementById('filterBar'); if (!bar) return;
  bar.querySelectorAll('.filter-btn[data-filter]:not([data-filter="all"])').forEach(b => b.remove());
  PostsDB.getCategories().forEach(cat => {
    const btn = document.createElement('button'); btn.className = 'filter-btn'; btn.dataset.filter = cat; btn.textContent = cat.toUpperCase();
    btn.addEventListener('click', () => { bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderHomePosts(cat); });
    bar.appendChild(btn);
  });
  const allBtn = bar.querySelector('[data-filter="all"]');
  if (allBtn) allBtn.addEventListener('click', () => { bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); allBtn.classList.add('active'); renderHomePosts('all'); });
}
function createPostCard(post, index) {
  const card = document.createElement('a'); card.className = 'post-card'; card.href = 'post.html?id=' + post.id; card.style.animationDelay = (index*0.08)+'s';
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'});
  const icons = {web:'🌐',ctf:'🏁',malware:'🦠',network:'🔌',tool:'🔧',oscp:'🎯',forensics:'🔍',crypto:'🔐'};
  const imgHtml = post.coverImage
    ? `<img src="${post.coverImage}" alt="${escHtml(post.title)}" class="post-card-img" loading="lazy"/>`
    : `<div class="post-card-img-placeholder">${icons[post.category]||'📄'}</div>`;
  card.innerHTML = `${imgHtml}<div class="post-card-body"><div class="post-meta"><span class="post-tag">${escHtml(post.category||'general')}</span><span class="post-date">${date}</span></div><h3 class="post-title">${escHtml(post.title)}</h3><p class="post-excerpt">${escHtml(post.excerpt||stripHtml(post.content).slice(0,180))}...</p><span class="post-read-more">read more →</span></div>`;
  return card;
}
function escHtml(str) { if (!str) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function stripHtml(html) { const t = document.createElement('div'); t.innerHTML = html||''; return t.textContent||''; }
