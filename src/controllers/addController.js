const addRouter = require('express').Router()
const { parseError } = require('../config/errorConfig');
const { validationResult, body } = require('express-validator');
const {isUser} = require('../middlewares/guards')
const {create} = require('../services/databaseService')
addRouter.get('/add',(req,res)=>{
    res.render('add')
})
addRouter.post('/add',
    body('title').isLength({min:2}).withMessage('Title is required and must be atleast 2 characters long'),
    body('description').isLength({min:10,max:100}).withMessage('Description is required and must be between 10 and 100 characters long'),
    body('ingredients').isLength({min:10,max:200}).withMessage('Ingredients are required and must be between 10 and 200 characters long'),
    body('instructions').isLength({min:10}).withMessage('Instructions are required and must be atleast 10 characters long'),
    body('image').isURL({require_tld:false}).withMessage('Image is required and should start with http:// or https://'),
    isUser(),
    async (req,res)=>{
        const data = req.body
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw result.array();
        }
        await create(data,req.user._id)
        res.redirect('/recipes')
    } catch (err) {
        const errors = parseError(err).errors;
        res.render('add', { ...data, errors });
    }
})

module.exports = {
    addRouter
}