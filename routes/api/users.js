const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// router.use(require('../../config/auth'));
// POST /api/users/signup
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.create);
router.get('/userdata', usersCtrl.show);
router.get('/userdata/:friendId', usersCtrl.getFriend);
// POST /api/users/login


module.exports = router;