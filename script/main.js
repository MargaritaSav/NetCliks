
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShows = document.querySelector('.tv-shows')

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


tvShows.addEventListener('mouseover', (e)=>{
    changeImage(e);
    
})

tvShows.addEventListener('mouseout', (e)=>{
    changeImage(e);
    
})

function changeImage(e){
    if(e.target.classList.contains('tv-card__img')){
        const img = e.target;
        const srcImage = img.src;
        img.src = img.dataset.backdrop;
        img.dataset.backdrop = srcImage;
    }
    

}
