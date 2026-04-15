const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller'); 

router.get('/', taskController.getTasks);

router.post('/', taskController.postTask); 

module.exports = router;