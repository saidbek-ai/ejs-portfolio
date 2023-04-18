const Project = require("../models/ProjectModel");
const User = require("./../models/UserModel");
const Pricing = require("./../models/Pricing");
const Message = require("./../models/MessageModel");

const { renderState } = require("../controllers/authController.js");

// Message Routes
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.render("./dashboard/dashboard", { messages });
  } catch (error) {
    renderState(res, "Failed", error.message, "/dashboard", 400);
  }
};

exports.deleteMessage = async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findByIdAndDelete(id);

  if (!message) {
    return renderState(
      res,
      "Success",
      "Message not found!",
      "/dashboard/",
      404
    );
  }

  renderState(
    res,
    "Success",
    "Message delete successfully!",
    "/dashboard/",
    200
  );
};

//Pricing

exports.getPricingPage = async (req, res, next) => {
  try {
    const pricing = await Pricing.find();

    res.render("./dashboard/pricing", { pricing });
  } catch (error) {
    renderState(res, "failed", error.message, "/dashboard", 400);
  }
};

exports.createPricing = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const pricing = await Pricing.create({ title, description, price });

    if (!pricing) {
      return renderState(
        res,
        "Failed",
        "Unable to create pricing plan!",
        "/dashboard/pricing",
        400
      );
    }
    renderState(
      res,
      "Success",
      "Pricing plan created Successfully!",
      "/dashboard/pricing",
      201
    );
  } catch (error) {
    renderState(res, "Failed", error.message, "/dashboard/pricing", 400);
  }
};

exports.deletePricing = async (req, res, next) => {
  try {
    const { id } = req.params;

    const price = await Pricing.findByIdAndDelete(id);

    if (!price) {
      return renderState(
        res,
        "Failed",
        "Unable to find price!",
        "/dashboard/pricing",
        404
      );
    }

    renderState(
      res,
      "Success",
      "Price deleted successfully!",
      "/dashboard/pricing",
      200
    );
  } catch (error) {
    renderState(res, "Failed", error.message, "/dashboard/pricing", 400);
  }
};

// User Pages
exports.getUsersPage = async (req, res, next) => {
  try {
    const users = await User.find();

    res.render("./dashboard/users", { users });
  } catch (error) {
    renderState(res, "failed", error.message, "/dashboard", 400);
  }
};

// Single User
exports.getUserPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return renderState(
        res,
        "Failed",
        "User not found!",
        "/dashboard/users",
        404
      );
    }

    res.render("./dashboard/user", { user });
  } catch (error) {
    renderState(res, "failed", error.message, "/dashboard", 400);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return renderState(
        res,
        "Failed",
        "User not found!",
        "/dashboard/users",
        404
      );
    }

    renderState(
      res,
      "Success",
      "User deleted successfully!",
      "/dashboard/users",
      200
    );
  } catch (error) {}
};

// Project Controllers
exports.projects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    res.render("./dashboard/projects", { projects });
  } catch (error) {
    renderState(res, "failed", error.message, "/dashboard", 400);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { title, description, src, liveDemo } = req.body;

    const file = req.file;

    const base64Image = file.buffer.toString("base64");
    const image = `data:${file.mimetype};base64,${base64Image}`;

    const project = await Project.create({
      title,
      description,
      src,
      liveDemo,
      image,
    });

    if (!project) {
      return renderState(
        res,
        "Failed",
        "Unable to create project post ",
        "/dashboard/project",
        400
      );
    }

    renderState(
      res,
      "Success",
      "Project created successfully",
      "/dashboard/project",
      201
    );
  } catch (error) {
    renderState(res, "Failed", error.message, "/dashboard/project", 400);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return renderState(
        res,
        "Failed",
        "Project Not found",
        "/dashboard/project",
        404
      );
    }

    renderState(
      res,
      "success",
      "Product deleted successfully!",
      "/dashboard/project",
      200
    );
  } catch (error) {
    res, "failed", error.message, "/dashboard/project", 400;
  }
};
