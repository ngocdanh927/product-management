const mongoose = require("mongoose");
// const generateRandom = require("../helper/generateRandom");

const OrderSchema = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    note: String,
    userInfor: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
    },

    products: [
      {
        product_id: String,
        title: String,
        thumbnail: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
    totalOriginalPrice: Number,
    totalPrice: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "bank", "momo", "vnpay", "paypal"],
      default: "cod",
    },

    // paymentStatus: {
    //   type: String,
    //   enum: ["unpaid", "paid", "failed"],
    //   default: "unpaid",
    // },
    updatedBy: String,
    deletedBy: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema, "orders");
module.exports = Order;
