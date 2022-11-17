const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//GET /user/signup: get signup page
router.get('/signup', controller.signup);

//POST /user/signup: post signup form
router.post('/signup', controller.create);

//GET /user/login: get login page
router.get('/login', controller.login);

//POST /user/signup: post signup form
router.post('/login', controller.auth);

//GET /user/signout: get signout request
router.get('/signout', controller.signout);


module.exports = router;