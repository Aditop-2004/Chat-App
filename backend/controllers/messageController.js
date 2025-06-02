import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //yani first time conversation ho rhi hai to naya conversation bna do
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //  wrna to gotConversation mil hi chuki hai

    //message banao aur uski id conversation ke messages me push kardo
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();

    //!SOCKET IO Implementation

    return res
      .status(200)
      .json({
        message: "Message sent successfully",
        success: true,
        newMessage,
      });
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages", // the array of Message ObjectIds
      populate: [
        { path: "senderId", model: "User" },
        { path: "receiverId", model: "User" },
      ],
    });

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation found",
        success: true,
        conversation: [],
      });
    }
    return res.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      conversation,
    });
  } catch (error) {
    console.log("kuch to garbad hai daya");
    return res.status(500).json({ message: error.message, success: false });
  }
};
