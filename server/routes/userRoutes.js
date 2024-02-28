const userController = require('../controllers/userController');
const verifyUser = require('../utils/verifyUser');
const express = require('express');


const router = express.Router();

router.post('/updateMe/:id', verifyUser.verifyToken, userController.updateUser);

module.exports = router;