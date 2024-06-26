const fourOFourRouter = require('express').Router()

fourOFourRouter.get('*',async(req,res)=>{
    res.render('404')
})

module.exports = {
    fourOFourRouter
}