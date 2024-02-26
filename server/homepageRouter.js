import express from "express";
import path from "path";
import fs from "fs/promises";

const router = express.Router();
router.use(express.json());

const environment = process.env.NODE_ENV;
console.log("👀 process.env.NODE_ENV:", environment);

router.use("*", async (req, res, next) => {
  console.log("🚀 ~ req.originalUrl:", req.originalUrl);
  if (req.originalUrl == "/getJobs") {
    return res.json({ jobs: ["Должность №1", "Должность №2", "Должность №3"] });
  }
  if (req.originalUrl == "/hello") {
    return res.json({ message: "Hello, world!" });
  }
  if (req.originalUrl == "/validateData") {
    const InvalidFields = req.body;
    console.log("😡 ~ InvalidFields:", InvalidFields);

    if (InvalidFields.length === 0) {
      return res.json({ message: "Данные формы валидны" });
    } else {
      return res.json({
        error: `❌Форма содержит ошибки валидации! (поля: ${InvalidFields})`,
      });
    }
  }

  const data = {
    environment,
    manifest: await parseManifest(),
  };
  res.render("../src/views/index.html.ejs", data);
});

const parseManifest = async () => {
  if (environment !== "production") return {};

  const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
  const manifestFile = await fs.readFile(manifestPath);

  return JSON.parse(manifestFile);
};

export default router;
