(()=>{"use strict";const e=document.querySelector("[data-modal-testimonial-container]"),t=document.querySelector("[data-modal-testimonial-close-btn]"),a=document.querySelector("[data-testimonial-overlay]"),o=document.querySelector("[data-testimonial-img]"),l=document.querySelector("[data-testimonial-title]"),c=document.querySelector("[data-modal-testimonial-text]"),n=document.querySelector("[data-modal-testimonial-time]"),i=function(){a.classList.toggle("active"),e.classList.toggle("active")};function r(e){o.src=e.querySelector("[data-testimonials-avatar]")?.src,o.alt=e.querySelector("[data-testimonials-avatar]")?.alt,l.innerHTML=e.querySelector("[data-testimonials-title]")?.innerHTML,c.innerHTML=e.querySelector("[data-testimonials-text]")?.innerHTML,n.innerHTML=e.querySelector("[data-testimonials-time]")?.innerHTML,i(),t.addEventListener("click",i),a.addEventListener("click",i)}const s=document.querySelector("[data-modal-avatar-container]"),d=document.querySelector("[data-modal-avatar-close-btn]"),u=document.querySelector("[data-avatar-overlay]"),m=document.querySelector("[modal-avatar-img]"),v=function(){s.classList.toggle("active"),u.classList.toggle("active")},y=document.querySelector("[data-sidebar]");document.querySelector("[data-sidebar-btn]").addEventListener("click",(function(){y.classList.toggle("active")}));const L=document.querySelector("[data-form]"),q=document.querySelectorAll("[data-form-input]"),S=document.querySelector("[data-form-btn]");for(let e=0;e<q.length;e++)q[e].addEventListener("input",(function(){L.checkValidity()?S.removeAttribute("disabled"):S.setAttribute("disabled","")}));const f=document.querySelectorAll("[data-nav-link]"),g=document.querySelectorAll("[data-page]");for(let e=0;e<f.length;e++)f[e].addEventListener("click",(function(){for(let e=0;e<g.length;e++)if(this.innerHTML.toLowerCase()===g[e].dataset.page){g[e].classList.add("active"),f[e].classList.add("active"),window.scrollTo(0,0);const t=document.querySelector("[show-more-actions]");t.classList.contains("active")&&setTimeout((()=>{t.classList.remove("active")}),200)}else g[e].classList.remove("active"),f[e].classList.remove("active")}));window.addEventListener("scroll",(function(){let e=document.querySelector(".scroll-to-top");e&&(document.body.scrollTop>20||document.documentElement.scrollTop>20?e.style.display="flex":e.style.display="none")}));const h=document.querySelectorAll("[data-testimonials-item]");for(let e=0;e<h.length;e++)h[e].addEventListener("click",r.bind(null,h[e]));const b=document.querySelector("[modal-avatar]");b.addEventListener("click",function(e){m.src=e.querySelector("[data-modal-avatar]").src,m.alt=e.querySelector("[data-modal-avatar]").alt,v(),d.addEventListener("click",v),u.addEventListener("click",v)}.bind(null,b)),window.addEventListener("load",(function(){if(location.hash)for(let e=0;e<f.length;e++)if(f[e].href.includes(location.hash)){for(let e=0;e<g.length;e++)location.hash.includes(g[e].dataset.page.split(" ").join("-"))?(g[e].classList.add("active"),f[e].classList.add("active")):(g[e].classList.remove("active"),f[e].classList.remove("active"));break}}))})();