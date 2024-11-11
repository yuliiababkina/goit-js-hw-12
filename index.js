import{a as M,S as P,i as l}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();function f(o,t){const a=o.map(({webformatURL:c,largeImageURL:e,tags:r,likes:n,views:v,comments:w,downloads:S})=>`<li class="gallery-item">
            <a class="gallery-link" href="${e}">
              <img class="gallery-img" src="${c}" alt="${r}" width="360"  />
            
            <div class="gallery-info">
              <div class="gallery-info-titles">
                <p><b>Likes</b></p>
                <p><b>Views</b></p>
                <p><b>Comments</b></p>
                <p><b>Downloads</b></p>
              </div>
              <div class="gallery-info-values">
                <p>${n}</p>
                <p>${v}</p>
                <p>${w}</p>
                <p>${S}</p>
              </div>
            </div>
            </a>
          </li>`).join("");t.insertAdjacentHTML("beforeend",a)}const q="46809369-ad82ab8216a47e5b0b084ef25",O="https://pixabay.com/api/";async function h(o,t){return(await M(`${O}`,{params:{key:q,q:o,page:t,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data}const i={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")};let m=new P(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlay:!0,overlayOpacity:.7}),s,d,u;i.form.addEventListener("submit",B);i.loadMoreBtn.addEventListener("click",E);async function B(o){if(o.preventDefault(),d=o.currentTarget.searchQuery.value.trim(),!d){l.info({timeout:3e3,position:"topRight",title:"Sorry",message:"Please fill your search query in!"});return}s=1,i.gallery.innerHTML="",p(),y();try{const t=await h(d,s);if(t.hits.length===0){l.error({timeout:3e3,position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}f(t.hits,i.gallery),m.refresh(),u=Math.ceil(t.totalHits/t.hits.length),u===s?b():L()}catch{l.error({timeout:3e3,position:"topRight",title:"Error",message:"Ooops, something went wrong. Please try again!"})}finally{i.form.reset(),g()}}function y(){i.loader.classList.remove("is-hidden")}function g(){i.loader.classList.add("is-hidden")}function L(){i.loadMoreBtn.classList.remove("is-hidden")}function p(){i.loadMoreBtn.classList.add("is-hidden")}async function E(){s+=1,p(),y();try{const o=await h(d,s);f(o.hits,i.gallery),m.refresh(),u===s?b():L();const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:a*2,behavior:"smooth"})}catch{l.error({timeout:3e3,position:"topRight",title:"Error",message:"Ooops, something went wrong. Please try again!"})}finally{g()}}function b(){return p(),l.info({timeout:3e3,position:"topRight",title:"Info",message:"We are sorry, but you have reached the end of search results."})}
//# sourceMappingURL=index.js.map
