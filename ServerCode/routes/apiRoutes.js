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

router.get('/getGroups', controller.getGroups);

router.get('/getGroup/:id', controller.getGroup);

router.get('/deleteGroup/:id', controller.deleteGroup);

router.get('/event/:id', controller.getEvent);

router.post('/addUser', controller.addUser);

router.post('/deleteUser', controller.deleteUser);

module.exports = router;