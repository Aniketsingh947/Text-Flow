const Message = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg/", Message.addMessage);
router.post("/getmsg/", Message.getMessages);

module.exports = router;
