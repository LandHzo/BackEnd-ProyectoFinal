import usuario from "../models/usuario.js";
import llave from "../middleware/llaveSecreta.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const controlador = {};
const rondasDeSal = 10;

controlador.listado = async (req, res) => {
  await usuario
    .find()
    .then((listado) => res.status(200).json(listado))
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.uno = async (req, res) => {
  await usuario
    .findById(req.params.id)
    .then((usuario) => {
      if (usuario) {
        res.status(200).json({ ...usuario._doc });
      } else {
        res.status(404).send({ mensaje: "El usuario no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.registrar = async (req, res) => {
  const nuevoUsuario = new usuario(req.body);
  nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, rondasDeSal);
  await nuevoUsuario
    .save()
    .then((usuario) => {
      if (usuario) {
        res.status(201).send(usuario);
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.actualizar = async (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.password = await bcrypt.hash(req.body.password, rondasDeSal);
  await usuario
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
    .then((usuario) => {
      if (usuario) {
        res.status(200).send(usuario);
      } else {
        res.status(404).send({ mensaje: "El usuario no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.eliminar = async (req, res) => {
  await usuario
    .findByIdAndDelete(req.params.id)
    .then((usuario) => {
      if (usuario) {
        res.status(200).send({ mensaje: "Usuario eliminado" });
      } else {
        res.status(404).send({ mensaje: "El usuario no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.autenticar = async (req, res) => {
  const user = await usuario.findOne({
    username: req.body.username,
  });

  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, coinciden) => {
      if (err) {
        return res.status(404).send({ mensaje: "La autenticacion fallo" });
      }
      if (!coinciden) {
        return res.status(400).send({ mensaje: "Datos incorrectos" });
      }
      const datosToken = user._id;
      const token = Jwt.sign({ id: datosToken }, llave.llave, {
        expiresIn: "24h",
      });
      return res.status(200).send({
        mensaje: "Usuario autenticado",
        token: token,
      });
    });
  } else {
    return res.status(404).send({ mensaje: "La autenticacion fallo" });
  }
};

export default controlador;
