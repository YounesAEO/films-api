import { Router } from "express";
import { BadRequestError } from "../../utils/errors";
import { GENRES } from "../../utils/constants";

import * as Services from "./services";

const router = Router();

router.get("/", async (req, res, next) => {
  const films = await Services.fetchAll().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(films);
});

router.get("/search", async (req, res, next) => {
  // get query string parameter
  // need to choose a convention
  const keywords = req.query.keywords;
  if (keywords) {
    const response = await Services.search({ keywords }).catch((error) =>
      next(new BadRequestError(error))
    );

    return res.send({
      ...response.data,
      results: response.data.results.map((res) => {
        return {
          _id: res.id,
          title: res.title,
          synopsis: res.overview,
          coverPic: `https://image.tmdb.org/t/p/original${res.poster_path}`,
          releaseDate: res.release_date,
          totalRatings: res.vote_count,
          averageRating: res.vote_average,
        };
      }),
    });
  }

  next(new BadRequestError({ message: "missing search query" }));
});

router.get("/latest", async (req, res, next) => {
  const response = await Services.getLatest().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send({
    ...response.data,
    results: response.data.results.map((res) => {
      return {
        _id: res.id,
        title: res.title,
        synopsis: res.overview,
        coverPic: `https://image.tmdb.org/t/p/original${res.poster_path}`,
        releaseDate: res.release_date,
        totalRatings: res.vote_count,
        averageRating: res.vote_average,
        categories: GENRES.filter((genre) =>
          res.genre_ids.includes(genre.id)
        ).map((g) => g.name),
      };
    }),
  });
});

router.get("/:filmId", async (req, res, next) => {
  const id = req.params.filmId;
  const response = await Services.findById({ id }).catch((error) => next(new BadRequestError(error)));

  return res.send({
    _id: response.data.id,
    title: response.data.title,
    synopsis: response.data.overview,
    coverPic: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
    releaseDate: response.data.release_date,
    totalRatings: response.data.vote_count,
    averageRating: response.data.vote_average,
    duration: response.data.runtime,
    categories: GENRES.filter((genre) =>
      response.data.genres.find(element => element.id == genre.id)
    ).map((g) => g.name),
  });
});

router.post("/", async (req, res, next) => {
  const film = await Services.createOne({
    text: req.body.text,
    user: req.context.me._id,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(film);
});

router.delete("/:filmId", async (req, res, next) => {
  const film = await Services.deleteById({
    id: req.params.filmId,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(film);
});

export default router;
