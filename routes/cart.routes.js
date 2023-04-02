const { cartModel } = require("../models/cart.model");

const express = require("express");

const cartRoutes = express.Router();

cartRoutes.get("/", async (req, res) => {
    console.log(req.body.userId);
    try {
        const data = await cartModel.find({ userId: req.body.userId });
        console.log(data)
        res.status(200).send({ msg: data, status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

cartRoutes.post("/add", async (req, res) => {
    const { prodId, userId } = req.body;
    try {
        const preCheck = await cartModel.findOne({ prodId, userId });
        if (!preCheck) {
            if (req.body.prodId, req.body.userId && req.body.name && req.body.image && req.body.brand && req.body.originalPrice && req.body.discountPrice && req.body.category) {
                const newData = new cartModel(req.body);
                await newData.save();
                res.status(200).send({ msg: "Product has been added to cart", status: "success" });
            } else {
                res.status(400).send({ msg: "Invalid format" });
            }
        } else {
            res.status(400).send({ msg: "Product is already present" })
        }
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

cartRoutes.delete("/delete/:id", async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Cart item has been deleted", status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

cartRoutes.patch("/update/:id", async (req, res) => {
    try {
        await cartModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ msg: "Cart item details has been updated", status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

module.exports = { cartRoutes };