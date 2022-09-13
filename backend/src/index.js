import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes.js";

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3030;

try {
  await mongoose.connect(MONGODB_URI);
} catch (err) {
  console.log("Não foi possível se conectar ao banco de dados!", err);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.listen(PORT);
