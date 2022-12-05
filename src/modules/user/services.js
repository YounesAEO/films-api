import Model from "./model";
import FilmModule from "../film";
import axios from "axios";
import { buildFindIdQuery } from "../../utils/build-query";
import { GENRES } from "../../utils/constants";

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

export const updateById = async ({ id, data, config }) => {
  return Model.findOneAndUpdate({ _id: id }, data, config);
};

export const fetchFavFilmsById = async ({ id }) => {
  const user = await fetchById({ id });
  if (user) {
    const films = await Promise.all(
      user.favFilms.map(async (filmId) => {
        const query = buildFindIdQuery(filmId)[0];
        const response = await axios.get(query, {
          validateStatus: (status) => {
            return status === 200;
          },
        });
        return {
          _id: response.data.id,
          title: response.data.title,
          synopsis: response.data.overview,
          coverPic: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
          releaseDate: response.data.release_date,
          totalRatings: response.data.vote_count,
          averageRating: response.data.vote_average,
          categories: GENRES.filter((genre) =>
            response.data.genres.find((element) => element.id == genre.id)
          ).map((g) => g.name),
        };
      })
    );

    return films;
  }

  throw Error("No User");
};
