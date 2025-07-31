const {
  internalServerStatusCode,
  okStatusCode,
} = require("../utils/statusCodes");
// const { BadRequestError } = require("../utils/bad-request-err");
const Game = require("../models/games");

// base url
const API_URL = "https://api.igdb.com/v4/games";

// helper function
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.log(res);
  res.json().then(console.log);
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
      console.log(err);
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
      console.log(err);
      res
        .status(internalServerStatusCode)
        .send({ message: "Internal server error" });
    });
};

// save a new game
const saveGames = async (req, res, next) => {
  // destructure incoming request body
  // Get the required fields from the request body
  // like the coverImage, owner, etc
  const { name, date, userId } = req.body;
  //create new game instance
  // use the required fields to create the saved game
  //PS enable auth middleware
  const newGame = new Game({ name, date, userId });
  try {
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
  const { userId } = req.query;
  if (!userId) {
    return next(new BadRequestError("Invalid data"));
  }
  try {
  } catch (err) {
    console.log(err);
    res
      .status(internalServerStatusCode)
      .send({ message: "Internal server error" });
  }
  return next(err);
};

const deleteGames = async (req, res, next) => {
  const { gameId } = req.params;
  const userId = req.user._id;
  const deletedGame = await findByIdAndDelete(gameId);
  if (!gameId) {
    return next(new BadRequestError("Invalid data"));
  }
  try {
    if (!deletedGame) {
      return res.status(404).send({ message: "Deleted game not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(internalServerStatusCode)
      .send({ message: "Internal server error" });
  }
  return next(err);
};

module.exports = { getGames, searchGames, saveGames, savedGames, deleteGames };
