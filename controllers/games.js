const API_URL = "https://api.igdb.com/v4/games";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.log(res);
  res.json().then(console.log);
  return Promise.reject(`Error: ${res.status}`);
};

const getGames = (req, res, next) => {
  const query = `
  fields name, summary, rating, cover.url, genres.name, platforms.name;
  where rating > 80 & rating_count > 10;
  limit 20;`;

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
    });
};

module.exports = { getGames };
