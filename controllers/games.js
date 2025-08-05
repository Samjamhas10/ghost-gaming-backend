const {
  internalServerStatusCode,
  okStatusCode,
} = require("../utils/statusCodes");
const Game = require("../models/games");
const { BadRequestError } = require("../utils/errors");

// base url
const API_URL = "https://api.igdb.com/v4/games";

// helper function
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.error(res);
  res.json().then(console.error);
  return Promise.reject(`Error: ${res.status}`);
};

// get recently played games
const getGames = (req, res, next) => {
  const query = `
  fields name, summary, rating, cover.url, genres.name, platforms.name;
  where rating > 80 & rating_count > 10;
  limit 8;`;
  return fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": "1wsoeud8986qp5or7yfy7442oggme9",
      Authorization: req.headers.authorization,
    },
    body: query,
  })
    .then(checkResponse)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(internalServerStatusCode)
        .send({ message: "Internal server error" });
    });
};

// search all games
const searchGames = (req, res, next) => {
  const { gameTitle } = req.query;
  const query = `
  fields name, summary, rating, cover.url, genres.name, platforms.name;
  search "${gameTitle}";
  where rating != null;
  limit 15;
`;
  return fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": "1wsoeud8986qp5or7yfy7442oggme9",
      Authorization: req.headers.authorization,
    },
    body: query,
  })
    .then(checkResponse)
    .then((gameTitle) => {
      res.send(gameTitle);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(internalServerStatusCode)
        .send({ message: "Internal server error" });
    });
};

// save a new game
const saveGames = async (req, res, next) => {
  // destructure incoming request body
  const {
    name,
    gameId,
    summary,
    releaseDate,
    genres,
    platforms,
    coverImage,
    rating,
  } = req.body;
  const owner = req.user._id;
  try {
    const newGame = new Game({
      name,
      gameId,
      summary,
      releaseDate,
      genres,
      platforms,
      coverImage,
      rating,
    });
    const savedGame = await newGame.save();
    res.status(okStatusCode).send(savedGame);
  } catch (err) {
    console.error(err);
    res
      .status(internalServerStatusCode)
      .send({ message: "Internal server error" });
  }
};

// users saved games
const savedGames = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const games = await Game.find({ owner: userId });
    res.status(okStatusCode).send(games);
  } catch (err) {
    console.error(err);
    res
      .status(internalServerStatusCode)
      .send({ message: "Internal server error" });
  }
};

const deleteGames = async (req, res, next) => {
  const { gameId } = req.params; // identifying which game to delete
  const userId = req.user._id;
  if (!gameId) {
    return next(new BadRequestError("Invalid game"));
  }
  try {
    const deletedGame = await Game.findOneAndDelete({
      gameId: req.params.gameId,
      owner: req.user._id,
    });
    if (!deletedGame) {
      return res.status(404).send({ message: "Deleted game not found" });
    }
    return res.status(okStatusCode).send(deletedGame);
  } catch (err) {
    console.error(err);
    return res
      .status(internalServerStatusCode)
      .send({ message: "Internal server error" });
  }
};

module.exports = { getGames, searchGames, saveGames, savedGames, deleteGames };
