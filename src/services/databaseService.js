const {Recipe} = require('../models/Recipes')

async function getAllRecipes(){
    return Recipe.find().lean()
}

async function get3Recent(){
    return Recipe.find().sort({$natural:-1}).limit(3).lean()
}

async function getRecipeById(id){
    return Recipe.findById(id).lean()
}

async function create(data,authorId){
    const record = new Recipe({
        title : data.title,
        ingredients:data.ingredients,
        instructions:data.instructions,
        description:data.description,
        image:data.image,
        recommendList:data.recommendList,
        owner:authorId
    })
    await record.save()
    return record
}

async function recommend(recipeId,userId){
    const record = await Recipe.findById(recipeId)
    if(!record){
        throw new Error('Recipe not found!')
    }
    if(record.owner.toString() == userId){
        throw new Error('Access denied!')
    }
    if(record.recommendList.find(l=>l.toString() == userId)){
        throw new Error('Already liked!')
    }
    
    record.recommendList.push(userId)
    
    await record.save()
    return record
}

async function update(recipeId, data , authorId){
    const record = await Recipe.findById(recipeId)
    if(!record){
        throw new Error('Recipe not found')
    }
    if(record.owner.toString() != authorId){
        throw new Error('Access denied!')
    }
    
    record.title = data.title
    record.ingredients = data.ingredients
    record.instructions = data.instructions
    record.description = data.description
    record.image = data.image
    await record.save()
    return record
}

async function deleteById(id,userId){
    const record = await Recipe.findById(id)
    if(!record){
        throw new ReferenceError(`Record not found ` + id)
    }
    if(record.owner.toString() != userId){
        throw new Error('Access denied')
    }
    await Recipe.findByIdAndDelete(id)
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    create,
    recommend,
    update,
    deleteById,
    get3Recent
}