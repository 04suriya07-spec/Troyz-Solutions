// canvas.js - Animated particle background for Hero section
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  function resize() {
    width = window.innerWidth;
    height = document.getElementById('hero').offsetHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }
  
  function initParticles() {
    particles = [];
    const numParticles = Math.min(Math.floor(width * height / 10000), 150);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Lime green / Black color palette for particles
    ctx.fillStyle = 'rgba(190, 242, 100, 0.8)';
    
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 242, 100, ${p.alpha})`;
      ctx.fill();
      
      // Draw connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(190, 242, 100, ${0.15 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(draw);
  }
  
  window.addEventListener('resize', resize);
  
  // Init
  setTimeout(() => {
    resize();
    draw();
  }, 100);
})();
