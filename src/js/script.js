const containerWord = document.getElementById("container-word");
const containerKeyboard = document.getElementById("container-keyboard");
const containerTime = document.getElementById("container-time");
const containerScore = document.getElementById("container-score");
const letters = document.querySelectorAll(".row .letter:not(.correct):not(.incorrect)");

console.log(letters);

const words = [
	"hola",
	"mundo",
	"programacion",
	"javascript",
	"ordenador",
	"teclado",
	"pantalla",
	"raton",
	"internet",
	"desarrollador",
	"codigo",
	"funcion",
	"variable",
	"constante",
	"objeto",
	"estrella",
	"planeta",
	"galaxia",
	"cometa",
	"asteroide",
	"nebulosa",
	"supernova",
	"constelacion",
	"cosmos",
	"universo",
	"orbita",
	"gravedad",
	"luz",
	"energia",
	"materia",
	"antimateria",
	"quasar",
	"pulsares",
	"exoplaneta",
];

window.addEventListener("load", function () {
	showWordInUnderscores();
});

let word2 = "";

function showWordInUnderscores() {
	const word = words[Math.floor(Math.random() * words.length)];
	word2 = word;
	console.log(word);
	const underscores = word
		.split("")
		.map(() => "_")
		.join(" ");
	containerWord.innerHTML = underscores;
}

containerKeyboard.addEventListener("click", function (e) {
	if (e.target.classList.contains("letter") && !(e.target.classList.contains("incorrect") || e.target.classList.contains("correct"))) {
		console.log(e.target.innerHTML);
		let clickedLetter = e.target.innerHTML;
		clickedLetter = clickedLetter.toLowerCase();
		console.log(clickedLetter);
		checkLetterInWord(clickedLetter, e);
	}
});

function checkLetterInWord(letter, e) {
	let found = false;
	let newDisplay = containerWord.innerHTML.split(" ");

	for (let i = 0; i < word2.length; i++) {
		if (word2[i] === letter) {
			newDisplay[i] = letter;
			found = true;
		}
	}

	containerWord.innerHTML = newDisplay.join(" ");

	if (found) {
		e.target.classList.add("correct");
	} else {
		e.target.classList.add("incorrect");
	}
}
