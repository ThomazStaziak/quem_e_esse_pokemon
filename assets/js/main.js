const form = document.querySelector("form");
const input = document.querySelector("input");
const score = document.querySelector("span");
const img = document.querySelector("img");
const div = document.querySelector("div");

let scoreHolder = 0;

const showPokemon = () => {
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 149 + 1)}`
  )
    .then(response => response.json())
    .then(pokemon => {
      const { sprites, name } = pokemon;
      setImage(sprites.front_default, img);
      localStorage.setItem("rightAnswer", name);
    });
};

const showScore = () => {
  return (score.innerHTML = scoreHolder);
};

const addPoint = () => {
  return (scoreHolder += 100);
};

const removePoint = () => {
  return (scoreHolder -= 100);
};

const checkAnswer = evt => {
  evt.preventDefault();

  if (input.value.trim() == "") return;

  if (input.value.toLowerCase().trim() == localStorage.getItem("rightAnswer")) {
    addPoint();
    setBackgroundColor("#30af2d", div);
  } else {
    removePoint();
    setBackgroundColor("#d44343", div);
  }

  input.focus();
  input.value = "";
  toggleFilter(false, img);

  setTimeout(() => {
    toggleFilter(true, img);
    setBackgroundColor("#f9f9f9", div);
    showPokemon();
  }, 1000);

  showScore();
};

const toggleFilter = (active, img) => {
  if (!active) return (img.style.filter = "none");
  return (img.style.filter = "brightness(0)");
};

const setBackgroundColor = (color, elem) => {
  return (elem.style.backgroundColor = color);
};

const setImage = (src, img) => {
  img.setAttribute("src", src);
};

window.onload = () => {
  input.focus();
  showPokemon();
  showScore();
};
form.onsubmit = checkAnswer;
