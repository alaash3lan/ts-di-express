import "reflect-metadata";
import express from "express";
import container from "./containerSetup";  // Register services and controllers
import { ExpressServer } from "./router/server";

const server = new ExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build();
app.listen(3000, () => {
  console.log("Server started on port 3000");
});