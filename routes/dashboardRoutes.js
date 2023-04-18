const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllMessages,
  deleteMessage,
  getUsersPage,
  getUserPage,
  deleteUser,
  projects,
  createProject,
  deleteProject,
  getPricingPage,
  createPricing,
  deletePricing,
} = require("../controllers/dashboardController");
const multer = require("multer");

const router = express.Router();
const upload = multer({});

// Dashboard Root Path

router.route("/").get(getAllMessages);

router.get(
  "/message/delete/:id",
  protect,
  restrictTo("admin", "owner"),
  deleteMessage
);

//Project Routes
router
  .route("/project")
  .get(projects)
  .post(
    protect,
    restrictTo("admin", "owner"),
    upload.single("image"),
    createProject
  );

router.get(
  "/project/delete/:id",

  deleteProject
);

//User Routes
router.route("/users").get(getUsersPage);

router.route("/users/:id").get(getUserPage);

router.get(
  "/users/delete/:id",

  deleteUser
);
//Pricing Routes
router.route("/pricing").get(getPricingPage).post(createPricing);

router.get("/pricing/delete/:id", deletePricing);

module.exports = router;
