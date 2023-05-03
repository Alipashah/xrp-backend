import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import addRoutesToApp from "./addRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app: Express = express();

const APP_PORT = process.env.APP_PORT;


addRoutesToApp(app, path.resolve("./src/routes"), "api");

app.get("/api", (req: Request, res: Response) => {
  res.send("Test Successful!");
});

app.listen(APP_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${APP_PORT}`);
});

// global.__basedir = __dirname;
