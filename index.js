import{a as b,S as v,i as d}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function u(r){return r.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:o,comments:n,downloads:L})=>`<li class="gallery-item">
            <a class="gallery-link" href="${s}">
              <img class="gallery-img" src="${t}" alt="${i}" width="360"  />
            
            <div class="gallery-info">
              <div class="gallery-info-titles">
                <p><b>Likes</b></p>
                <p><b>Views</b></p>
                <p><b>Comments</b></p>
                <p><b>Downloads</b></p>
              </div>
              <div class="gallery-info-values">
                <p>${e}</p>
                <p>${o}</p>
                <p>${n}</p>
                <p>${L}</p>
              </div>
            </div>
            </a>
          </li>`).join("")}const M="46809369-ad82ab8216a47e5b0b084ef25",S="https://pixabay.com/api/";async function p(r,t){return(await b(`${S}`,{params:{key:M,q:r,page:t,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data}const a={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),loader:document.querySelector(".loader")};let f=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlay:!0,overlayOpacity:.7}),l=1,c=null;a.form.addEventListener("submit",w);a.loadMoreBtn.addEventListener("click",q);async function w(r){if(r.preventDefault(),l=1,a.gallery.innerHTML="",c=r.currentTarget.searchQuery.value.trim(),!c)return d.info({timeout:3e3,position:"topRight",title:"Sorry",message:"Please fill your search query in!"});h();try{const t=await p(c,l);t.hits.length===0&&d.error({timeout:3e3,position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),a.gallery.innerHTML=u(t.hits),t.totalHits>t.hits.length?m():g(),f.refresh()}catch(t){console.log(t.message)}finally{a.form.reset(),y()}}function h(){a.loader.classList.remove("is-hidden")}function y(){a.loader.classList.add("is-hidden")}function m(){a.loadMoreBtn.classList.replace("is-hidden","load-more")}function g(){a.loadMoreBtn.classList.replace("load-more","is-hidden")}async function q(){l+=1,g(),h();try{const r=await p(c,l);a.gallery.insertAdjacentHTML("beforeend",u(r.hits)),f.refresh(),Math.ceil(r.totalHits/r.hits.length)===l&&B();const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:i*2,behavior:"smooth"})}catch(r){console.log(r.message)}finally{m(),y()}}function B(){return a.loadMoreBtn.classList.replace("load-more","is-hidden"),d.info({timeout:3e3,position:"topRight",title:"Info",message:"We are sorry, but you have reached the end of search results."})}
//# sourceMappingURL=index.js.map
