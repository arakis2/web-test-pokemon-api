import "./styles.css";
const config = require('./config')

// Step 1 : "Hello, Pokémons ! 👋"
fetch(config.baseUrl)
  .then((res) => res.json())
  .then((res) => console.log(res));

// Step 2 : "Get JWT token 🔓"
fetch(`${config.baseUrl}/api/login`, {
  method: "POST",
  body: JSON.stringify({ username: config.credentials.userId, password: config.credentials.password }),
  headers: { "Content-type": "application/json" }
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fetchPokemonlist(token));

// Step 3 : "Get pokemon list 🎉"
const fetchPokemonlist = (token) => {
  fetch(`${config.baseUrl}/api/pokemons`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
