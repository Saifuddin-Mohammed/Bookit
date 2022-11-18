const express = require('express');
const controller = require('../controllers/groupController');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', controller.new);

router.post('/', controller.addGroup);

router.post('/:id', controller.view);

module.exports = router;