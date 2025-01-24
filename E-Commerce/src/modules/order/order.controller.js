import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";

const createOrder = catchError(async (req, res, next) => {
  // 1- get cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new SystemError("Cart not found", 404));
  }
  // 2- create order
  const { paymentMethod, shippingAddress } = req.body;
  const order = await Order.create({
    user: req.user.id,
    orderItems: cart.cartItems,
    totalPrice: cart.totalPriceAfterDiscount || cart.totalPrice,
    paymentMethod,
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

// for user
const getOrdersByUser = catchError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate("orderItems.product");
  // or using mergeParams: users/:id/orders such as /categories/:categorySlug/subcategories
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
  const order = await Order.findById(req.params.id)
    // .populate("user")
    // .populate("orderItems.product");
  res.status(200).json({ message: "success", order });
});

const updateOrder = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json({ message: "success", order });
});

const deleteOrder = catchError(async (req, res, next) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.status(200).json({ message: "success" });
});

export {
  createOrder,
  getOrders,
  getSingleOrder,
  getOrdersByUser,
  getSingleOrderByUser,
  updateOrder,
  deleteOrder,
};
