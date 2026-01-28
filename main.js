const URL = "https://teachablemachine.withgoogle.com/models/av2b6vQnL/";

let model, webcam, labelContainer, maxPredictions;
let playerScore = 0;
let computerScore = 0;
let isPlaying = false;
const choices = ["Rock", "Paper", "Scissors"];

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; 
    webcam = new tmImage.Webcam(200, 200, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { 
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
        playerScore++;
        return "You win!";
    }
    computerScore++;
    return "You lose!";
}

async function predict() {
    if (isPlaying) {
        return;
    }

    const prediction = await model.predict(webcam.canvas);
    let highestPrediction = { className: "", probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestPrediction.probability) {
            highestPrediction = prediction[i];
        }
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    if (highestPrediction.probability > 0.9) {
        isPlaying = true;
        const playerChoice = highestPrediction.className;
        const computerChoice = getComputerChoice();
        const result = getWinner(playerChoice, computerChoice);

        document.getElementById("computer-choice").innerHTML = `Computer chose: ${computerChoice}`;
        document.getElementById("result").innerHTML = result;
        document.getElementById("score").innerHTML = `Player: ${playerScore} - Computer: ${computerScore}`;

        setTimeout(() => {
            isPlaying = false;
        }, 2000); // Wait 2 seconds before the next round
    }
}