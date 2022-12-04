import Model from "./model";
import {
  buildSearchMovieQuery,
  buildGetLatestMoviesQuery,
  buildFindIdQuery
} from "../../utils/build-query";
import axios from "axios";

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

export const search = async (data) => {
  const { keywords } = data;
  const query = buildSearchMovieQuery(keywords);
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};

export const getLatest = async () => {
  const query = buildGetLatestMoviesQuery();
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};

export const findById = async ({ id }) => {
  const query = buildFindIdQuery(id);
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};
