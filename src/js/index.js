// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) searchView.highlightSelected(id);
        state.recipe = new Recipe(id);

        try{
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(err){
            console.log(err);
        }
        
    }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e,controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});