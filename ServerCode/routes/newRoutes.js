const express = require('express');
const controller = require('../controllers/newController');

const router = express.Router();

//GET /apt: new app index
router.get('/', controller.index);

//POST /apt: post new appointment
router.post('/', controller.new);

//Get /apt::id
router.get('/:id', controller.id);

module.exports = router;