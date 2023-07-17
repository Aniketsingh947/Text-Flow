const users = require("../controllers/usersController");

const router = require("express").Router();

router.post("/login", users.login);
router.post("/register", users.register);
router.get("/allusers/:id", users.getAllUsers);
router.post("/setavatar/:id", users.setAvatar);
router.post("/addcontact/:id", users.addcontact);
router.get("/logout/:id", users.logOut);

module.exports = router;
