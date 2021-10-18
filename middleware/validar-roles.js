import Usuario from "../models/usuario.js";

const validarRoles =
  (accion = []) =>
  async (req, res, next) => {
    const { id } = req.user_data;

    const user = await Usuario.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (user.rol === "administrador") {
      return next(); // el administrador tiene permiso para todas las secciones
    }

    if (!accion.includes("ver")) {
      return res
        .status(401)
        .json({ msg: "el usuario no tiene permiso para esta accion" });
    }

    next();
  };

export default validarRoles;
