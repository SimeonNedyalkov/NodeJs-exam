const detailRouter = require('express').Router()
const {getRecipeById,recommend,get3Recent}= require("../services/databaseService")
const { parseError } = require('../config/errorConfig');
const {isUser,isOwner} = require('../middlewares/guards')

detailRouter.get('/details/:id',
    async(req,res)=>{
    const id = req.params.id
    const recipe = await getRecipeById(id)
    const isOwner = recipe.owner == req.user?._id
    const userId = req.user?._id
    console.log(isOwner)
    const isAlreadyRecommended = Boolean(recipe.recommendList.find(l=>l.toString() == userId))
    const numberOfRecomends = recipe.recommendList.length
    res.render('details',{recipe,isOwner,isAlreadyRecommended,numberOfRecomends})
})

detailRouter.get('/recipes/recommend/:id',
    isUser(),
    async (req,res)=>{
        const recipeId = req.params.id
        const userId = req.user._id
        try{
            await recommend(recipeId,userId)
            res.redirect('/details/'+recipeId)
        }catch(err){
            const recent = await get3Recent()
            res.render('home', { recent, errors: parseError(err).errors });
        }
})

module.exports = {
    detailRouter
}