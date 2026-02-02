// DOM Elements
const regionScreen = document.querySelector("#region-selection-screen");
const qnaScreen = document.querySelector("#qna-screen");
const resultScreen = document.querySelector("#result-screen");
const retryBtn = document.querySelector("#retry-btn");
const statusBar = document.querySelector(".status-bar-inner");
const questionTitle = document.querySelector("#question-title");
const choicesContainer = document.querySelector("#choices");
const resultName = document.querySelector("#result-name");
const resultDesc = document.querySelector("#result-desc");

const NUM_QUESTIONS = 3; // Number of questions

// New Data Structures
const allDestinations = {
    '경기도': [
        { name: '수원 화성', desc: '유네스코 세계문화유산인 수원 화성의 성곽길을 따라 걸으며 역사 속으로 시간 여행을 떠나보세요.', tags: ['history', 'walk', 'urban'] },
        { name: '아침고요수목원', desc: '계절마다 다른 색의 옷을 입는 아름다운 정원입니다. 조용히 산책하며 자연 속에서 힐링을 경험하세요.', tags: ['nature', 'walk', 'scenery'] },
        { name: '헤이리 예술마을', desc: '예술가들의 작업실, 갤러리, 개성 넘치는 카페가 모여있는 곳입니다. 예술적인 영감을 얻고 싶은 당신에게 추천합니다.', tags: ['art', 'cafe', 'walk'] }
    ],
    '강원도': [
        { name: '설악산 국립공원', desc: '대한민국 최고의 명산, 설악산의 웅장한 풍경에 빠져보세요. 등산을 통해 성취감을 느끼고 싶은 당신에게 완벽한 곳입니다.', tags: ['nature', 'scenery', 'activity', 'challenge'] },
        { name: '강릉 경포해변', desc: '끝없이 펼쳐진 동해바다를 보며 마음의 평화를 찾아보세요. 해변 근처의 예쁜 카페에서 즐기는 커피 한 잔의 여유는 덤입니다.', tags: ['beach', 'relax', 'cafe', 'sea'] },
        { name: '양양 서피비치', desc: '서핑과 힙한 분위기를 즐길 수 있는 젊음의 해변입니다. 신나는 음악과 함께 자유로운 분위기를 만끽하고 싶은 당신에게 추천합니다.', tags: ['beach', 'activity', 'young', 'sea'] }
    ],
    '충청북도': [
        { name: '단양 만천하스카이워크', desc: '남한강 절벽 위에서 하늘을 걷는 듯한 짜릿함을 느껴보세요. 아름다운 풍경과 스릴을 동시에 즐길 수 있습니다.', tags: ['scenery', 'activity', 'thrill'] },
        { name: '청남대', desc: '한때 대통령의 별장이었던 비밀스러운 장소입니다. 잘 가꿔진 정원을 산책하며 여유로운 시간을 보내보세요.', tags: ['history', 'walk', 'relax'] },
        { name: '충주호 유람선', desc: '내륙의 바다라고 불리는 충주호에서 유람선을 타며 그림 같은 풍경을 감상해보세요. 잔잔한 물결 위에서 평온함을 느낄 수 있습니다.', tags: ['nature', 'relax', 'scenery'] }
    ],
    '충청남도': [
        { name: '보령 대천해수욕장', desc: '젊음과 열기가 가득한 서해안 최대의 해수욕장입니다. 신나는 머드 축제와 다양한 해양 스포츠를 즐겨보세요.', tags: ['beach', 'activity', 'young'] },
        { name: '부여 궁남지', desc: '백제 무왕의 사랑 이야기가 깃든 대한민국 최초의 인공 연못입니다. 특히 여름밤, 연꽃 사이로 비치는 조명이 낭만적인 분위기를 자아냅니다.', tags: ['history', 'walk', 'scenery', 'night', 'romance'] },
        { name: '서산 해미읍성', desc: '조선시대의 모습을 고스란히 간직한 읍성입니다. 성곽을 따라 걸으며 역사의 숨결을 느끼고, 근처 맛집에서 맛있는 음식을 즐겨보세요.', tags: ['history', 'walk', 'food'] }
    ],
    '전라북도': [
        { name: '전주 한옥마을', desc: '맛과 멋의 고장, 전주에서 오감이 즐거운 미식 모험을 시작해보세요! 한복을 입고 고즈넉한 한옥마을을 거닐며 다양한 길거리 음식을 맛볼 수 있습니다.', tags: ['history', 'food', 'activity', 'walk'] },
        { name: '진안 마이산', desc: '두 개의 봉우리가 말의 귀를 닮았다고 해서 이름 붙여진 신비로운 산입니다. 수수께끼 같은 돌탑들을 보며 자연의 경이로움을 느껴보세요.', tags: ['nature', 'scenery', 'mystery'] },
        { name: '군산 시간여행마을', desc: '일제강점기 시절의 건축물들이 남아있어, 마치 시간을 거슬러 올라간 듯한 느낌을 주는 곳입니다. 근대 의상을 입고 특별한 사진을 남겨보세요.', tags: ['history', 'walk', 'photo'] }
    ],
    '전라남도': [
        { name: '여수 밤바다', desc: '낭만적인 버스킹 음악과 화려한 조명이 어우러진 여수의 밤바다를 거닐어보세요. 낭만적인 분위기에 흠뻑 취하고 싶은 당신에게 최고의 장소입니다.', tags: ['sea', 'night', 'romance', 'urban'] },
        { name: '순천만 국가정원', desc: '세계 각국의 아름다운 정원을 한곳에 모아놓은 거대한 힐링 공간입니다. 계절마다 피어나는 다채로운 꽃들 사이를 거닐며 지친 마음에 휴식을 선물하세요.', tags: ['nature', 'walk', 'scenery', 'relax'] },
        { name: '담양 죽녹원', desc: '하늘을 향해 뻗은 대나무 숲 사이를 걸으며 상쾌한 공기를 마셔보세요. 복잡한 생각을 잠시 잊고 싶을 때, 최고의 힐링을 선사할 것입니다.', tags: ['nature', 'walk', 'relax'] }
    ],
    '경상북도': [
        { name: '경주 대릉원/황리단길', desc: '신라의 역사가 살아 숨 쉬는 경주에서 특별한 시간 여행을 즐겨보세요. 고분 사이를 산책하고, 황리단길의 아기자기한 카페와 맛집을 탐방하는 재미가 있습니다.', tags: ['history', 'food', 'walk', 'photo'] },
        { name: '안동 하회마을', desc: '전통적인 유교 문화와 고택의 아름다움을 느낄 수 있는 유네스코 세계유산입니다. 시간이 멈춘 듯한 마을에서 진정한 한국의 미를 느껴보세요.', tags: ['history', 'tradition', 'relax'] },
        { name: '포항 스페이스워크', desc: '마치 구름 위를 걷는 듯한, 짜릿하고 환상적인 경험을 할 수 있는 체험형 조형물입니다. 포항의 아름다운 풍경을 360도로 감상해보세요.', tags: ['scenery', 'thrill', 'photo', 'sea'] }
    ],
    '경상남도': [
        { name: '통영 루지/케이블카', desc: '짜릿한 루지를 타고 트랙을 질주하거나, 케이블카를 타고 한려수도의 절경을 감상해보세요. 활동적인 여행을 원하는 당신에게 안성맞춤입니다.', tags: ['activity', 'scenery', 'thrill', 'sea'] },
        { name: '거제 바람의 언덕', desc: '푸른 바다와 초원, 커다란 풍차가 어우러져 그림 같은 풍경을 만들어내는 곳입니다. 어디서 사진을 찍어도 인생샷을 건질 수 있습니다.', tags: ['sea', 'scenery', 'photo', 'relax'] },
        { name: '남해 독일마을', desc: '독일 교포들이 정착하며 만들어진 이국적인 마을입니다. 붉은 지붕의 집들과 푸른 남해 바다가 어우러져 동화 같은 풍경을 선사합니다.', tags: ['sea', 'photo', 'exotic', 'cafe'] }
    ],
    '제주도': [
        { name: '우도', desc: '에메랄드빛 바다와 하얀 산호 해변이 반겨주는 아름다운 섬 속의 섬. 스쿠터를 타고 해안도로를 달리며 자유를 만끽하거나, 땅콩 아이스크림을 맛보며 여유를 즐겨보세요.', tags: ['beach', 'activity', 'scenery', 'cafe', 'sea'] },
        { name: '한라산 국립공원', desc: '대한민국에서 가장 높은 산, 한라산에 도전해보세요. 힘든 등반 끝에 만나는 백록담의 절경은 평생 잊지 못할 감동을 선사할 것입니다.', tags: ['nature', 'activity', 'challenge', 'scenery'] },
        { name: '애월 카페거리', desc: '아름다운 제주 바다를 보며 커피 한 잔의 여유를 즐길 수 있는 곳입니다. 개성 넘치는 카페들 사이를 거닐며, 낭만적인 시간을 보내보세요.', tags: ['sea', 'cafe', 'relax', 'photo'] }
    ]
};

const qnaList = [
    {
        q: '1. 어떤 종류의 풍경에 더 마음이 끌리나요?',
        a: [
            { answer: '활기 넘치는 도시와 화려한 야경', type: ['urban', 'night', 'young'] },
            { answer: '산, 숲, 강 등 평화로운 자연', type: ['nature', 'scenery', 'relax', 'walk'] },
            { answer: '끝없이 펼쳐진 푸른 바다', type: ['sea', 'beach', 'scenery', 'relax'] }
        ]
    },
    {
        q: '2. 여행지에서 선호하는 활동은 무엇인가요?',
        a: [
            { answer: '짜릿하고 활동적인 액티비티 (등산, 서핑, 루지 등)', type: ['activity', 'challenge', 'thrill'] },
            { answer: '박물관, 유적지, 전통마을 등을 둘러보는 역사/문화 탐방', type: ['history', 'tradition', 'walk', 'art'] },
            { answer: '예쁜 카페에 앉아 쉬거나, 맛집을 찾아다니는 미식 투어', type: ['cafe', 'food', 'relax'] }
        ]
    },
    {
        q: '3. 여행의 주된 목적은 무엇인가요?',
        a: [
            { answer: '복잡한 일상에서 벗어나 온전한 휴식을 취하고 싶다.', type: ['relax', 'scenery', 'walk'] },
            { answer: '새롭고 특별한 경험으로 가득한 모험을 하고 싶다.', type: ['activity', 'challenge', 'thrill', 'mystery', 'exotic'] },
            { answer: '인생샷을 남길 수 있는 아름다운 곳을 찾고 싶다.', type: ['photo', 'scenery', 'art', 'cafe'] }
        ]
    },
];

// State
let qnaIdx = 0;
let selectedRegion = '';
let personalityScore = {};

function calculateResult() {
    const regionDestinations = allDestinations[selectedRegion];
    if (!regionDestinations) return allDestinations['경기도'][0]; // Fallback

    const sortedScores = Object.entries(personalityScore).sort((a, b) => b[1] - a[1]);
    
    let bestMatch = regionDestinations[0];
    let maxScore = -1;

    regionDestinations.forEach(destination => {
        let currentScore = 0;
        destination.tags.forEach(tag => {
            if (personalityScore[tag]) {
                currentScore += personalityScore[tag];
            }
        });
        
        if (sortedScores.length > 0 && destination.tags.includes(sortedScores[0][0])) {
            currentScore += 3;
        }
        if (sortedScores.length > 1 && destination.tags.includes(sortedScores[1][0])) {
            currentScore += 2;
        }

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestMatch = destination;
        }
    });

    return bestMatch;
}

function showResult() {
    qnaScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const result = calculateResult();
    resultName.textContent = result.name;
    resultDesc.textContent = result.desc;
}

function handleChoiceClick(event) {
    const selectedTypes = JSON.parse(event.currentTarget.dataset.type);
    selectedTypes.forEach(type => {
        personalityScore[type] = (personalityScore[type] || 0) + 1;
    });

    qnaIdx++;
    if (qnaIdx === NUM_QUESTIONS) {
        showResult();
    } else {
        nextQuestion();
    }
}

function nextQuestion() {
    statusBar.style.width = `${((qnaIdx + 1) / NUM_QUESTIONS) * 100}%`;
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
}

function beginTest(region) {
    // Reset state
    qnaIdx = 0;
    personalityScore = {};
    selectedRegion = region;

    regionScreen.classList.add("hidden");
    qnaScreen.classList.remove("hidden");
    nextQuestion();
}

function retry() {
    // Clear previous results
    resultName.textContent = '';
    resultDesc.textContent = '';

    resultScreen.classList.add("hidden");
    regionScreen.classList.remove("hidden");
}

// Event Listeners
document.querySelectorAll('.region-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const region = event.target.dataset.region;
        beginTest(region);
    });
});

retryBtn.addEventListener("click", retry);