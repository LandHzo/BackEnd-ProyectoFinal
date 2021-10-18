import Mongoose from "mongoose";

Mongoose.connect(
  //"mongodb+srv://antony:andaduper2096@cluster0.0hgy6.mongodb.net/emprendeapp?retryWrites=true&w=majority"
  "mongodb://localhost:27017/local",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then((db) => console.log("Ya en linea"))
  .catch((err) => console.log("No se conecta :("));

export default Mongoose;
