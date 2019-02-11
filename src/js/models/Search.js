import axios from "axios";

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '92dcbf32d0e1c540cb1d7dad8936595b';

        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = res.data.recipes;
            //console.log(this.recipes);
        }catch(err){
            alert(err);
        }
    }
}