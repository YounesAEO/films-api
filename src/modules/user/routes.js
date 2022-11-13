import { Router } from 'express';
import { BadRequestError } from '../../utils/errors';

import * as Services from './services';

const router = Router();

router.get('/', async (_, res, next) => {
	const users = await Services.fetchAll().catch((error) =>
		next(new BadRequestError(error))
	);

	return res.send(users);
});

router.get('/:userId', async (req, res, next) => {
	const user = await Services.fetchById({
		id: req.params.userId,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(user);
});

// TO FIX
router.get('/:userId/list', async (req, res, next) => {
	const user = await Services.fetchFavFilmsById({
		id: req.params.userId,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(user);
});

router.delete('/:userId', async (req, res, next) => {
	const user = await Services.deleteById({
		id: req.params.userId,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(user);
});

// TO FIX
router.delete('/:userId/list/:filmId', async (req, res, next) => {
	const user = await Services.fetchById({
		id: req.params.userId,
	}).catch((error) => next(new BadRequestError(error)));

	const updatedList = user.favFilms.filter(
		(film) => film !== req.params.filmId
	);

	const updatedUser = await Services.updateById({
		id: req.params.userId,
		data: updatedList,
	}).catch((error) => next(new BadRequestError(error)));

	return res.send(updatedUser);
});

export default router;
