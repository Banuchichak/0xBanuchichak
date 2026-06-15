(function() {
  const canvas = document.createElement('canvas');
  const container = document.getElementById('matrixBg');
  if (!container) return;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const chars = '0123456789ABCDEFabcdefGHIJKLMNOPQRSTUVWXYZghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`';
  const fontSize = 13;
  let columns, drops;
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; columns = Math.floor(canvas.width / fontSize); drops = Array(columns).fill(1); }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.fillStyle = 'rgba(5,10,5,0.05)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = fontSize + 'px Share Tech Mono,monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#00ff41';
      ctx.globalAlpha = Math.random()*0.8+0.2;
      ctx.fillText(char, i*fontSize, drops[i]*fontSize);
      if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    ctx.globalAlpha = 1;
  }
  setInterval(draw, 50);
})();
