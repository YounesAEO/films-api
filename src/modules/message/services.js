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

export const createOne = async ({ text, user }) => {
  return Model.create({
    text,
    user,
  });
};
