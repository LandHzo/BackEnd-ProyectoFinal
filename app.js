import Express from "express";
import Morgan from "morgan";
import RutasComercio from "./routes/comercio.routes.js";
import RutasUsuario from "./routes/usuario.routes.js";
import Autenticacion from "./routes/autenticacion.js";
import Verificacion from "./middleware/verificacion.js";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de comercios",
      version: "1.0.0",
      description:
        "Esta es una API para poder encontrar informacion de los comercios",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));

app.use("/comercios", Verificacion, RutasComercio);
app.use("/usuarios", RutasUsuario);
app.use(Autenticacion);
app.set("puerto", process.env.PORT || 3000);
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//GET con parametros
app.get("/", (req, res) => {
  //extrayendo un parametro
  res.send("Api de comercios");
});

export default app;
