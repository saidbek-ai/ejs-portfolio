const { Router } = require("express");
const {
  login,
  register,
  protect,
  restrictTo,
  logout,
} = require("../controllers/authController");

const router = Router();

router.route("/login").post(login);
router.post("/register", register);
router.get("/logout", logout);

module.exports = router;
