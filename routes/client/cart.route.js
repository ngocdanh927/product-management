const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.get("/", controller.index);
router.post("/add-cart/:productId", controller.addCart);
router.get("/delete/:productId", controller.delete);
router.patch("/update/:productId/:quantity", controller.updateQuantity);

module.exports = router;
