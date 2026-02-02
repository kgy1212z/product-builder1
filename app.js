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
const recoListContainer = document.querySelector("#reco-list"); // Renamed for clarity

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

const recoList = {
    Urban: [
        { name: "문화비축기지", description: "과거 석유 비축 기지에서 독특한 복합문화공간으로 재탄생한 곳입니다. 거대한 탱크 구조물 속에서 다양한 전시와 공연을 즐겨보세요." },
        { name: "정동전망대", description: "서울시청 서소문청사 13층에 숨겨진 무료 전망대입니다. 덕수궁과 정동 일대의 아름다운 풍경을 한눈에 담을 수 있습니다." },
        { name: "문래창작촌", description: "낡은 철공소 골목이 예술가들의 작업실과 아기자기한 카페로 변신한 곳입니다. 산업과 예술이 공존하는 이색적인 분위기를 느껴보세요." }
    ],
    Nature: [
        { name: "백섬해상전망대 (고성)", description: "바다 위를 걷는 듯한 스릴을 느낄 수 있는 해상 스카이워크입니다. 발밑의 푸른 바다와 동해의 탁 트인 풍경을 감상할 수 있습니다." },
        { name: "매봉산 바람의 언덕 (태백)", description: "거대한 풍력발전기와 광활한 배추밭이 어우러져 이국적인 풍경을 자아내는 곳입니다. 시원한 바람을 맞으며 스트레스를 날려보세요." },
        { name: "초곡 용굴 촛대바위길 (삼척)", description: "기암괴석 해안 절벽을 따라 조성된 아름다운 산책로입니다. 자연의 위대함과 푸른 바다를 동시에 느낄 수 있습니다." }
    ],
    Beach: [
        { name: "청굴물 (제주)", description: "바위가 자연적으로 파도를 막아주는 천연 수영장입니다. 맑고 잔잔한 물에서 안전하게 해수욕을 즐길 수 있는 숨은 명소입니다." },
        { name: "산양큰엉곶 (제주)", description: "아름다운 해안 절벽과 드넓은 초원이 어우러진 숲길입니다. 제주의 원시적인 자연을 느끼며 산책하기 좋은 곳입니다." },
        { name: "지미봉 (제주)", description: "성산일출봉과 우도가 한눈에 들어오는 환상적인 전망을 자랑하는 오름입니다. 일출, 일몰 명소로도 유명합니다." }
    ],
    Adventure: [
        { name: "서학동 예술마을 (전주)", description: "전주 한옥마을의 번잡함에서 벗어나 조용하고 예술적인 분위기를 느낄 수 있는 곳입니다. 개성 있는 공방과 갤러리를 둘러보는 재미가 있습니다." },
        { name: "한벽터널 (전주)", description: "일제강점기에 만들어진 옛 철도 터널로, 독특한 분위기 덕분에 레트로 감성의 사진을 남기기 좋은 포토 스팟입니다." },
        { name: "덕진공원 (전주)", description: "여름이면 연못을 가득 메우는 거대한 연꽃으로 유명한 시민 공원입니다. 현지인처럼 여유롭게 산책하며 휴식을 취하기 좋습니다." }
    ]
};

// State
let qnaIdx = 0;
let score = {
    Urban: 0,
    Nature: 0,
    Beach: 0,
    Adventure: 0
};
let currentResultType = '';

function calculateResult() {
    const resultType = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    currentResultType = resultType;
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

function showRecommendations() {
    resultScreen.classList.add("hidden");
    recoScreen.classList.remove("hidden");
    recoListContainer.innerHTML = '<div class="loader"></div>';

    // Simulate loading
    setTimeout(() => {
        recoListContainer.innerHTML = '';
        const hiddenGems = recoList[currentResultType];

        hiddenGems.forEach(gem => {
            const item = document.createElement('div');
            item.classList.add('reco-item');
            item.innerHTML = `<h3>${gem.name}</h3><p>${gem.description}</p>`;
            recoListContainer.appendChild(item);
        });
    }, 500); // 0.5초 로딩 시뮬레이션
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

    statusBar.style.width = `${((qnaIdx + 1) / qnaList.length) * 100}%`;
}

function begin() {
    startScreen.classList.add("hidden");
    qnaScreen.classList.remove("hidden");
    nextQuestion();
}

function retry() {
    qnaIdx = 0;
    score = { Urban: 0, Nature: 0, Beach: 0, Adventure: 0 };
    currentResultType = '';
    
    resultScreen.classList.add("hidden");
    recoScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

// Event Listeners
startBtn.addEventListener("click", begin);
retryBtn.addEventListener("click", retry);
recoBtn.addEventListener("click", showRecommendations);
backBtn.addEventListener("click", () => {
    recoScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});
