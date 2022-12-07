import Model from "./model";

export const deleteAll = async () => {
  return Model.deleteMany({});
};

export const deleteById = async ({ id }) => {
  const film = await fetchById({ id });
  if (film) {
    await film.remove();
  }
  return film;
};

export const fetchAll = async (config) => {
  return Model.find(config);
};

export const fetchById = async ({ id }) => {
  return Model.findById(id);
};

export const createOne = async (data) => {
  return Model.create(data);
};

export const updateById = async ({ id, data, config }) => {
  return Model.findOneAndUpdate({ _id: id }, data, config);
};
