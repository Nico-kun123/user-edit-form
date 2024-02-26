import express from "express";
import path from "path";

// import history from 'connect-history-api-fallback';

import homepageRouter from "./homepageRouter.js";
import assetsRouter from "./assetsRouter.js";

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

const app = express();
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

app.use(homepageRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/home", async (req, res) => {
  res.send("Welcome to the homepage!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
