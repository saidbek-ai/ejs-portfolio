const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "E Message must have email address"],
    },
    phone: {
      type: String,
      required: [true, "E Message must have email address"],
    },
    fullName: {
      type: String,
      required: [true, "Full name required"],
      trim: true,
    },
    project: {
      type: String,
      required: [true, "Project name required!"],
    },
    message: {
      type: String,
      required: [true, "Message required!"],
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

module.exports = Message;
