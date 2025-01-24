import { Cart } from "../../../database/models/cart.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";

const calculateTotalPrice = (cart) => {
  cart.totalPrice = cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  if (cart.discount) {
    cart.totalPriceAfterDiscount = cart.totalPrice * (1 - cart.discount / 100);
  }
};

const addProductToCart = catchError(async (req, res, next) => {
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
      totalPrice: calculateTotalPrice(req.body),
      discount: req.body.discount,
      totalPriceAfterDiscount:
        calculateTotalPrice(req.body) * req.body.discount,
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
    cart.totalPrice = calculateTotalPrice(cart);
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

const updateProductQuantity = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new SystemError("Product not found", 404));
  }
  const cartItem = cart.cartItems.find(
    (item) => item.product.toString() === req.params.id
  );
  if (!cartItem) {
    return next(new SystemError("Product not found in cart", 404));
  }
  // Check if the product is in stock
  if (req.body.quantity > product.stock) {
    return next(new SystemError("Product is out of stock", 400));
  }
  cartItem.quantity = req.body.quantity;
  cart.totalPrice = calculateTotalPrice(cart);
  cart.discount = req.body.discount;
  cart.totalPriceAfterDiscount =
    cart.totalPrice - cart.totalPrice * req.body.discount;
  await cart.save();
  res.status(200).json({ message: "success", cart });
});

const removeProductFromCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { cartItems: { _id: req.params.id } } }, // faster than product: req.params.id because we use _id to find the product which is unique and indexed
    { new: true }
  );
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  cart.totalPrice = calculateTotalPrice(cart);
  cart.discount = req.body.discount;
  cart.totalPriceAfterDiscount =
    cart.totalPrice - cart.totalPrice * req.body.discount;
  await cart.save();
  res.status(200).json({ message: "success", cart });
});

// const addCart = catchError(async (req, res) => {
//   const cart = new Cart(req.body);
//   await cart.save();
//   res.status(201).json({ message: "success", cart });
// });

const getCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  res.status(200).json({ message: "success", cart });
});

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

const clearCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user.id });
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  res.status(200).json({ message: "success" });
});

const applyCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findOne({ code: req.body.code });
  // or: const coupon = await Coupon.findOne({ code: req.body.code, expiresAt: { $gte: Date.now() } });
  if (!coupon) {
    return next(new SystemError("Coupon is not valid", 400));
  }
  if (coupon.expiresAt < new Date()) {
    return next(new SystemError("Coupon is expired", 400));
  }
  const cart = await Cart.findOne({ user: req.user.id });
  cart.discount = coupon.discount;
  await cart.save();
  /*
  or:
    const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    {
      $set: {
        discount: coupon.discount,
        totalPriceAfterDiscount: cart.totalPrice * (1 - coupon.discount / 100),
      },
    },
    { new: true }
  );
  */
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  res.status(200).json({ message: "success", cart });
});

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

export {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  getCart,
  clearCart,
  applyCoupon,
};
