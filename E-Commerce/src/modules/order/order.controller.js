import { Cart } from "../../database/models/cart.model.js";
import { Order } from "../../database/models/order.model.js";
import { Product } from "../../database/models/product.model.js";
import { User } from "../../database/models/user.model.js";
import { catchError } from "../../middlewares/error/catchError.middleware.js";
import { SystemError } from "../../utils/systemError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCashOrder = catchError(async (req, res, next) => {
  // 1- get cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  // 2- create order
  const { shippingAddress } = req.body;
  const order = await Order.create({
    user: req.user.id,
    orderItems: cart.cartItems,
    totalPrice: cart.totalPriceAfterDiscount || cart.totalPrice,
    paymentMethod: "cash",
    shippingAddress,
  });
  // 3- update stock and sold count
  /*
  await Promise.all(
    cart.cartItems.map(async (item) => {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, sold: item.quantity },
      });
    })
  );
  */
  // or: updateMany
  /*
  await Product.updateMany(
    { _id: { $in: cart.cartItems.map((item) => item.product) } },
    { $inc: { stock: -cart.cartItems.reduce((acc, item) => acc + item.quantity, 0) } }
  );
  */
  // or: bulkWrite (better performance)
  await Product.bulkWrite(
    cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity, sold: item.quantity } },
      },
    }))
  );
  // 4- clear cart
  await Cart.findOneAndDelete({ user: req.user.id });
  res.status(201).json({ message: "success", order });
  // 6- send email
  // await sendEmail(req.user.email, "Order created", `Order ${order._id} created successfully`);
  // 7- send notification
  // await sendNotification(req.user.id, "Order created", `Order ${order._id} created successfully`);
  // 8- send webhook
  // await sendWebhook(req.user.id, "Order created", `Order ${order._id} created successfully`);
  // 9- send sms
  // await sendSms(req.user.phone, `Order ${order._id} created successfully`);
  // 10- send push notification
  // await sendPushNotification(req.user.id, "Order created", `Order ${order._id} created successfully`);
  // 11- update user points
  // await updateUserPoints(req.user.id, order.totalPrice);
  // 12- update user order count
  // await updateUserOrderCount(req.user.id);
  // 13- update user total spent
  // await updateUserTotalSpent(req.user.id, order.totalPrice);
  // 14- update user total points
  // await updateUserTotalPoints(req.user.id, order.totalPrice);
});

const createCheckoutSession = catchError(async (req, res, next) => {
  // 1- get cart
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  // 2- create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: (cart.totalPriceAfterDiscount || cart.totalPrice) * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    client_reference_id: req.params.cartId, // customer id, or order id, or cart id (Needed for Stripe to identify the order - for example, if the user cancels the payment, Stripe will use this id to identify the order and cancel it)
    customer_email: req.user.email,
    success_url: req.body.successUrl,
    cancel_url: req.body.cancelUrl,
    metadata: { shippingAddress: req.body.shippingAddress },
  });
  res.status(201).json({ message: "success", session });
});

// todo: express.raw({type: "application/json"})
const stripeWebhook = catchError(async (req, res, next) => {
  const signature = req.headers["stripe-signature"].toString();
  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  const session = event.data.object;
  const user = await User.findOne({ email: session.customer_email });
  const cart = await Cart.findById(session.client_reference_id);
  if (!user || !cart) {
    return next(new SystemError("User or cart not found", 404));
  }
  const order = new Order({
    user: user._id,
    orderItems: cart.cartItems,
    totalPrice: session.amount_total / 100,
    paymentMethod: "card",
    shippingAddress: session.metadata.shippingAddress,
  });
  if (event.type === "checkout.session.completed") {
    // 3- update stock and sold count
    await Product.bulkWrite(
      cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { stock: -item.quantity, sold: item.quantity } },
        },
      }))
    );
    // 4- clear cart
    await Cart.findOneAndDelete({ user: req.user.id });
    order.paymentStatus = "completed";
    order.paidAt = new Date();
    await order.save();
  } else if (event.type === "checkout.session.async_payment_failed") {
    order.paymentStatus = "failed";
    await order.save();
  }
  res.status(200).json({ message: "success", event, order, session });
});

// for user
const getOrdersByUser = catchError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "orderItems.product"
  );
  // or using mergeParams: users/:id/orders such as /categories/:categoryId/subcategories
  res.status(200).json({ message: "success", orders });
});

// for user
const getSingleOrderByUser = catchError(async (req, res, next) => {
  const order = await Order.findOne({ user: req.user.id, _id: req.params.id });
  res.status(200).json({ message: "success", order });
});

// for admin
const getOrders = catchError(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({ message: "success", orders });
});

// for admin
const getSingleOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  // .populate("user")
  // .populate("orderItems.product");
  res.status(200).json({ message: "success", order });
});

// const updateOrder = catchError(async (req, res, next) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
//   res.status(200).json({ message: "success", order });
// });

// const deleteOrder = catchError(async (req, res, next) => {
//   const { id } = req.params;
//   await Order.findByIdAndDelete(id);
//   res.status(200).json({ message: "success" });
// });

export {
  createCashOrder,
  createCheckoutSession,
  getOrders,
  getSingleOrder,
  getOrdersByUser,
  getSingleOrderByUser,
  stripeWebhook,
};
