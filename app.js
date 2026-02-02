// DOM Elements
const startScreen = document.querySelector("#start-screen");
const qnaScreen = document.querySelector("#qna-screen");
const resultScreen = document.querySelector("#result-screen");
const startBtn = document.querySelector("#start-btn");
const retryBtn = document.querySelector("#retry-btn");
const statusBar = document.querySelector(".status-bar-inner");
const questionTitle = document.querySelector("#question-title");
const choicesContainer = document.querySelector("#choices");
const resultName = document.querySelector("#result-name");
const resultImage = document.querySelector("#result-image");
const resultDesc = document.querySelector("#result-desc");

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
        name: '뉴욕 (New York)',
        type: 'Urban',
        desc: '잠들지 않는 도시, 뉴욕이 당신을 기다립니다! 화려한 스카이라인, 세계적인 박물관, 끝없는 쇼핑의 즐거움 속에서 당신의 열정을 재발견하게 될 거예요. 브로드웨이의 뮤지컬과 센트럴파크의 여유를 동시에 즐길 수 있는 최고의 도시입니다.',
        img: 'https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '스위스 (Switzerland)',
        type: 'Nature',
        desc: '대자연의 품에서 진정한 힐링을 원한다면 스위스가 정답입니다. 웅장한 알프스 산맥, 에메랄드빛 호수, 푸른 초원이 어우러진 그림 같은 풍경 속에서 하이킹을 즐겨보세요. 복잡한 일상은 잊고 자연과 하나 되는 평화로운 시간을 가질 수 있습니다.',
        img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '발리 (Bali)',
        type: 'Beach',
        desc: '휴양과 즐거움이 공존하는 파라다이스, 발리! 아름다운 해변에 누워 일광욕을 즐기거나, 요가와 명상으로 심신의 안정을 찾아보세요. 서핑, 스노클링 등 다양한 해양 액티비티와 함께라면 지루할 틈이 없을 거예요.',
        img: 'https://images.unsplash.com/photo-1540202404-1b927b016f5a?q=80&w=2070&auto=format&fit=crop'
    },
    {
        name: '페루 (Peru)',
        type: 'Adventure',
        desc: '고대 잉카 문명의 신비를 찾아 떠나는 모험, 페루가 당신을 부릅니다! 경이로운 마추픽추, 미스터리한 나스카 라인 등 상상 이상의 풍경들이 당신을 기다리고 있습니다. 평범한 여행이 지겹다면, 짜릿한 모험으로 가득한 페루로 떠나보세요.',
        img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
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

function calculateResult() {
    // Find the type with the highest score
    const resultType = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    return infoList.find(info => info.type === resultType);
}

function showResult() {
    qnaScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const result = calculateResult();
    resultName.textContent = result.name;
    resultDesc.textContent = result.desc;
    
    const img = document.createElement('img');
    img.src = result.img;
    img.alt = result.name;
    resultImage.innerHTML = '';
    resultImage.appendChild(img);
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

    statusBar.style.width = `${(qnaIdx / qnaList.length) * 100}%`;
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
    
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

startBtn.addEventListener("click", begin);
retryBtn.addEventListener("click", retry);