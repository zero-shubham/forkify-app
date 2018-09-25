import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearPrevResult = () => elements.searchResResults.innerHTML = '';

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

export const renderResults = (recipes) => {
    recipes.forEach(render);
};