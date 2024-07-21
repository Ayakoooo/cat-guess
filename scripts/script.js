document.addEventListener("DOMContentLoaded", () => {
	const catNames = [
		"Bingus",
		"Beluga",
		"Floppa",
		"Hecker",
		"Angry as fuk cat",
		"Zabloing",
		"Smudge",
		"Maxwell",
		"Michael",
		"Bingus",
	];

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const shuffledCatNames = [...catNames];
	shuffle(shuffledCatNames);

	let currentQuestionIndex = 0;
	let correctAnswersCount = 0;
	const totalQuestions = shuffledCatNames.length;

	const catNameElement = document.querySelector(".cat-name");
	const catCountElement = document.querySelector(".cat-count");
	const resultElement = document.querySelector(".result");
	const retryButton = document.querySelector(".retry-button");

	function updateQuestion() {
		if (currentQuestionIndex >= totalQuestions) {
			showResult();
			return;
		}
		const currentCat = shuffledCatNames[currentQuestionIndex];
		catNameElement.textContent = currentCat;
		catCountElement.textContent = `${
			currentQuestionIndex + 1
		}/${totalQuestions}`;
	}

	function showResult() {
		// Redirect to results.html with query parameters
		window.location.href = `results.html?score=${correctAnswersCount}&total=${totalQuestions}`;
	}

	function resetGame() {
		currentQuestionIndex = 0;
		correctAnswersCount = 0;
		document.querySelector(".grid").style.display = "grid";
		resultElement.style.display = "none";
		const newShuffledCatNames = [...catNames];
		shuffle(newShuffledCatNames);
		shuffledCatNames.length = 0;
		shuffledCatNames.push(...newShuffledCatNames);
		updateQuestion();
	}

	document.querySelectorAll(".answer").forEach((answerDiv) => {
		answerDiv.addEventListener("click", () => {
			const selectedCat = answerDiv.dataset.cat;
			if (selectedCat === shuffledCatNames[currentQuestionIndex]) {
				correctAnswersCount++;
			}
			currentQuestionIndex++;
			updateQuestion();
			// Scroll to the top on mobile devices
			if (window.innerWidth <= 600) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		});
	});

	retryButton.addEventListener("click", resetGame);

	const answers = document.querySelectorAll(".answer");
	answers.forEach((answer, index) => {
		answer.dataset.cat = catNames[index];
	});

	updateQuestion();
});
