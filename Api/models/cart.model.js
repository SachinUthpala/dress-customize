import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  dressId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: { type: mongoose.Types.ObjectId, required: true },
  price: {
    type: Number,
    required: true,
  },
  customItems: {
    type: [{ type: mongoose.Schema.Types.Mixed }],
    required: true,
  },
  customizations: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
