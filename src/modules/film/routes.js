import { Router } from 'express';
import { BadRequestError } from '../../utils/errors';

import * as Services from './services';

const router = Router();

router.get('/', async (_, res, next) => {
	const films = await Services.fetchAll().catch((error) =>
		next(new BadRequestError(error))
	);

	return res.send(films);
});

router.get('/:filmId', async (req, res, next) => {
	const film = await Services.fetchById({
		id: req.params.filmId,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(film);
});

router.post('/', async (req, res, next) => {
	const film = await Services.createOne({
		text: req.body.text,
		user: req.context.me._id,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(film);
});

router.delete('/:filmId', async (req, res, next) => {
	const film = await Services.deleteById({
		id: req.params.filmId,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(film);
});

export default router;
