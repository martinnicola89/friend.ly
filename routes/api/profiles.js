const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const imgCtrl = require('../../controllers/api/images')



router.post('/',  profilesCtrl.create);
router.get('/', profilesCtrl.index);
router.get('/decision', profilesCtrl.decisionIndex);
router.use(require('../../config/auth'));
router.post('/:id/uploadImage', imgCtrl.uploadImage)

// POST /api/users/login

module.exports = router;