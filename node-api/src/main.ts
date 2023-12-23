import express, { Express } from "express";
import router from "./modules/router";

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use("/api", router);

  return app;
}
