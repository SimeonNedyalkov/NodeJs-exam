const { recipesRouter } = require('../controllers/recipesController')
const {homeRouter} = require('../controllers/homeController')
const { searchRouter } = require('../controllers/searchController')
const { userRouter } = require('../controllers/userController')
const { addRouter } = require('../controllers/addController')
const { detailRouter } = require('../controllers/detailsController')
const { editAndDeleteRouter } = require('../controllers/editAndDeleteController')
const { fourOFourRouter } = require('../controllers/404Controller')

function configRoutes(app){
    app.use(homeRouter) 
    app.use(searchRouter)
    app.use(recipesRouter)
    // users
    app.use(userRouter)
    // add recipe
    app.use(addRouter)
    // details
    app.use(detailRouter)
    // edit
    app.use(editAndDeleteRouter)
    // 404
    app.use(fourOFourRouter);
}
module.exports = {
    configRoutes
}