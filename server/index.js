import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// functions
import Connection from "./database/db.js";
import Router from "./routes/Routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Router);

const URL = process.env.MONGO_URI ;
Connection(URL);

app.listen(PORT, () => {
  console.log(`server is runnig successfully on port ${PORT}`);
});
