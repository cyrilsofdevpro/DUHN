// Animations: Typed.js hero typing + intersection fade-up
document.addEventListener('DOMContentLoaded',()=>{
  // Typed hero subtitle (if Typed is available)
  try{
    if(window.Typed){
      new Typed('.hero-sub',{
        strings:['Trusted partner for AI, trading systems, and cloud-native software.','AI Automation · Trading Bots · Expert Advisors'],
        typeSpeed:40,backSpeed:18,backDelay:2600,loop:true,showCursor:false
      });
    }
  }catch(e){console.warn('Typed init failed',e)}

  // add fade-up in-view for elements
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}});
  },{threshold:0.12});
  document.querySelectorAll('.fade-up, .service-card, .project-card, .testimonial').forEach(el=>io.observe(el));
});
