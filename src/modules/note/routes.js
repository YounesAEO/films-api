import { Router } from "express";
import { BadRequestError } from "../../utils/errors";

import * as Services from "./services";

const router = Router();

router.get("/", async (req, res, next) => {
  const filmId = req.query.filmId;
  const userId = req.query.userId;
  const query = userId && filmId ? { filmId, userId } : {};
  const notes = await Services.fetchAll(query).catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(notes);
});

router.get("/:noteId", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
  const note = await Services.createOne(req.body).catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(note);
});

router.put("/:noteId", async (req, res, next) => {
  const note = await Services.updateById({
    id: req.params.noteId,
    data: req.body,
    config: { new: true },
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(note);
});

router.delete("/:noteId", async (req, res, next) => {
  const note = await Services.deleteById({
    id: req.params.noteId,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(note);
});

export default router;
