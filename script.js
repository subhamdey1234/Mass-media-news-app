const API_KEY = "f7e90110f198461998eb849c457f45af";
const url = "https://newsapi.org/v2/top-headlines?country=";

window.addEventListener('load', () => {
    fetchNews("usa");
});

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
    }
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container'); // Check the ID here
    const newsCardTemplate = document.getElementById('template-news-card'); // Check the ID here

    cardContainer.innerHTML = ''; // Clear existing content

    articles.forEach((article) => {
        if (!article.urlToImage) {
            return;
        }
        
        const cardClone = newsCardTemplate.content.cloneNode(true);
        filldataincard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });

}

function  filldataincard(cardClone,article) {
    const newsimg=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('#news-title');
    const newssource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');

   newsimg.src=article.urlToImage;
   newstitle.innerHTML=article.title;
   newsdesc.innerHTML=article.description;
   
  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });

newssource.innerHTML=`${article.source.name} . ${date}`;
cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
});

}
let curselectnav=null;
function onNavItemClick(id) {
    fetchNews(id);

    const navitem=document.getElementById(id);
    curselectnav?.classList.remove('active');
    curselectnav=navitem;
    curselectnav.classList.add('active');
}
const searchbtn=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');

searchbtn.addEventListener('click',()=>{
    const query=searchtext.value;
    if (!query) {
        return;
    }
    else{
        fetchNews(query);
    }
curselectnav?.classList.remove('active');
curselectnav=null;

});

function reload() {
    window.location.reload();
}w