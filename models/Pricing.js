const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Pricing = mongoose.model("Price", pricingSchema);

module.exports = Pricing;
