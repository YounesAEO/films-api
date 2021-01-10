import { Router } from "express";
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

export default router;
