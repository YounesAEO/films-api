import "dotenv/config";
import cors from "cors";
import express from "express";

import { connectDb } from "./config";
import Modules from "./modules";

const { UserModule, MessageModule } = Modules;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use(async (req, res, next) => {
  req.context = {
    modules: Modules,
    me: await UserModule.services.fetchdByLogin("rwieruch"),
  };
  next();
});

// * Routes * //
app.use("/users", UserModule.router);
app.use("/messages", MessageModule.router);

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
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      UserModule.services.deleteAll(),
      MessageModule.services.deleteAll(),
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = await UserModule.services.createOne({
    username: "rwieruch",
  });

  const user2 = await UserModule.services.createOne({
    username: "ddavids",
  });

  await MessageModule.services.createOne({
    text: "Published the Road to learn React",
    user: user1._id,
  });

  await MessageModule.services.createOne({
    text: "Happy to release ...",
    user: user2._id,
  });

  await MessageModule.services.createOne({
    text: "Published a complete ...",
    user: user2._id,
  });
};
