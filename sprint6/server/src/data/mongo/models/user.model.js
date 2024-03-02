import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "https://via.placeholder.com/150" },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;