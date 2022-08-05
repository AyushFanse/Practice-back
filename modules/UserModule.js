const User = require("../model/user");
const bcrypt = require("bcrypt");

//^----------------------> Get All Users From DataBase <----------------------^//

exports.GetUser = async (req, res, next) => {
  try {
    var response = await User.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------> Get User By Id From DataBase <----------------------^//

exports.GetUserById = async (req, res, next) => {
  try {
    var response = await User.findById(req.params.userId);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------------> Update User By Id <----------------------------^//

exports.UpdateUser = async (req, res, next) => {
  try {
    let existUser = await User.findOne({ email: req.body.email }).exec();

    if (existUser)
      return res
        .status(400)
        .send({ msg: "Email already exists.", status: "error" });

    const user = await User.findById(req.params.userId);
    const data = {
      first_name: req.body.first_name || user.first_name,
      last_name: req.body.last_name || user.last_name,
      email: req.body.email || user.email,
    };
    const response = await User.findByIdAndUpdate(req.params.userId, data, {
      new: true,
    });
    res.status(200).json({
      data: response,
      msg: "Your Account has been updated successfully...",
      status: "success",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------------> Update User By Id <----------------------------^//

exports.UpdatePassword = async (req, res, next) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        password: newPassword,
      },
      { new: true }
    );
    res.status(200).json({
      data: response,
      msg: "Your Password has been updated successfully...",
      status: "success",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------------> Delete User By Id <----------------------------^//

exports.DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.status(200).json({
      msg: "Your Account has been deleted successfully...",
      status: "success",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

//^----------------------------> Save The Product <----------------------------^//

exports.AddToCart = async (req, res, next) => {
  try {
    const default_quantity = 1;

    let cart = {
      shirt_id: req.body.shirt_id,
      shirt_title: req.body.shirt_title,
      quantity: req.body.quantity || default_quantity,
    };

    let product = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $push: { cart: cart },
      },
      { new: true }
    );
    res.status(200).json({
      data: product,
      msg: `${req.body.shirt_title} added to your cart.`,
      status: "success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//^----------------------> Delete the Saved The Product <----------------------^//

exports.RemoveFromCart = async (req, res, next) => {
  try {
    let product = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { _id: req.params.shirtId },
      },
      { new: true }
    );
    res.status(200).json({
      data: product,
      msg: `${req.body.shirt_title} removed from your cart.`,
      status: "success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
