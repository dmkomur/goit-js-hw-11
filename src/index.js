import  Fetcher  from "./js/fetcherApi";
import makeMarkup from "./js/markupApi";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadBtn = document.querySelector('.load-more');
const pixaBayFetcher = new Fetcher();

formRef.addEventListener('submit', onFormSubmit);


async function onFormSubmit(event) {
    event.preventDefault();
    clearMarkup();
    pixaBayFetcher.query = event.target.elements.searchQuery.value;
    const data = await pixaBayFetcher.getRequest();
    const fullString = makeMarkup(data);
    insertMarkup(fullString);
    if (pixaBayFetcher.page < pixaBayFetcher.totalPage) {
        pixaBayFetcher.page += 1;  
        showBtnLoad();        
    }
    
}
async function onBtnLoadClick() {
    hideBtnLoad();
    const data = await pixaBayFetcher.getRequest();
    const fullString = makeMarkup(data);
    insertMarkup(fullString);
    if (pixaBayFetcher.page === pixaBayFetcher.totalPage) { Notify.info("We're sorry, but you've reached the end of search results.") }
    if (pixaBayFetcher.page < pixaBayFetcher.totalPage) {
        pixaBayFetcher.page += 1;  
        showBtnLoad();        
    }
}

function insertMarkup(fullMarkup) { 
        galleryRef.insertAdjacentHTML('beforeend', fullMarkup);
}

function clearMarkup() {
    pixaBayFetcher.page = 1;
    galleryRef.innerHTML = '';
}

function showBtnLoad() {
    loadBtn.classList.remove('is-hidden');
    loadBtn.addEventListener('click', onBtnLoadClick);
    
}

function hideBtnLoad() {
     loadBtn.classList.add('is-hidden');
    loadBtn.removeEventListener('click', onBtnLoadClick);
    
}