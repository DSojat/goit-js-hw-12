import{a as f,i as y,S as q}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=l(r);fetch(r.href,s)}})();f.defaults.baseURL="https://pixabay.com/api";const h=15;let c=1,m="";async function p(e){const t=new URLSearchParams({key:"42608378-1c88fd965c25ed4d8c49bb63d",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:h,page:c});try{return e!==m&&(c=1,m=e),(await f.get(`?${t}`)).data}catch{}}async function w(e){return c+=1,await p(e)}const P=document.querySelector(".gallery-list"),$=document.querySelector(".gallery-section");document.querySelector(".load-btn");function d(){const e=document.querySelector(".loader");e?e.remove():$.insertAdjacentHTML("beforeend",'<span class="loader"></span>')}function x(e){const t=e.map(({webformatURL:l,largeImageURL:a,tags:r,likes:s,views:o,comments:b,downloads:S})=>`
    <li class="gallery-item">
      <div class="gallery-image-box">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${l}" alt="${r}" />
        </a>
      </div>
      <div class="gallery-stats">
        <ul>
          Likes
          <li>${s}</li>
        </ul>
        <ul>
          Views
          <li>${o}</li>
        </ul>
        <ul>
          Comments
          <li>${b}</li>
        </ul>
        <ul>
          Downloads
          <li>${S}</li>
        </ul>
      </div>
    </li>
        `).join("");P.insertAdjacentHTML("beforeend",t)}y.settings({messageSize:"16",messageLineHeight:"24",maxWidth:432,theme:"dark",position:"topRight",iconUrl:"./img/x-octagon.svg"});const u=document.querySelector(".search-form"),g=document.querySelector(".gallery-list"),n=document.querySelector(".load-btn");let i="";const H=new q(".gallery-list a",{captionsData:"alt",captionDelay:250});function L(e,t){const l=Math.ceil(t/h);if(d(),x(e),H.refresh(),c>=l)return y.info({message:"We're sorry, but you've reached the end of search results",iconUrl:null,theme:"light"});n.classList.remove("visually-hidden")}function v(){const e=document.querySelector(".gallery-item"),{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,left:0,behavior:"smooth"})}u.addEventListener("submit",e=>{e.preventDefault(),n.classList.contains("visually-hidden")||n.classList.add("visually-hidden"),i=u.elements.search.value.trim(),i?(g.innerHTML="",d(),p(i).then(({hits:t,totalHits:l})=>{t.length===0?(g.innerHTML="",d(),y.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040"})):(L(t),v())}),u.reset()):g.innerHTML=""});n.addEventListener("click",e=>{n.classList.add("visually-hidden"),d(),w(i).then(({hits:t,totalHits:l})=>{L(t,l),v()})});
//# sourceMappingURL=commonHelpers.js.map
