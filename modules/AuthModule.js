const Joi = require("joi");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mailer = require("../middleware/Mailsender");

//^----------------------> Registration Part <----------------------^//
exports.register = async (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(50).required().trim(true),
    last_name: Joi.string().min(3).max(50).required().trim(true),
    email: Joi.string().min(6).max(50).email().required().trim(true),
    password: Joi.string().min(4).max(15).required().trim(true),
  });

  try {
    let { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    let existUser = await User.findOne({ email: req.body.email }).exec();

    if (existUser)
      return res
        .status(400)
        .send({ msg: "Email already exists.", status: "error" });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.status(201).json({
      msg: "You have successfully registered your account..!",
      status: "success",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------> Login <----------------------^//

exports.login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).email().required(),
    password: Joi.string().min(4).max(15).required(),
  });

  try {
    let { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });
    console.log(User);

    let existUser = await User.findOne({ email: req.body.email }).exec();
    if (!existUser)
      return res
        .status(400)
        .send({ msg: "Email not registered", status: "error" });

    let user = {
      first_name: existUser.first_name,
      last_name: existUser.last_name,
      email: existUser.email,
      cart: existUser.cart,
    };

    let isValid = await bcrypt.compare(req.body.password, existUser.password);
    if (!isValid)
      return res
        .status(400)
        .send({ msg: "Password doesn't match.", status: "error" });

    let token = jwt.sign({ user }, "SWERA", { expiresIn: "2h" });
    res.send({ userToken: token, status: "success" });
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------> Forgot Password <----------------------^//

exports.forgotpassword = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).email().required(),
  });
  try {
    let { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    let existUser = await User.findOne({ email: req.body.email }).exec();
    if (!existUser)
      return res
        .status(400)
        .send({ msg: "Email not registered", status: "error" });

    let user = {
      id: existUser._id,
    };

    let token = jwt.sign({ user }, "SWERA", { expiresIn: "2m" });

    const data = {
      email: req.body.email,
      id: existUser._id,
      token: token,
    };

    await Mailer.mailer(data);
    res
      .status(200)
      .send({ msg: "Reset password link has been sent to your mail." });
  } catch (err) {
    res.status(400).send(err);
  }
};
