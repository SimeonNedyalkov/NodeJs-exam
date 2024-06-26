const mongoose = require('mongoose')
require('../models/User')
require('../models/Recipes')

async function databaseConfig(){
    await mongoose.connect('mongodb://localhost:27017/home-cooking-recipes')
    console.log("Database connected")

}
module.exports = {
    databaseConfig
}