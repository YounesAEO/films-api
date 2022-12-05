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
  const response = await Services.getMovieById({ id }).catch((error) => next(new BadRequestError(error)));
  const response_credits = await Services.getCreditsById({ id }).catch((error) => next(new BadRequestError(error)));
  const response_videos = await Services.getVideosById({ id }).catch((error) => next(new BadRequestError(error)));
  const response_reviews = await Services.getReviewsById({ id }).catch((error) => next(new BadRequestError(error)));

  var directors = response_credits.data.crew.filter(element => element.job === "Director").map(element => element.name);

  var actors = response_credits.data.cast.filter(element => element.known_for_department === "Acting").map(element => element.name);

  if (actors.length > 5) {
    actors = actors.slice(0, 5);
  }

  var videos = response_videos.data.results.map(element => "https://www.youtube.com/embed/" + element.key);

  if (videos.length > 2) {
    videos = videos.slice(0, 2);
  }

  const reviews = response_reviews.data.results.map(element => {
    return {
      name: element.author,
      content: element.content,
      date: element.created_at
    };
  })

  return res.send({
    _id: response.data.id,
    title: response.data.title,
    synopsis: response.data.overview,
    coverPic: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
    releaseDate: response.data.release_date,
    totalRatings: response.data.vote_count,
    avarageRating: Math.round((response.data.vote_average) / 2),
    actors: actors,
    ...(directors.length > 0) && { director: directors[0] },
    ...(reviews) && { reviews: reviews },
    trailerURL: videos,
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
