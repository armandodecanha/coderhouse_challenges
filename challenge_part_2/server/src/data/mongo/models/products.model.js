import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, default: "https://via.placeholder.com/150" },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Products = model(collection, schema);
export default Products;
