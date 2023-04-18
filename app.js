require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const Message = require("./models/MessageModel");
const { renderState } = require("./controllers/authController");
const Project = require("./models/ProjectModel");
const Pricing = require("./models/Pricing");
const { protect, restrictTo } = require("./controllers/authController");

const app = express();
app.set("view engine", "ejs");

// GLOBAL MIDDLEWARES
// const limiter = rateLimit({
//   max: 250,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, Please try again in an hour!",
// });

const limiterDashboard = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour!",
});

// app.use("/", limiter);
app.use("/dashboard", limiterDashboard);
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Data Sanitization against NoSql query injection
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());

//Prevent Parametr Pollution
app.use(hpp());

app.use(express.static(path.join(__dirname, "public")));

// DB Connection
db();

// Get Home Page
app.get("/", async (req, res, next) => {
  try {
    let username, role;
    if (req.cookies.jwt) {
      const userInfo = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      role = userInfo.role;
      username = userInfo.username;
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    const pricing = await Pricing.find();

    res.render("index", { data: { projects, pricing }, username, role });
  } catch (error) {
    renderState(res, "Failed", error.message, "/", 400);
  }
});

app.post("/message-me", (req, res, next) => {
  try {
    const { email, phone, fullName, project, message } = req.body;

    const myMessage = Message.create({
      email,
      phone,
      fullName,
      project,
      message,
    });

    if (!myMessage) {
      return renderState(
        res,
        "failed",
        "Failed to send Message!",
        "/register",
        400
      );
    }

    return renderState(
      res,
      "success",
      "Your message sent successfully!",
      "/",
      400
    );
  } catch (error) {
    return renderState(res, "Failed", error.message, "/", 400);
  }
});

// Get Register Page
app.get("/register", (req, res, next) => {
  try {
    res.status(200).render("register", {});
  } catch (error) {
    // res.status(400).render("state", {
    //   status: "failed",
    //   message: "Cannot get login page!",
    //   link: "/",
    // });
    return renderState(res, "Failed", "Cannot get login page!", "/", 400);
  }
});

// Get Login Page
app.get("/login", (req, res, next) => {
  try {
    res.status(200).render("login", {});
  } catch (error) {
    renderState(res, "Failed", error.message, "/", 400);
  }
});

app.use("/user", userRoutes);
app.use("/dashboard", protect, restrictTo("admin", "owner"), dashboardRoutes);

app.all("*", (req, res, next) => {
  const path = req.originalUrl;

  res.status(404).render("./404page", {});
});

const port = process.env.PORT || 3344;

app.listen(port, () => {
  console.log(`Server is working on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting Down...");
  console.log(err.name, err.message);

  process.exit(1);
});
