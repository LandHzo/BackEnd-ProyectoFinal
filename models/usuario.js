import Mongoose from "mongoose";
import Rol from "./rol.js";

const usuarioSchema = Mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    rol: {
      type: String,
      ref: Rol,
      reqired: true,
      default: "usuario",
      enum: ["usuario", "administrador"],
    },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model("Usuario", usuarioSchema);
