const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "A user must have first name!"],
    },
    lastName: {
      type: String,
      required: [true, "A user must have last name!"],
    },
    email: {
      type: String,
      required: [true, "U user must have email!"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "owner"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
