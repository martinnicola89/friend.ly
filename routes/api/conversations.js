const express = require('express');
const router = express.Router();
const conversationsCtrl = require('../../controllers/api/conversations');

router.post('/', conversationsCtrl.new);
router.get('/:userId', conversationsCtrl.index);

module.exports = router;