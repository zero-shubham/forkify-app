import axios from 'axios';

export default class Search{
    constructor(query){
        this.query =  query;
    }

    async getResults(){
        const key = 'd63ef64c4a3cd1fd906d960bf3e16476';
        try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.recipe = res.data.recipes;
        }
        catch(error){
            alert(error);
        }
    }
}