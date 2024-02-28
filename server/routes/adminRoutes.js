const adminController = require('../controllers/adminController');
const verifyUser = require('../utils/verifyUser');
const verifyRole = require('../utils/verifyRole');


const express = require('express');

const router = express.Router();

router.get('/users', verifyUser.verifyToken, verifyRole.verifyAdmin, adminController.getUsers);
router.post('/userUpdate/:id', verifyUser.verifyToken, verifyRole.verifyAdmin, adminController.updateUser);

module.exports = router;