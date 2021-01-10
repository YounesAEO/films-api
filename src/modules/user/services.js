import Model from "./model";

export const deleteAll = async () => {
  return Model.deleteMany({});
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

export const createOne = async ({ username }) => {
  return Model.create({
    username,
  });
};
