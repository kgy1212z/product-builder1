import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/genai@latest/dist/index.min.js";

// DOM Elements
const startScreen = document.querySelector("#start-screen");
const qnaScreen = document.querySelector("#qna-screen");
const resultScreen = document.querySelector("#result-screen");
const recoScreen = document.querySelector("#reco-screen"); // New
const startBtn = document.querySelector("#start-btn");
const retryBtn = document.querySelector("#retry-btn");
const recoBtn = document.querySelector("#reco-btn"); // New
const backBtn = document.querySelector("#back-btn"); // New
const statusBar = document.querySelector(".status-bar-inner");
const questionTitle = document.querySelector("#question-title");
const choicesContainer = document.querySelector("#choices");
const resultName = document.querySelector("#result-name");
const resultImage = document.querySelector("#result-image");
const resultDesc = document.querySelector("#result-desc");
const recoList = document.querySelector("#reco-list"); // New

// Gemini API Setup
const API_KEY = "gen-lang-client-0060094265";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Data
const qnaList = [
    {
        q: '1. 다음 중 더 끌리는 활동은 무엇인가요?',
        a: [
            { answer: '활기찬 도시의 중심가에서 쇼핑하기', type: ['Urban'] },
            { answer: '조용한 숲길을 따라 산책하기', type: ['Nature'] },
        ]
    },
    {
        q: '2. 휴가 때 선호하는 숙소 스타일은?',
        a: [
            { answer: '최신 시설을 갖춘 모던한 호텔', type: ['Urban', 'Beach'] },
            { answer: '자연 속에 위치한 아늑한 오두막이나 방갈로', type: ['Nature', 'Adventure'] },
        ]
    },
    {
        q: '3. 여행지에서 꼭 경험하고 싶은 것은?',
        a: [
            { answer: '유명 박물관이나 갤러리에서 예술 작품 감상', type: ['Urban'] },
            { answer: '에메랄드빛 바다에서 즐기는 스노클링', type: ['Beach'] },
        ]
    },
    {
        q: '4. 여행 중 식사를 한다면, 당신의 선택은?',
        a: [
            { answer: '미슐랭 스타 레스토랑의 파인 다이닝', type: ['Urban'] },
            { answer: '현지인만 아는 로컬 맛집 탐방', type: ['Adventure'] },
        ]
    },
    {
        q: '5. 저녁 시간을 보내고 싶은 곳은?',
        a: [
            { answer: '화려한 야경을 감상할 수 있는 루프탑 바', type: ['Urban', 'Beach'] },
            { answer: '모닥불 앞에서 쏟아지는 별 구경하기', type: ['Nature', 'Adventure'] },
        ]
    },
    {
        q: '6. 여행에서 얻고 싶은 것은 무엇인가요?',
        a: [
            { answer: '새로운 사람들과의 만남과 문화 교류', type: ['Urban', 'Adventure'] },
            { answer: '일상에서 벗어난 완벽한 휴식과 재충전', type: ['Nature', 'Beach'] },
        ]
    },
    {
        q: '7. 어떤 풍경을 볼 때 마음이 편안해지나요?',
        a: [
            { answer: '끝없이 펼쳐진 수평선과 하얀 모래사장', type: ['Beach'] },
            { answer: '웅장한 산맥과 끝없이 펼쳐진 초원', type: ['Nature'] },
        ]
    },
    {
        q: '8. 예상치 못한 상황이 발생했을 때 당신은?',
        a: [
            { answer: '오히려 좋아! 새로운 계획을 세우며 즐긴다', type: ['Adventure'] },
            { answer: '미리 세워둔 계획 B에 따라 침착하게 행동한다', type: ['Urban'] },
        ]
    },
    {
        q: '9. 여행 기념품으로 사고 싶은 것은?',
        a: [
            { answer: '유명 디자이너의 한정판 아이템', type: ['Urban'] },
            { answer: '그 지역 장인이 만든 독특한 수공예품', type: ['Adventure', 'Nature'] },
        ]
    },
    {
        q: '10. 다음 중 더 도전해보고 싶은 액티비티는?',
        a: [
            { answer: '짜릿한 짚라인 또는 정글 트레킹', type: ['Adventure'] },
            { answer: '해변에서 즐기는 여유로운 서핑 강습', type: ['Beach'] },
        ]
    }
];

const infoList = [
    {
        name: '서울 (Seoul)',
        type: 'Urban',
        desc: '다이내믹한 매력의 도시, 서울이 당신을 기다립니다! 고궁의 고즈넉함과 첨단 도시의 화려함이 공존하는 서울에서 다채로운 경험을 즐겨보세요. K-팝, K-푸드, K-컬처의 모든 것을 만끽할 수 있는 최고의 도시입니다.',
        img: 'https://images.unsplash.com/photo-1582294101150-1375d8623b37?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '강원도 (Gangwon-do)',
        type: 'Nature',
        desc: '대자연의 숨결이 살아있는 강원도가 당신에게 진정한 휴식을 선사합니다. 설악산의 웅장함, 동해 바다의 푸른 물결, 청정한 숲 속에서 일상의 스트레스를 잊고 평화로운 시간을 가져보세요.',
        img: 'https://images.unsplash.com/photo-1629853927645-a74c2b9f3b50?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '제주도 (Jeju-do)',
        type: 'Beach',
        desc: '한국의 아름다운 보석, 제주도가 당신을 유혹합니다! 에메랄드빛 해변에서 여유를 즐기고, 한라산의 신비로운 자연을 탐험해보세요. 맛있는 향토 음식과 독특한 문화가 어우러진 꿈의 섬입니다.',
        img: 'https://images.unsplash.com/photo-1647466175780-6060c2354728?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '전주 (Jeonju)',
        type: 'Adventure',
        desc: '전통과 맛의 고장, 전주에서 특별한 미식 모험을 시작해보세요! 한옥마을의 고즈넉한 풍경 속에서 한복을 입고 거닐거나, 길거리 음식과 막걸리 한상으로 오감을 만족시킬 수 있습니다. 새로운 문화적 경험을 원하는 당신에게 완벽한 곳입니다.',
        img: 'https://images.unsplash.com/photo-1601614749302-3c2243d46387?q=80&w=2070&auto=format&fit=crop'
    }
];

// State
let qnaIdx = 0;
let score = {
    Urban: 0,
    Nature: 0,
    Beach: 0,
    Adventure: 0
};
let currentResultCountry = ''; // To store the country name for recommendations

// Function to get hidden gems from Gemini API
async function getHiddenGems(countryName) {
    // A simple chat session to keep context
    const chat = model.startChat({
        history: [{
            role: "user",
            parts: [{ text: `너는 여행 전문가야. ${countryName}의 숨겨진 명소 3곳을 추천해 줘. 각 명소에 대해 짧고 매력적인 설명을 덧붙여 줘. 응답은 JSON 형식으로 부탁해. 예시: [{"name": "장소1", "description": "설명1"}, {"name": "장소2", "description": "설명2"}]` }],
        }],
    });

    try {
        const result = await chat.sendMessage(`추천해 줘`); // Send a follow-up message to generate content based on history
        const response = await result.response;
        const text = response.text();
        console.log("Gemini Raw Response:", text); // Debugging: log raw response

        // Attempt to parse JSON. Gemini might return additional text.
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            return JSON.parse(jsonMatch[1]);
        } else {
            // Fallback for non-JSON or malformed JSON responses
            console.warn("Gemini did not return clean JSON. Attempting fallback parse or default.");
            // Try to extract useful information if JSON parsing fails
            const fallbackGems = text.split('\n').filter(line => line.trim().length > 0 && !line.includes('```')).map(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    return { name: parts[0].trim().replace(/^- /, ''), description: parts.slice(1).join(':').trim() };
                }
                return { name: line.trim(), description: '설명 없음' };
            }).filter(gem => gem.name !== '설명 없음'); // Filter out generic error messages

            if (fallbackGems.length > 0) {
                return fallbackGems.slice(0, 3); // Return up to 3 fallback gems
            }
            return [{ name: "정보 없음", description: "AI가 추천 명소를 찾지 못했습니다." }];
        }
    } catch (error) {
        console.error("Gemini API Hidden Gems 호출 중 오류 발생:", error);
        return [{ name: "오류 발생", description: "명소 정보를 가져오는 데 실패했습니다." }];
    }
}


function calculateResult() {
    const resultType = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    return infoList.find(info => info.type === resultType);
}

function showResult() {
    qnaScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const result = calculateResult();
    currentResultCountry = result.name.split('(')[0].trim(); // Extract country name
    resultName.textContent = result.name;
    resultDesc.textContent = result.desc;
    
    const img = document.createElement('img');
    img.src = result.img;
    img.alt = result.name;
    resultImage.innerHTML = '';
    resultImage.appendChild(img);
}

async function showRecommendations() {
    resultScreen.classList.add("hidden");
    recoScreen.classList.remove("hidden");
    recoList.innerHTML = '<div class="loader"></div>'; // Show loader

    const hiddenGems = await getHiddenGems(currentResultCountry);
    recoList.innerHTML = ''; // Clear loader

    if (hiddenGems.length > 0 && hiddenGems[0].name !== "정보 없음") {
        hiddenGems.forEach(gem => {
            const item = document.createElement('div');
            item.classList.add('reco-item');
            item.innerHTML = `<h3>${gem.name}</h3><p>${gem.description}</p>`;
            recoList.appendChild(item);
        });
    } else {
        recoList.innerHTML = `<div class="reco-item"><p>${hiddenGems[0].description}</p></div>`;
    }
}

function handleChoiceClick(event) {
    const selectedTypes = JSON.parse(event.currentTarget.dataset.type);
    selectedTypes.forEach(type => {
        score[type] += 1;
    });

    qnaIdx++;
    if (qnaIdx === qnaList.length) {
        showResult();
    } else {
        nextQuestion();
    }
}

function nextQuestion() {
    const currentQ = qnaList[qnaIdx];
    questionTitle.textContent = currentQ.q;
    choicesContainer.innerHTML = '';

    currentQ.a.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('choice-btn');
        button.textContent = choice.answer;
        button.dataset.type = JSON.stringify(choice.type);
        button.addEventListener('click', handleChoiceClick);
        choicesContainer.appendChild(button);
    });

    statusBar.style.width = `${((qnaIdx + 1) / qnaList.length) * 100}%`; // +1 for current question
}

function begin() {
    startScreen.classList.add("hidden");
    qnaScreen.classList.remove("hidden");
    nextQuestion();
}

function retry() {
    // Reset state
    qnaIdx = 0;
    score = { Urban: 0, Nature: 0, Beach: 0, Adventure: 0 };
    currentResultCountry = '';
    
    resultScreen.classList.add("hidden");
    recoScreen.classList.add("hidden"); // Ensure reco screen is hidden too
    startScreen.classList.remove("hidden");
}

// Event Listeners
startBtn.addEventListener("click", begin);
retryBtn.addEventListener("click", retry);
recoBtn.addEventListener("click", showRecommendations); // New
backBtn.addEventListener("click", () => { // New
    recoScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});
