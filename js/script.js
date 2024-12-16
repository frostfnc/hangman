// Obtenim els elements del DOM
const word = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const timer = document.getElementById("timer");
const attempts = document.getElementById("attempts");
const errors = document.getElementById("errors");
const endGameMessage = document.getElementById("end-game-message");
const messageText = document.getElementById("message-text");
const restartButton = document.getElementById("restart-button");
const hangmanImage = document.getElementById("hangman-image");
const letters = document.querySelectorAll(".row .letter");
const categorySelect = document.getElementById("category-select");

// Paraules per categories
const words = {
	tecnologia: ["ordenador", "teclado", "pantalla", "raton", "internet"],
	programacion: ["javascript", "codigo", "funcion", "variable", "constante"],
	astronomia: ["estrella", "planeta", "galaxia", "cometa", "asteroide"],
	peliculas: ["inception", "matrix", "gladiator", "avatar", "titanic"],
};

// Variables del joc
let secretWord = "";
let remainingAttempts = 7;
let errorCount = 0;
let gameStarted = false;
let countdown;
let clickTimer; // Temporitzador per al clic

// Inicialitzem el joc quan el document està carregat
document.addEventListener("DOMContentLoaded", () => {
	restartButton.addEventListener("click", startGame);
});

// Funció per iniciar el joc
function startGame() {
	resetGame();
	const selectedCategory = categorySelect.value; // Obtenim la categoria seleccionada
	showWordInUnderscores(selectedCategory);
	endGameMessage.classList.add("hidden");
}

// Funció per reiniciar el joc
function resetGame() {
	secretWord = "";
	remainingAttempts = 7;
	errorCount = 0;
	gameStarted = false;
	timer.textContent = "00:05";
	attempts.textContent = remainingAttempts;
	errors.textContent = errorCount;
	word.innerHTML = "";
	hangmanImage.src = "assets/img/Stage-0.jpg";
	clearInterval(countdown);
	clearTimeout(clickTimer); // Reiniciem el temporitzador de clic
	letters.forEach((letter) => {
		letter.classList.remove("correct", "incorrect");
	});
}

// Funció per mostrar la paraula amb guions baixos
function showWordInUnderscores(category) {
	const wordList = words[category];
	const secretword = wordList[Math.floor(Math.random() * wordList.length)];
	secretWord = secretword;
	const underscores = secretword
		.split("")
		.map(() => "_")
		.join(" ");
	word.innerHTML = underscores;
}

// Event listener per les lletres del teclat
keyboard.addEventListener("click", function (e) {
	if (e.target.classList.contains("letter") && !(e.target.classList.contains("incorrect") || e.target.classList.contains("correct"))) {
		if (!gameStarted) {
			const selectedCategory = categorySelect.value; // Obtenim la categoria seleccionada
			showWordInUnderscores(selectedCategory);
			startTimer(5); // Iniciem el temporitzador de 5 segons
			gameStarted = true;
		} else {
			resetClickTimer(); // Reiniciem el temporitzador de clic
		}
		const clickedLetter = e.target.innerHTML.toLowerCase();
		checkLetterInWord(clickedLetter, e);
	}
});

// Funció per comprovar si la lletra està a la paraula secreta
function checkLetterInWord(letter, e) {
	let found = false;
	let newDisplay = word.innerHTML.split(" ");

	for (let i = 0; i < secretWord.length; i++) {
		if (secretWord[i] === letter) {
			newDisplay[i] = letter;
			found = true;
		}
	}

	word.innerHTML = newDisplay.join(" ");

	if (found) {
		e.target.classList.add("correct");
	} else {
		e.target.classList.add("incorrect");
		remainingAttempts--;
		errorCount++;
		attempts.innerHTML = remainingAttempts;
		errors.innerHTML = errorCount;
		updateHangmanImage();
	}

	if (remainingAttempts <= 0) {
		endGame(`¡Has perdut! La paraula era: ${secretWord}`, "red"); // Missatge de derrota
	} else if (!newDisplay.includes("_")) {
		endGame("¡Has guanyat!", "green"); // Missatge de victòria
	}
}

// Funció per actualitzar la imatge del penjat
function updateHangmanImage() {
	const stage = Math.min(errorCount, 7); // Assegura que l'etapa no superi 7
	hangmanImage.src = `assets/img/Stage-${stage}.jpg`;
}

// Funció per iniciar el temporitzador
function startTimer(seconds) {
	let remainingTime = seconds * 1000;
	timer.textContent = `00:${seconds < 10 ? "0" : ""}${seconds}`;

	countdown = setInterval(() => {
		remainingTime -= 1000;
		const secondsLeft = Math.floor(remainingTime / 1000);
		timer.textContent = `00:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

		if (remainingTime <= 0) {
			clearInterval(countdown);
			endGame(`¡Temps esgotat! La paraula era: ${secretWord}`, "red"); // Missatge de temps esgotat
		}
	}, 1000);
}

// Funció per reiniciar el temporitzador de clic
function resetClickTimer() {
	clearInterval(countdown); // Aturem el temporitzador actual
	startTimer(5); // Reiniciem el temporitzador a 5 segons
}

// Funció per finalitzar el joc
function endGame(message, color) {
	messageText.textContent = message;
	messageText.style.color = color;
	endGameMessage.classList.remove("hidden");
	gameStarted = false; // Assegura que el joc s'aturi
	clearInterval(countdown);
	clearTimeout(clickTimer); // Aturem el temporitzador de clic
}
