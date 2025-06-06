import mongoose from "mongoose";

// 01. Define the schema
const orderSchema = new mongoose.Schema(
  {
    // internal field (from token)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // internal field (from cart)
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        // Internal field (from product)
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    // internal field (from cart)
    totalPrice: {
      type: Number,
      required: true,
    },
    // internal field
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "card"],
      default: "cash",
    },
    // internal field (set by payment processing)
    paymentStatus: {
      type: String,
      validate: {
        validator: function () {
          return this.paymentMethod === "card" ? !!this.paymentStatus : true;
        },
        message: "paymentStatus is required when paymentMethod is 'card'.",
      },
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    // Internal field (set when payment is confirmed)
    paidAt: {
      type: Date,
      validate: {
        validator: function () {
          return this.paymentStatus === "paid" ? !!this.paidAt : true;
        },
        message: "paidAt is required when paymentStatus is 'paid'.",
      },
    },
    shippingAddress: {
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      building: {
        type: String,
        required: true,
        trim: true,
      },
      floor: {
        type: String,
        required: true,
        trim: true,
      },
      flat: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        // required: true,
        trim: true,
      },
    },
    // Internal field (set by system/admin)
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    // Internal field (set when status is delivered)
    deliveredAt: {
      type: Date,
      validate: {
        validator: function () {
          return this.status === "delivered" ? !!this.deliveredAt : true;
        },
        message: "deliveredAt is required when status is 'delivered'.",
      },
    },
    successUrl: {
      type: String,
      validate: {
        validator: function () {
          return this.paymentMethod === "card" ? !!this.successUrl : true;
        },
        message: "successUrl is required when paymentMethod is 'card'.",
      },
    },
    cancelUrl: {
      type: String,
      validate: {
        validator: function () {
          return this.paymentMethod === "card" ? !!this.cancelUrl : true;
        },
        message: "cancelUrl is required when paymentMethod is 'card'.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 02. Define the model
export const Order = mongoose.model("Order", orderSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "orders" by default.
