import App from "./app.js";
import DB from "./database.js";

//DB.connect();

App.listen(App.get("puerto"), () =>
  console.log("Servidor en línea " + App.get("puerto"))
);
