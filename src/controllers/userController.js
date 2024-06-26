const { register, login } = require('../services/userService');
const { createToken } = require('../services/jwt');
const { parseError } = require('../config/errorConfig');
const { validationResult, body } = require('express-validator');
const userRouter = require('express').Router();
const { isGuest, isUser } = require('../middlewares/guards');

// Login Routes
userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login',
    isGuest(),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Incorrect username or password'),
    body('password').isAlphanumeric().isLength({ min: 4 }).withMessage('Incorrect username or password'),
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
            const user = await login(email, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors });
        }
    });

// Register Routes
userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post('/register',
    isGuest(),
    body('username').trim().isLength({ min: 2,max:20 }).withMessage('Name should be between 2 and 20 characters long'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Email should be atleast 10 characters long'),
    body('password').isAlphanumeric().isLength({ min: 4 }).withMessage('Password should be atleast 4 characters long'),
    async (req, res) => {
        const { username, email, password,repass } = req.body;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
            if(password == repass){
                const user = await register(email, username, password);
                const token = createToken(user);
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/login');
            }
            else{
                throw new Error('Passwords do not match')
            }
        } catch (err) {
            res.render('register', { data: { username, email }, errors: parseError(err).errors });
        }
    });

// Logout Route
userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRouter
};