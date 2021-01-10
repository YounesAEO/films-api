import { Router } from "express";
import { BadRequestError } from "../../utils/errors";

import * as Services from "./services";

const router = Router();

router.get("/mine", async (req, res, next) => {
  // Just to show how you can access other modules via the context
  const user = await req.context.modules.UserModule.services.fetchById({
    id: req.context.me._id,
  });
  const messages = await Services.fetchAll({
    user: user._id,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(messages);
});

router.get("/", async (_, res, next) => {
  const messages = await Services.fetchAll().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(messages);
});

router.get("/:messageId", async (req, res, next) => {
  const message = await Services.fetchById({
    id: req.params.messageId,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.post("/", async (req, res, next) => {
  const message = await Services.createOne({
    text: req.body.text,
    user: req.context.me._id,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.delete("/:messageId", async (req, res, next) => {
  const message = await Services.fetchById({
    id: req.params.messageId,
  }).catch((error) => next(new BadRequestError(error)));

  if (message) {
    await message.remove();
  }

  return res.send(message);
});

export default router;
