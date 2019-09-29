const form = document.querySelector("form");
const input = document.querySelector("input");
const score = document.querySelector("#score");
const pokemonImage = document.querySelector("#pokemon");
const div = document.querySelector("div");

const showPokemon = () => {
  div.style.backgroundColor = "#f9f9f9";

  fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150)}/`)
    .then(response => response.json())
    .then(pokemon => {
      pokemonImage.setAttribute("src", pokemon.sprites.front_default);
      localStorage.setItem("rightAnswer", pokemon.name);
    });
};

const showScore = () => {
  if (localStorage.getItem("score") == null) localStorage.setItem("score", "0");

  score.innerHTML = localStorage.getItem("score");
};

const addPoint = () => {
  localStorage.setItem(
    "score",
    String(parseInt(localStorage.getItem("score")) + 100)
  );
};

const removePoint = () => {
  localStorage.setItem(
    "score",
    String(parseInt(localStorage.getItem("score")) - 100)
  );
};

const checkAnswer = evt => {
  evt.preventDefault();

  if (input.value.trim() == "") return;

  if (input.value.toLowerCase().trim() == localStorage.getItem("rightAnswer")) {
    addPoint();
    div.style.backgroundColor = "#30af2d";
  } else {
    removePoint();
    div.style.backgroundColor = "#d44343";
  }

  input.focus();
  input.value = "";
  pokemonImage.style.filter = "none";

  setTimeout(() => {
    pokemonImage.style.filter = "brightness(0)";
    showPokemon();
  }, 500);

  showScore();
};

form.onsubmit = checkAnswer;

showPokemon();
showScore();
