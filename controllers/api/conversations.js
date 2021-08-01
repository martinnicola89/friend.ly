const Conversation = require("../../models/conversation")

module.exports = {
    new: newConversation,
    index,
  };

async function newConversation(req, res) {
    try {
        await Conversation.create({
            members: [req.body.senderId, req.body.receiverId],
        })
        res.status(200).json("Conversation created!")
    } catch (err) {
        res.status(500).json(err)
    }
}
  
async function index(req, res) {
    try { 
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]},
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err)
    }
}