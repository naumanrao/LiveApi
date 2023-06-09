import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: {
      type: String,
      required: true,
      get: function (image) {
        // http://localhost:5000/uploads/1616443169266-52350494.png
        if (process.env.ON_HEROKU == "true") {
          return `${image}`;
        }

        return `${"https://liveapi-production-d720.up.railway.app"}/${image.replace(
          /\\/g,
          "/"
        )}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Product", productSchema, "products");
