import express from "express";
import routes from "./routes";

const app = express();
const route = express.Router();

app.use("/users", route);

routes(route);

export default app;
