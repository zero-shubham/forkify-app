import axios from 'axios';

export default class Search{
    constructor(query){
        this.query =  query;
    }

    async getResults(){
        const key = 'a8b7fcd1f5769389f0311dd72a9778b5';
        try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.recipe = res.data.recipes;
        }
        catch(error){
            alert(error);
        }
    }
}