import comercio from "../models/comercio.js";

const controlador = {};

controlador.listado = async (req, res) => {
  await comercio
    .find()
    .then((listado) => res.status(200).json(listado))
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.uno = async (req, res) => {
  await comercio
    .findById(req.params.id)
    .then((comercio) => {
      if (comercio) {
        res.status(200).send(comercio);
      } else {
        res.status(404).send({ mensaje: "El comercio no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.registrar = async (req, res) => {
  const nuevoComercio = new comercio(req.body);
  await nuevoComercio
    .save()
    .then((comercio) => {
      if (comercio) {
        res.status(201).send(comercio);
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
  await comercio
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
    .then((comercio) => {
      if (comercio) {
        res.status(200).send(comercio);
      } else {
        res.status(404).send({ mensaje: "El comercio no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

controlador.eliminar = async (req, res) => {
  await comercio
    .findByIdAndRemove(req.params.id)
    .then((comercio) => {
      if (comercio) {
        res.status(200).send({ mensaje: "Comercio eliminado" });
      } else {
        res.status(404).send({ mensaje: "El comercio no fue encontrado" });
      }
    })
    .catch((error) =>
      res.status(500).send({ mensaje: "Ocurrio un error", error: error })
    );
};

export default controlador;
