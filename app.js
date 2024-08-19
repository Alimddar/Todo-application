import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import { syncModels } from "./src/model/index.js";
import routes from "./src/route/index.js";

dotenv.config();

const app = express();

// middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(cors( { origin : "*", credentials : true } ));

// sync models
// syncModels().then((message) => {
//     console.log(message);
// }).catch((error) => {
//     console.log(error);
// });

// routes
app.use("/api/v1", routes);

// PORT
const PORT = process.env.PORT || 3000;

// listen server
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) } );