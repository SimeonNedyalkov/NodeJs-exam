const searchRouter = require('express').Router()
const {getAllRecipes} = require('../services/databaseService')

searchRouter.get('/search',async (req,res)=>{
    const recipes = await getAllRecipes()
    res.render('search',{recipes})
})
searchRouter.post('/search', async (req, res) => {
    const searchQuery = req.body.search.trim().toLowerCase();
    const recipes = await getAllRecipes();
    const currentRecipe = recipes.find(l=>searchQuery == l.title.toLocaleLowerCase())
    console.log(currentRecipe)
    if(currentRecipe){
        res.redirect('/details/'+currentRecipe._id)
    }else{
        res.render('search', { currentRecipe });
    }
});

// Handle GET requests for /search/:id

module.exports = {
    searchRouter
}