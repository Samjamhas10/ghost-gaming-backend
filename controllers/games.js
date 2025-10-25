require("dotenv").config();
const fetch = require("node-fetch");
const { ACCESS_TOKEN, CLIENT_ID, API_URL } = process.env;
const {
  internalServerStatusCode,
  okStatusCode,
} = require("../utils/statusCodes");

// In-memory store for saved games per user
const savedGamesStore = {};

// Helper for fetch responses
const checkResponse = (res) => {
  if (res.ok) return res.json();
  console.error(res);
  res.json().then(console.error);
  return Promise.reject(new Error(`Error: ${res.status}`));
};

// ---------------------- IGDB Routes ---------------------- //

// Get popular games
const getGames = (req, res) => {
  const query = `
    fields name, summary, rating, cover.url, genres.name, platforms.name;
    where rating > 80 & rating_count > 10;
    limit 8;
  `;
  fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: query,
  })
    .then(checkResponse)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res
        .status(internalServerStatusCode)
        .send({ message: "Internal server error" });
    });
};

// Search games
const searchGames = (req, res) => {
  const { gameTitle } = req.query;
  const query = `
    fields name, summary, rating, cover.url, genres.name, platforms.name;
    search "${gameTitle}";
    where rating != null;
    limit 15;
  `;
  fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: query,
  })
    .then(checkResponse)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res
        .status(internalServerStatusCode)
        .send({ message: "Internal server error" });
    });
};

// ---------------------- Saved Games (In-Memory) ---------------------- //

// Save a new game for a user
const saveGames = (req, res) => {
  const username = req.user.username || "guest"; // fallback if no JWT
  const { gameId } = req.body;

  if (!savedGamesStore[username]) savedGamesStore[username] = [];
  if (!savedGamesStore[username].includes(gameId)) {
    savedGamesStore[username].push(gameId);
  }

  res
    .status(okStatusCode)
    .send({ message: "Game saved", games: savedGamesStore[username] });
};

// Get saved games for a user
const savedGames = (req, res) => {
  const username = req.user.username || "guest";
  res.status(okStatusCode).send(savedGamesStore[username] || []);
};

// Delete a saved game
const deleteGames = (req, res) => {
  const username = req.user.username || "guest";
  const { gameId } = req.params;

  if (!savedGamesStore[username]) {
    return res.status(404).send({ message: "No saved games" });
  }

  savedGamesStore[username] = savedGamesStore[username].filter(
    (id) => id !== gameId
  );
  res
    .status(okStatusCode)
    .send({ message: "Deleted", games: savedGamesStore[username] });
};

module.exports = { getGames, searchGames, saveGames, savedGames, deleteGames };
