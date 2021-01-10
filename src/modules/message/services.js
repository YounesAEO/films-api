import Model from "./model";

export const deleteAll = async () => {
  return Model.deleteMany({});
};

export const deleteById = async ({ id }) => {
  const message = await fetchById({ id });
  if (message) {
    await message.remove();
  }
  return message;
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
