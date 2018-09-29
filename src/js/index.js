// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

/* GLobal state of the app
*- Search object
*- Current recipe object
*- Shopping list object
*- Liked recipes
*/
const state = {};

/*
Search controller*/
const controlSearch = async () => {
    //1) get query from view
    const query = searchView.getInput();

    if(query){
        //2) new search obj and add to state
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearPrevResult();
        renderLoader(elements.searchRes);

        //4) Search for recipes
        try{
            await state.search.getResults();

            //5) render results to UI
            clearLoader();
            searchView.renderResults(state.search.recipe);
        }catch(err){
            clearLoader();
            console.log(err);
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearPrevResult();
        searchView.renderResults(state.search.recipe, goToPage);
    }
});

/*
Recipe controller*/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');

    if(id){

        state.recipe = new Recipe(id);

        try{
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();

            console.log(state.recipe);
        } catch(err){
            console.log(err);
        }
        
    }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e,controlRecipe));