import Mongoose from "mongoose";

const rolSchema = Mongoose.Schema(
  {
    nombre: { type: String, required: true },
    permisos: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model("Rol", rolSchema);
