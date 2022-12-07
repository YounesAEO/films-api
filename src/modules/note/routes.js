import { Router } from "express";
import { BadRequestError } from "../../utils/errors";

import * as Services from "./services";

const router = Router();

router.get("/", async (req, res, next) => {
  const notes = await Services.fetchAll().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(notes);
});

router.get("/:noteId", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
  const note = await Services.createOne({
    text: req.body.text,
    user: req.context.me._id,
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
