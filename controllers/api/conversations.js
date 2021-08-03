const Conversation = require("../../models/conversation")

module.exports = {
    new: newConversation,
    index,
  };

async function newConversation(req, res) {
    try {
        let conversation = await Conversation.find({members: {$in:[req.body.senderId, req.body.receiverId]}})
        console.log("conversation in new conversation", conversation)
        if (!conversation.length) {
            console.log("inside if condition")
            await Conversation.create({
                members: [req.body.senderId, req.body.receiverId],
            })
        }
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