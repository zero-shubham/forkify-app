// Global app controller

import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

/* GLobal state of the app
*- Search object
*- Current recipe object
*- Shopping list object
*- Liked recipes
*/
const state = {};

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
        await state.search.getResults();

        //5) render results to UI
        clearLoader();
        searchView.renderResults(state.search.recipe);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})