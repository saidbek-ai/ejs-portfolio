const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signToken = (username, role) => {
  return jwt.sign({ username: username, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.renderState = (res, state, message, link, statusCode) => {
  res.status(statusCode).render("./state", {
    status: state,
    message: message,
    link: link,
  });
};

const renderState = (res, state, message, link, statusCode) => {
  res.status(statusCode).render("./state", {
    status: state,
    message: message,
    link: link,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return renderState(
        res,
        "failed",
        "Passwords are not the same!",
        "/register",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return renderState(
        res,
        "failed",
        "Failed to sign up! Please try again later!",
        "/register",
        400
      );
    }

    const token = signToken(user.firstName, user.role);

    res.cookie("jwt", token, {});

    renderState(res, "success", "You signed up successfully!", "/", 201, token);
  } catch (error) {
    renderState(res, "failed", error.message, "/register", 400);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return renderState(
        res,
        "failed",
        "Email or Password incorrect!",
        "/login",
        400
      );
    }
    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      return renderState(
        res,
        "failed",
        "Email or Password incorrect!",
        "/login",
        400
      );
    }

    const token = signToken(user.firstName, user.role);
    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    renderState(res, "failed", error.message, "/login", 400);
  }
};

exports.protect = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return renderState(
      res,
      "Failed",
      "You are not authorized! Please sign up to get access!",
      "/",
      404
    );
  }

  return next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(role))
      return renderState(
        res,
        "Failed",
        "You don't have permission to this page!",
        "/",
        403
      );

    next();
  };
};

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  return renderState(res, "success", "You logged out!", "/", 200);
};
