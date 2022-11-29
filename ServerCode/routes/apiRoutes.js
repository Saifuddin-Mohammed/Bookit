const express = require('express');
const controller = require('../controllers/apiController');

const router = express.Router();

router.get('/', controller.index);

router.post('/', controller.newEvent)

router.get('/user', controller.getUser);

router.post('/newUser', controller.newUser);

router.post('/login', controller.login);

router.get('/logout', controller.logout)

router.post('/newGroup', controller.newGroup);

router.get('/groupsAdmin', controller.groupsAdmin);

module.exports = router;