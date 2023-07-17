const User = require("../modals/userModal");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.find({ username });
    console.log(usernameCheck.length);
    if (usernameCheck.length === 1)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.find({ email });
    if (emailCheck.length === 1)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user.length == 0)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const curuserId = req.params.id;
//     const users = await User.findById(curuserId).populate("contacts");
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };
module.exports.addcontact = async (req, res, next) => {
  try {
    const { username } = req.body;
    const curuserId = req.params.id;
    console.log(curuserId);
    const curuser = await User.findById(curuserId);
    // console.log(curuser);
    const usernameCheck = await User.findOne({ username });
    console.log(usernameCheck);
    if (usernameCheck.length === 0) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    // console.log(curuser);
    curuser.contacts.push(usernameCheck);
    await curuser.save();
    return res.json({ status: true }); //could add a currentchat
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
