import Mongoose from "mongoose";

const comercioSchema = Mongoose.Schema(
  {
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    nombre: { type: String, required: true },
    nombrePropietario: { type: String, required: true },
    telefono: { type: String, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    direccion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model("Comercio", comercioSchema);
