const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');

// router.use(require('../../config/auth'));
// POST /api/users/signup
router.post('/', profilesCtrl.create);
router.get('/', profilesCtrl.index);
// POST /api/users/login

module.exports = router;