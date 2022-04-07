import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import dbConfig from "./db/ormconfig";

createConnection(dbConfig)
  .then(() => {
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
      console.log(`App running on port http://localhost:${port}`);
    });
  })
  .catch((e) => console.log(e));
