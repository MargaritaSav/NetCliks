
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const API_KEY = '0cd69ad114e9a87d92f00d725e235b1a';
const DBService = class{
    getData = async (url) => {
        const res = await fetch(url);
        if(res.ok) {
           return res.json()
        } else {
            throw new Error(`failed load data`)
        }

    }

    getTestData = () => {
        return this.getData('test.json');
    }
}

const renderCard = response =>{
    response.results.forEach(item =>{
        const card = document.createElement('li');
        const { backdrop_path : backdrop, name : title, poster_path : poster, vote_average : vote } = item;
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg'
        const backdropIMG = backdrop ? IMG_URL + backdrop : '';

        card.className = 'tv-shows__item'; 

        card.innerHTML = 
            `
                <a href="#" class="tv-card">
                    <span class="tv-card__vote">${vote}</span>
                    <img class="tv-card__img"
                         src=" ${posterIMG}"
                         data-backdrop="${backdropIMG}"
                         alt="${title}">
                    <h4 class="tv-card__head">${title}</h4>
                </a>
             `;
            if(vote==0){
                card.querySelector('.tv-card__vote').style.display = 'none';
            }
            tvShowsList.append(card);
    })
}

new DBService().getTestData().then((data)=>{
    renderCard(data);
});



hamburger.addEventListener('click', ()=>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open')

});

document.addEventListener('click', (e)=>{
    if(!e.target.closest('.left-menu')){
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open')

    }
})

leftMenu.addEventListener('click', (e)=>{
    const target = e.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
})


tvShowsList.addEventListener('mouseover', (e)=>{
    changeImage(e);
    
})

tvShowsList.addEventListener('mouseout', (e)=>{
    changeImage(e);
    
})

tvShowsList.addEventListener('click', e => {
    const target = e.target;
    const card = target.closest('.tv-card');
    if(card){
        modal.classList.remove('hide');
        modal.style.backgroundColor = 'rgba(0, 0, 0, .5)'
        document.body.style.overflow = 'hidden';
    
    }
})

modal.addEventListener('click', e => {
    if(e.target.closest('.cross')  || e.target.classList.contains('modal')){
        modal.classList.add('hide');
        document.body.style.overflow = '';

    }
})



function changeImage(e){
    if(e.target.classList.contains('tv-card__img')){
        const img = e.target;
        if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
        
    } 
}
