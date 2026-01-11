import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/", routes);
app.use(errorHandler);

export default app;
