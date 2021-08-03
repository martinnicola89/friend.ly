const express = require('express');
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages")

router.post('/', messagesCtrl.new)
router.get('/:conversationId', messagesCtrl.index)

module.exports = router;