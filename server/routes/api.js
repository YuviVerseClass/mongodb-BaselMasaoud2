const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

// הגדרתי נתיבים ל API , Routers כדאי לנהל את המשימות 

router.get('/tasks', dbController.getTasks);
router.post('/tasks', dbController.addTask);
router.patch('/tasks/:id', dbController.toggleTask);
router.delete('/tasks/:id', dbController.deleteTask);
module.exports = router;


