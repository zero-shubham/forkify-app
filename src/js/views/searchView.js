import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearPrevResult = () => {
    elements.searchResResults.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const titleLimitWord = (title,limit=17) => {
    const newTitle = [];
    if(title.length>limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        },0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const render = (recipe) => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${titleLimitWord(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResResults.insertAdjacentHTML('beforeend',markup);
};

const createButton = (type, page) => 
    `<button class="btn-inline results__btn--${type} data-goto=${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`
;

const renderButtons = (currPage, pageLimit, totalRecipes)=>{
    const pages = totalRecipes/pageLimit;
    let btnHtml;
    if(currPage=1){
        btnHtml = createButton('next',currPage);
    }else if(currPage==pages){
        btnHtml = createButton('prev',currPage);
    }else if(currPage>1 && pages>1){
        btnHtml = `
            ${createButton('prev', currPage)}
            ${createButton('next', currPage)}
        `;
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', btnHtml);
};

export const renderResults = (recipes,currPage=1,pageLimit=10) => {
    const start = (currPage-1)*pageLimit;
    const end = start + pageLimit;
    console.log(recipes, currPage);
    recipes.slice(start, end).forEach(render);

    renderButtons(currPage, pageLimit, recipes.length);
};