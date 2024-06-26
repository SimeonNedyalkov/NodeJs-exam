const recipesRouter = require('express').Router()
const {getAllRecipes} = require('../services/databaseService')

recipesRouter.get('/recipes',async (req,res)=>{
    const allRecipes = await getAllRecipes()
    res.render('recipes',{allRecipes})
})

module.exports = {
    recipesRouter
}