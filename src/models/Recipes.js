const { Schema, model, Types } = require('mongoose');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    recommendList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = {
    Recipe
};