import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const addToCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const product = await Product.findById(req.body.product);
  // Check if the product is available
  if (!product) {
    return next(new SystemError("Product not found", 404));
  }
  // todo: Why user send price "and discount" but we get it from the product model?
  req.body.price = product.price;
  // Check if the product is in stock
  if (req.body.quantity > product.stock) {
    return next(new SystemError("Product is out of stock", 400));
  }
  // Check if the cart is exist
  if (!cart) {
    const newCart = new Cart({
      user: req.user.id,
      cartItems: [
        {
          product: req.body.product,
          quantity: req.body.quantity,
          price: req.body.price,
        },
      ],
      totalPrice: calculateTotalPrice(req.body.cartItems),
      discount: req.body.discount,
      totalPriceAfterDiscount:
        calculateTotalPrice(req.body.cartItems) -
        calculateTotalPrice(req.body.cartItems) * req.body.discount,
    });
    await newCart.save();
    res.status(201).json({ message: "success", cart: newCart });
  } else {
    const product = cart.cartItems.find(
      (item) => item.product.toString() === req.body.product // convert to string because the product is an ObjectId
    );
    // Check if the product is in cart
    if (product) {
      // todo: is it update += or set as =
      product.quantity += req.body.quantity || 1;
      // todo: how to make sure the product stock is updated (in real time)?
      // Check if the product is in stock
      if (product.quantity > product.stock) {
        return next(new SystemError("Product is out of stock", 400));
      }
    } else {
      cart.cartItems.push({
        product: req.body.product,
        quantity: req.body.quantity || 1,
        price: req.body.price,
      });
    }
    cart.totalPrice = calculateTotalPrice(cart.cartItems);
    cart.discount = req.body.discount;
    cart.totalPriceAfterDiscount =
      cart.totalPrice - cart.totalPrice * req.body.discount;
    await cart.save();
    res.status(200).json({ message: "success", cart });
  }
  // todo: check if the product is in the wishlist
  /*
  // todo: how to make sure the product stock is updated (in real time)?
  1- Update stock by - or + stock in the product model
  */
});

// const addCart = catchError(async (req, res) => {
//   const cart = new Cart(req.body);
//   await cart.save();
//   res.status(201).json({ message: "success", cart });
// });

// const getCart = catchError(async (req, res) => {
//   const cart = await Cart.findById(req.params.id);
//   res.status(200).json({ message: "success", cart });
// });

// const updateCart = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const deleteCart = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndDelete(req.params.id);
//   res.status(200).json({ message: "success", cart });
// });

// const clearCart = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     cartItems: [],
//     totalPrice: 0,
//     discount: 0,
//     totalPriceAfterDiscount: 0,
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const addProductToCart = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     $push: { cartItems: req.body },
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const removeProductFromCart = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     $pull: { cartItems: req.body },
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const updateProductQuantity = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     $set: { "cartItems.$.quantity": req.body.quantity },
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const applyCoupon = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     $set: { discount: req.body.discount },
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const removeCoupon = catchError(async (req, res) => {
//   const cart = await Cart.findByIdAndUpdate(req.params.id, {
//     $set: { discount: 0 },
//   });
//   res.status(200).json({ message: "success", cart });
// });

// const calculateCartTotal = catchError(async (req, res) => {
//   const cart = await Cart.findById(req.params.id);
//   res.status(200).json({ message: "success", cart });
// });

// const getCartTotal = catchError(async (req, res) => {
//   const cart = await Cart.findById(req.params.id);
//   res.status(200).json({ message: "success", cart });
// });

export { addToCart };
