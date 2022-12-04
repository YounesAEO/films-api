import { connectDb } from "./config";
const { UserModule, FilmModule } = Modules;
import Modules from "./modules";
import "dotenv/config";

const { request, response } = require("express");
const User = require("./modules/user/model");
const session = require("express-session");
var bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //
app.use("/users", UserModule.router);
app.use("/films", FilmModule.router);

app.get("/logout", (request, response) => {
  console.log("TOTO");
  console.log("D'abord", request.session);
  request.session.destroy((error) => {
    if (error)
      return response.status(409).json({ message: "Erreur déconnexion" });
    response
      .status(200)
      .json({ message: "Déconexion réussie ! ", session: request.session });
    console.log("Ensuite:", request.session);
  });
});

app.get("/islogged", (request, response) => {
  if (!request.session.userId) return response.status(401).json();
  User.findOne({ _id: request.session.userId }, (error, user) => {
    if (error) return response.status(401).json({ msg: "Error islogged" });
    if (!user) return response.status(401).json({ msg: "Error !user" });
    request.session.userId = user._id;
    response.status(200).json({
      message: "Connecté ! ",
      data: {
        username: user.username,
        fullName: user.lastName + " " + user.firstName,
        session: request.session,
      },
    });
  });
});

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
      FilmModule.services.deleteAll(),
    ]);

    createFilms();
  }

  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
});

const createFilms = async () => {
  const film1 = await FilmModule.services.createOne({
    title: "Shawshank Redemption",
  });

  const film2 = await FilmModule.services.createOne({
    title: "The Dark Knight",
  });

  const film3 = await FilmModule.services.createOne({
    title: "Avatar",
  });
};

// Partie Authentification

app.use(
  session({
    name: "Cookie",
    secret: "mySecretKey",
    resave: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
  })
);

//Login
app.post("/login", (request, response) => {
  User.findOne(
    { username: request.body.username, password: request.body.password },
    (error, user) => {
      if (error)
        return response
          .status(401)
          .json({ message: "Erreur lors de la connexion" });
      if (!user)
        return response
          .status(401)
          .json({ message: "Mauvais identifiants ! " });
      request.session.userId = user._id;
      response.status(200).json({
        data: {
          message: "Connection réussite ! ",
          username: user.username,
          fullName: user.lastName + " " + user.firstName,
          session: request.session,
        },
      });
    }
  );
});

//Register
app.post("/register", (request, response) => {
  var newUser = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    username: request.body.username,
    password: request.body.password,
  });
  User.countDocuments({ username: newUser.username }, function (err, count) {
    if (err)
      return response
        .status(401)
        .json({ message: "Erreur lors de l'inscription" });
    if (count > 0) {
      return response
        .status(409)
        .json({ msg: "Ce nom d'utilisateur est déjà utilisé" });
    } else {
      newUser.save((error, user) => {
        if (error) return console.error(error);
        request.session.userId = user._id;
        response.status(200).json({
          message: "Inscription réussite ! ",
          data: {
            username: user.username,
            fullName: user.lastName + " " + user.firstName,
            session: request.session,
          },
        });
      });
    }
  });
});
