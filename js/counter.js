// Simple counter animation
document.addEventListener('DOMContentLoaded',()=>{
  const nums=document.querySelectorAll('.num');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el=entry.target;
        const target=+el.dataset.target;
        let val=0;const step=Math.ceil(target/80);
        const iv=setInterval(()=>{
          val+=step; if(val>=target){el.textContent=target;clearInterval(iv)}else{el.textContent=val}
        },20);
        obs.unobserve(el);
      }
    });
  },{threshold:0.6});
  nums.forEach(n=>obs.observe(n));
});
