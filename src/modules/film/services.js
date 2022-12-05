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

export const getMovieById = async ({ id }) => {
  const queries = buildFindIdQuery(id);
  const query = queries[0];
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};

export const getCreditsById = async ({ id }) => {
  const queries = buildFindIdQuery(id);
  const query = queries[1];
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};

export const getVideosById = async ({ id }) => {
  const queries = buildFindIdQuery(id);
  const query = queries[2];
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};

export const getReviewsById = async ({ id }) => {
  const queries = buildFindIdQuery(id);
  const query = queries[3];
  return axios(query, {
    validateStatus: (status) => {
      return status === 200;
    },
  });
};


