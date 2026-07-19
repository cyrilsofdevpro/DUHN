// Lightweight particle background placeholder (canvas-based subtle dots)
document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero-media .illustration');
  if(!hero) return;
  const c=document.createElement('canvas');
  c.style.position='absolute';c.style.inset='0';c.style.zIndex=0;hero.appendChild(c);
  const ctx=c.getContext('2d');
  let w,h,particles=[];
  function resize(){w=c.width=hero.clientWidth;h=c.height=hero.clientHeight}
  function init(){particles=[];for(let i=0;i<40;i++){particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+0.6,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4})}}
  function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){ctx.beginPath();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0}} 
  function loop(){draw();requestAnimationFrame(loop)}
  window.addEventListener('resize',()=>{resize();init()});resize();init();loop();
});
