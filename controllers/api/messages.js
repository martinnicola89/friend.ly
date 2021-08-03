const Message = require("../../models/message")

module.exports = {
    new: newMessage,
    index,
  };

async function newMessage(req, res) {
    try {
        await Message.create(req.body)
        res.status(200).json("Message created!")
    } catch (err) {
        res.status(500).json(err)
    }
}
  
async function index(req, res) {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err)
    }
}