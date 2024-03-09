import{a as g,i as d,S}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();g.defaults.baseURL="https://pixabay.com/api";const h=15;async function f(r,e){const l=new URLSearchParams({key:"42608378-1c88fd965c25ed4d8c49bb63d",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:h,page:e});return(await g.get(`?${l}`)).data}const q=document.querySelector(".gallery-list"),w=document.querySelector(".gallery-section");document.querySelector(".load-btn");function u(){const r=document.querySelector(".loader");r?r.remove():w.insertAdjacentHTML("beforeend",'<span class="loader"></span>')}function P(r){const e=r.map(({webformatURL:l,largeImageURL:o,tags:t,likes:s,views:a,comments:v,downloads:b})=>`
    <li class="gallery-item">
      <div class="gallery-image-box">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${l}" alt="${t}" />
        </a>
      </div>
      <div class="gallery-stats">
        <ul>
          Likes
          <li>${s}</li>
        </ul>
        <ul>
          Views
          <li>${a}</li>
        </ul>
        <ul>
          Comments
          <li>${v}</li>
        </ul>
        <ul>
          Downloads
          <li>${b}</li>
        </ul>
      </div>
    </li>
        `).join("");q.insertAdjacentHTML("beforeend",e)}d.settings({messageSize:"16",messageLineHeight:"24",maxWidth:432,theme:"dark",position:"topRight"});const m=document.querySelector(".search-form"),y=document.querySelector(".gallery-list"),i=document.querySelector(".load-btn");let c="",n=1;const $=new S(".gallery-list a",{captionsData:"alt",captionDelay:250});function p(r,e){const l=Math.ceil(e/h);if(u(),P(r),$.refresh(),n>=l)return d.info({message:"We're sorry, but you've reached the end of search results",theme:"light"});i.classList.remove("visually-hidden")}function H(){const r=document.querySelector(".gallery-item"),{height:e}=r.getBoundingClientRect();window.scrollBy({top:e*2,left:0,behavior:"smooth"})}function L(r){const e=document.querySelector(".loader");e&&e.remove(),alert(r)}m.addEventListener("submit",r=>{if(r.preventDefault(),i.classList.contains("visually-hidden")||i.classList.add("visually-hidden"),c=m.elements.search.value.trim(),y.innerHTML="",n=1,!c)return d.info({message:"We're sorry, but you need to fill in the search area!",theme:"light"});u(),f(c,n).then(e=>{const{hits:l}=e;l.length===0?(y.innerHTML="",u(),d.warning({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040"})):p(l)}).catch(e=>L(e)),m.reset()});i.addEventListener("click",r=>{i.classList.add("visually-hidden"),u(),n+=1,f(c,n).then(e=>{const{hits:l,totalHits:o}=e;p(l,o),H()}).catch(e=>L(e))});
//# sourceMappingURL=commonHelpers.js.map
