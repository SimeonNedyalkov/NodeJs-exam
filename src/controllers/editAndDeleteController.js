const editAndDeleteRouter = require('express').Router()
const {getRecipeById,update,deleteById,get3Recent}= require("../services/databaseService")
const { parseError } = require('../config/errorConfig');
const { validationResult, body } = require('express-validator');
const {isUser} = require('../middlewares/guards')

editAndDeleteRouter.get('/recipes/edit/:id',
    isUser(),
    async(req,res)=>{
    const id = req.params.id
    const userId = req.user?._id
    try{
        const recipe = await getRecipeById(id)
        if(userId != recipe.owner){
                throw new Error('Access denied!')
        }
        res.render('edit',{recipe})
    }catch(err){
        const recent = await get3Recent()
        res.render('home', { recent, errors: parseError(err).errors });
    }
    
})

editAndDeleteRouter.post('/recipes/edit/:id',isUser(),async(req,res)=>{
    const data = req.body
    const recipeId = req.params.id
    const userId = req.user?._id
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw result.array();
        }
        await update(recipeId,data,userId)
        res.redirect('/details/'+recipeId)
    } catch (err) {
        res.render('edit', { data: { data }, errors: parseError(err).errors });
    }
})
editAndDeleteRouter.get('/recipes/delete/:id',isUser(),async (req,res)=>{
    const recipeId = req.params.id
    const userId = req.user?._id
    try{
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw result.array();
        }
        await deleteById(recipeId,userId)
        res.redirect('/recipes')
    }catch(err){
        const recent = await get3Recent()
        res.render('home', { recent, errors: parseError(err).errors });
    }
    
})

module.exports = {
    editAndDeleteRouter
}