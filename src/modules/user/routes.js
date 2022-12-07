import { Router } from "express";
import mongoose from "mongoose";
import { BadRequestError } from "../../utils/errors";

import * as Services from "./services";

const router = Router();

router.get("/", async (_, res, next) => {
  const users = await Services.fetchAll().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(users);
});

router.get("/:userId", async (req, res, next) => {
  const user = await Services.fetchById({
    id: req.params.userId,
  }).catch((error) => next(new BadRequestError(error)));
  return res.send(user);
});

router.put("/:userId/list", async (req, res, next) => {
  // const data = {favFilms: req.body.filmId}
  if (req.params.userId) {
    const userData = await Services.fetchById({
      id: req.params.userId,
    }).catch((error) => next(new BadRequestError(error)));

    const updatedData = userData.favFilms.includes(req.body.filmId)
      ? { favFilms: userData.favFilms }
      : {
          favFilms: userData.favFilms.concat([req.body.filmId]),
        };
    const user = await Services.updateById({
      id: req.params.userId,
      data: {
        favFilms: updatedData.favFilms,
      },
      config: { new: true },
    }).catch((error) => next(new BadRequestError(error)));

    return res.send(user);
  }

  next(new BadRequestError({ message: "missing userId" }));
});

// TO FIX
router.get("/:userId/list", async (req, res, next) => {
  const favFilms = await Services.fetchFavFilmsById({
    id: req.params.userId,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(favFilms);
});

router.delete("/:userId", async (req, res, next) => {
  const user = await Services.deleteById({
    id: req.params.userId,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(user);
});

// TO FIX
router.delete("/:userId/list/:filmId", async (req, res, next) => {
  const user = await Services.fetchById({
    id: req.params.userId,
  }).catch((error) => next(new BadRequestError(error)));

  const updatedList = user.favFilms.filter(
    (film) => film !== Number(req.params.filmId)
  );
  const updatedUser = await Services.updateById({
    id: req.params.userId,
    data: { favFilms: updatedList },
    config: { new: true },
  }).catch((error) => next(new BadRequestError(error)));
  return res.send(updatedUser);
});

export default router;
