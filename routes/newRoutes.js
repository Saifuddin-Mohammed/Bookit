const express = require('express');
const controller = require('../controllers/newController');

const router = express.Router();

//GET /new: new app index
router.get('/', controller.index);

//POST /new: post new appointment
router.post('/', controller.new);

module.exports = router;