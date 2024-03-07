import{a as f,i as y,S}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();f.defaults.baseURL="https://pixabay.com/api";const h=15;let c=1,m="";async function p(t){const r=new URLSearchParams({key:"42608378-1c88fd965c25ed4d8c49bb63d",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:h,page:c});try{return t!==m&&(c=1,m=t),(await f.get(`?${r}`)).data}catch{}}async function q(t){return c+=1,await p(t)}const P=document.querySelector(".gallery-list"),$=document.querySelector(".gallery-section");document.querySelector(".load-btn");function d(){const t=document.querySelector(".loader");t?t.remove():$.insertAdjacentHTML("beforeend",'<span class="loader"></span>')}function w(t){const r=t.map(({webformatURL:l,largeImageURL:n,tags:e,likes:s,views:a,comments:v,downloads:b})=>`
    <li class="gallery-item">
      <div class="gallery-image-box">
        <a class="gallery-link" href="${n}">
          <img class="gallery-image" src="${l}" alt="${e}" />
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
        `).join("");P.insertAdjacentHTML("beforeend",r)}y.settings({messageSize:"16",messageLineHeight:"24",maxWidth:432,theme:"dark",position:"topRight",iconUrl:"./img/x-octagon.svg"});const u=document.querySelector(".search-form"),g=document.querySelector(".gallery-list"),o=document.querySelector(".load-btn");let i="";const x=new S(".gallery-list a",{captionsData:"alt",captionDelay:250});function L(t,r){const l=Math.ceil(r/h);if(d(),w(t),x.refresh(),c>=l)return y.info({message:"We're sorry, but you've reached the end of search results",iconUrl:null,theme:"light"});o.classList.remove("visually-hidden")}u.addEventListener("submit",t=>{t.preventDefault(),o.classList.contains("visually-hidden")||o.classList.add("visually-hidden"),i=u.elements.search.value.trim(),i?(g.innerHTML="",d(),p(i).then(({hits:r,totalHits:l})=>{r.length===0?(g.innerHTML="",d(),y.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040"})):L(r)}),u.reset()):g.innerHTML=""});o.addEventListener("click",t=>{o.classList.add("visually-hidden"),d(),q(i).then(({hits:r,totalHits:l})=>{L(r,l)})});
//# sourceMappingURL=commonHelpers.js.map
