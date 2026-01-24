import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    trackingId: {
      type: String,
      default: "",
    },
    paymentScreenshotKey: {
      type: String, // Optional: if you add screenshot upload later
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
