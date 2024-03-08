import { model, Schema, Types } from "mongoose";

const collection = "orders";
const Schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "User" },
    product_id: { type: Types.ObjectId, required: true, ref: "Product" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, Schema);
export default Order;