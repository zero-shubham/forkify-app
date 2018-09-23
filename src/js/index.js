// Global app controller

import Search from './models/Search';

/* GLobal state of the app
*- Search object
*- Current recipe object
*- Shopping list object
*- Liked recipes
*/
const state = {};

const controlSearch = async () => {
    //1) get query from view
    const query = 'pizza';

    if(query){
        //2) new search obj and add to state
        state.search = new Search(query);

        //3) Prepare UI for results

        //4) Search for recipes
        await state.search.getResults();

        //5) render results to UI
        console.log(state.search.recipe);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})