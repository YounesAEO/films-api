import "dotenv/config";
import cors from "cors";
import express from "express";

import { connectDb } from "./config";
import Modules from "./modules";

const { UserModule, FilmModule } = Modules;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //
app.use("/users", UserModule.router);
app.use("/films", FilmModule.router);

app.get("*", function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 301;
  next(error);
});

// * Application-Level Middleware * //
app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  // if (error.statusCode === 301) {
  //   return res.status(301).redirect("/not-found");
  // }

  return res.status(error.statusCode).json({ error: error.toString() });
});

// * Start * //
// SET TO FALSE TO AVOID ERASING OLDER DB DOCUMENTS
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      UserModule.services.deleteAll(),
      FilmModule.services.deleteAll(),
    ]);

    createUsersWithFilms();
  }

  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithFilms = async () => {
  const film1 = await FilmModule.services.createOne({
    _id: 278,
    title: "Shawshank Redemption",
  });

  const film2 = await FilmModule.services.createOne({
    _id: 155,
    title: "The Dark Knight",
  });

  const film3 = await FilmModule.services.createOne({
    _id: 19995,
    title: "Avatar",
  });

  await UserModule.services.createOne({
    // _id: 1,
    username: "yopisas243",
    email: "yopisas243@lance7.com",
    password: "9@4FB4#Y3^jz",
    favFilms: [film1._id],
  });

  await UserModule.services.createOne({
    // _id: 2,
    username: "bodaboy952",
    email: "bodaboy952@sopulit.com",
    password: "eXje%$f95kB2",
    favFilms: [film2._id, film3._id],
  });
};
