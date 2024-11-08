import{S as f,i as n}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function d(i){return i.map(({webformatURL:o,largeImageURL:r,tags:s,likes:e,views:t,comments:a,downloads:u})=>`<li class="gallery-item">
            <a class="gallery-link" href="${r}">
              <img class="gallery-img" src="${o}" alt="${s}" width="360"  />
            
            <div class="gallery-info">
              <div class="gallery-info-titles">
                <p><b>Likes</b></p>
                <p><b>Views</b></p>
                <p><b>Comments</b></p>
                <p><b>Downloads</b></p>
              </div>
              <div class="gallery-info-values">
                <p>${e}</p>
                <p>${t}</p>
                <p>${a}</p>
                <p>${u}</p>
              </div>
            </div>
            </a>
          </li>`).join("")}const p="46809369-ad82ab8216a47e5b0b084ef25",m="https://pixabay.com/api/";function y(i){const o=new URLSearchParams({key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${m}?${o.toString()}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}const l=document.querySelector(".form"),h=document.querySelector(".gallery"),c=document.querySelector(".loader");let g=new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlay:!0,overlayOpacity:.7});l.addEventListener("submit",b);function b(i){i.preventDefault();const o=i.currentTarget.searchQuery.value.trim();if(o==="")return n.info({timeout:3e3,position:"topRight",title:"Sorry",message:"Please fill your search query in!"});L(),y(o).then(r=>{r.hits.length===0&&n.error({timeout:3e3,position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),h.innerHTML=d(r.hits),g.refresh()}).catch(r=>console.log(r)).finally(()=>{v(),l.reset()})}function L(){c.classList.remove("hidden")}function v(){c.classList.add("hidden")}
//# sourceMappingURL=index.js.map
