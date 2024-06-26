const homeRouter = require('express').Router()
const {get3Recent}= require("../services/databaseService")

homeRouter.get('/',async(req,res)=>{
    const recent = await get3Recent()
    res.render('home',{recent})
})

module.exports = {
    homeRouter
}