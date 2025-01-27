import Cart from "../models/cart.model.js";
import Dress from "../models/dress.model.js";

export async function AddToCart(req, res) {
  try {
    const cart = new Cart({ ...req.body });
    await cart.save();
    res.status(200).send("Added to cart successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function GetCartByUser(req, res) {
  try {
    const cartItems = await Cart.find({ userId: req.params.id });
    const cartWithData = await Promise.all(
      cartItems.map(async (cartItem) => {
        const dress = await Dress.findById(cartItem.dressId);
        const cartData = cartItem.toObject();
        delete cartData.dressId;
        return { ...cartData, dress };
      })
    );
    res.status(200).send(cartWithData);
  } catch (error) {
    res.status(500).send(error);
  }
}
