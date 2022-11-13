import Model from './model';

export const deleteAll = async () => {
	return Model.deleteMany({});
};

export const deleteById = async ({ id }) => {
	const user = await fetchById({ id });
	if (user) {
		await user.remove();
	}
	return user;
};

export const fetchAll = async (config) => {
	return Model.find(config);
};

export const fetchById = async ({ id }) => {
	return Model.findById(id);
};

export const fetchdByLogin = async ({ id }) => {
	return Model.findByLogin(id);
};

export const createOne = async (data) => {
	return Model.create(data);
};

export const updateById = async ({ id, data }) => {
	return Model.findOneAndUpdate({ _id: id }, data);
};

export const fetchFavFilmsById = async ({ id }) => {
	return Model.findById(id).populate('favFilms');
};
