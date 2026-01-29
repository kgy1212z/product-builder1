// --- Common ---
const KRW_TO_USD_RATE = 1300;

function formatCurrency(amountInKRW) {
    const amountInUSD = amountInKRW / KRW_TO_USD_RATE;
    return `₩${amountInKRW.toLocaleString('ko-KR')} ($${amountInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
}


// --- Payslip Generator ---
class PayslipComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setData(data) {
        const {
            employeeName, employeeId, workingDays, 
            dailyWage, hourlyWage, 
            earnedIncomeTax, residentTax, healthInsurance, nationalPension, employmentInsurance,
            totalEarnings, totalDeductions, netPay
        } = data;

        this.shadowRoot.innerHTML = `
            <style>
                .payslip { border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9; }
                .payslip h2 { text-align: center; color: #333; }
                .payslip-section { margin-bottom: 15px; }
                .payslip-section h3 { color: #34495e; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .payslip-section div { display: flex; justify-content: space-between; padding: 5px 0; }
                .total { font-weight: bold; }
                .net-pay { text-align: center; margin-top: 20px; font-size: 1.5rem; font-weight: bold; }
            </style>
            <div class="payslip">
                <h2>급여 명세서</h2>
                <div class="payslip-section">
                    <h3>직원 정보</h3>
                    <div><span>이름:</span> <span>${employeeName}</span></div>
                    <div><span>사번:</span> <span>${employeeId}</span></div>
                    <div><span>근무일수:</span> <span>${workingDays}</span></div>
                </div>
                <div class="payslip-grid">
                    <div class="payslip-section">
                        <h3>수입</h3>
                        <div><span>일급:</span> <span>${formatCurrency(dailyWage)}</span></div>
                        <div><span>정규 시급:</span> <span>${formatCurrency(hourlyWage)}</span></div>
                        <div class="total"><span>총 수입:</span> <span>${formatCurrency(totalEarnings)}</span></div>
                    </div>
                    <div class="payslip-section">
                        <h3>공제</h3>
                        <div><span>소득세:</span> <span>${formatCurrency(earnedIncomeTax)}</span></div>
                        <div><span>주민세:</span> <span>${formatCurrency(residentTax)}</span></div>
                        <div><span>건강보험:</span> <span>${formatCurrency(healthInsurance)}</span></div>
                        <div><span>국민연금:</span> <span>${formatCurrency(nationalPension)}</span></div>
                        <div><span>고용보험:</span> <span>${formatCurrency(employmentInsurance)}</span></div>
                        <div class="total"><span>총 공제:</span> <span>${formatCurrency(totalDeductions)}</span></div>
                    </div>
                </div>
                <div class="net-pay"><span>실수령액:</span> <span>${formatCurrency(netPay)}</span></div>
            </div>
        `;
    }
}

if (!customElements.get('payslip-component')) {
    customElements.define('payslip-component', PayslipComponent);
}

document.getElementById('payslip-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeName = document.getElementById('employee-name').value;
    const employeeId = document.getElementById('employee-id').value;
    const workingDays = parseFloat(document.getElementById('working-days').value) || 0;
    const dailyWage = parseFloat(document.getElementById('daily-wage').value) || 0;
    const hourlyWage = parseFloat(document.getElementById('hourly-wage').value) || 0;
    const earnedIncomeTax = parseFloat(document.getElementById('earned-income-tax').value) || 0;
    const residentTax = parseFloat(document.getElementById('resident-tax').value) || 0;
    const healthInsurance = parseFloat(document.getElementById('health-insurance').value) || 0;
    const nationalPension = parseFloat(document.getElementById('national-pension').value) || 0;
    const employmentInsurance = parseFloat(document.getElementById('employment-insurance').value) || 0;

    const totalEarnings = (dailyWage * workingDays) + hourlyWage; // This is a simplified calculation
    const totalDeductions = earnedIncomeTax + residentTax + healthInsurance + nationalPension + employmentInsurance;
    const netPay = totalEarnings - totalDeductions;

    const payslipContainer = document.getElementById('payslip-container');
    payslipContainer.innerHTML = '';
    const payslip = document.createElement('payslip-component');
    payslip.setData({
        employeeName,
        employeeId,
        workingDays,
        dailyWage,
        hourlyWage,
        earnedIncomeTax,
        residentTax,
        healthInsurance,
        nationalPension,
        employmentInsurance,
        totalEarnings,
        totalDeductions,
        netPay
    });
    payslipContainer.appendChild(payslip);
});


// --- Rock, Paper, Scissors Game ---
const gameContainer = document.getElementById('game');
if (gameContainer) {
    const URL = "https://teachablemachine.withgoogle.com/models/av2b6vQnL/";

    let model, webcam, labelContainer, maxPredictions;
    let playerScore = 0;
    let computerScore = 0;
    let isPlaying = false;
    const choices = ["Rock", "Paper", "Scissors"];

    async function initGame() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(200, 200, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").innerHTML = '';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) { 
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        if (webcam) {
            webcam.update(); 
            await predict();
            window.requestAnimationFrame(loop);
        }
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
        if (isPlaying || !model) {
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
            }, 2000);
        }
    }

    document.getElementById('start-game').addEventListener('click', initGame);
}