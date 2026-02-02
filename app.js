// DOM Elements
const regionScreen = document.querySelector("#region-selection-screen");
const durationScreen = document.querySelector("#duration-selection-screen");
const qnaScreen = document.querySelector("#qna-screen");
const resultScreen = document.querySelector("#result-screen");
const retryBtn = document.querySelector("#retry-btn");
const statusBar = document.querySelector(".status-bar-inner");
const questionTitle = document.querySelector("#question-title");
const choicesContainer = document.querySelector("#choices");
const resultName = document.querySelector("#result-name");
const resultDesc = document.querySelector("#result-desc");

const NUM_QUESTIONS = 3;

const allDestinations = {
    '경기도': [
        { name: '수원 화성', desc: '유네스코 세계문화유산 성곽길을 걸으며 역사 속으로 시간 여행을 떠나보세요.', tags: ['history', 'walk', 'urban'], duration: ['day-trip', '1n2d'] },
        { name: '아침고요수목원', desc: '계절마다 다른 옷을 입는 아름다운 정원에서 자연 속 힐링을 경험하세요.', tags: ['nature', 'walk', 'scenery'], duration: ['day-trip', '1n2d'] },
        { name: '헤이리 예술마을', desc: '예술가들의 작업실, 갤러리, 카페가 모여있는 곳에서 예술적 영감을 얻어보세요.', tags: ['art', 'cafe', 'walk'], duration: ['day-trip'] },
        { name: '물향기수목원', desc: '다양한 식물과 습지생태원을 거닐며 물과 나무의 향기에 취해보세요.', tags: ['nature', 'walk', 'relax'], duration: ['day-trip'] },
        { name: '니지모리 스튜디오', desc: '일본 에도시대 마을을 그대로 옮겨놓은 듯한 이국적인 공간에서 특별한 사진을 남겨보세요.', tags: ['exotic', 'photo', 'night'], duration: ['day-trip']}
    ],
    '강원도': [
        { name: '설악산 국립공원', desc: '대한민국 최고의 명산, 설악산의 웅장한 풍경에 빠져보세요. 등산을 통해 성취감을 느낄 수 있습니다.', tags: ['nature', 'scenery', 'activity', 'challenge'], duration: ['1n2d', '2n-plus'] },
        { name: '강릉 경포해변', desc: '끝없이 펼쳐진 동해바다를 보며 마음의 평화를 찾아보세요. 해변 근처 카페에서의 커피 한 잔은 덤입니다.', tags: ['beach', 'relax', 'cafe', 'sea'], duration: ['1n2d', '2n-plus'] },
        { name: '양양 서피비치', desc: '서핑과 힙한 분위기를 즐길 수 있는 젊음의 해변에서 자유를 만끽하고 싶은 당신에게 추천합니다.', tags: ['beach', 'activity', 'young', 'sea'], duration: ['1n2d', '2n-plus'] },
        { name: '뮤지엄 산', desc: '아름다운 산 속에 위치한 건축과 예술의 조화를 감상할 수 있는 공간입니다.', tags: ['art', 'scenery', 'cafe', 'relax'], duration: ['day-trip', '1n2d'] },
        { name: '남이섬', desc: '북한강 위에 떠 있는 아름다운 섬에서 자연과 예술을 함께 즐기며 여유로운 시간을 보내세요.', tags: ['walk', 'scenery', 'relax', 'nature'], duration: ['day-trip', '1n2d'] }
    ],
    '충청북도': [
        { name: '단양 만천하스카이워크', desc: '남한강 절벽 위에서 하늘을 걷는 듯한 짜릿함을 느껴보세요. 아름다운 풍경과 스릴을 동시에 즐길 수 있습니다.', tags: ['scenery', 'activity', 'thrill'], duration: ['day-trip', '1n2d'] },
        { name: '청남대', desc: '한때 대통령의 별장이었던 비밀스러운 장소. 잘 가꿔진 정원을 산책하며 여유로운 시간을 보내보세요.', tags: ['history', 'walk', 'relax'], duration: ['day-trip'] },
        { name: '고수동굴', desc: '수억 년의 시간이 만들어낸 신비로운 지하 세계를 탐험하며 자연의 경이로움을 느껴보세요.', tags: ['mystery', 'activity', 'nature'], duration: ['day-trip'] },
        { name: '보은 법주사', desc: '속리산에 위치한 천년 고찰의 고즈넉한 분위기 속에서 마음의 평화를 찾을 수 있습니다.', tags: ['history', 'temple', 'nature', 'relax'], duration: ['day-trip', '1n2d'] }
    ],
    '충청남도': [
        { name: '보령 대천해수욕장', desc: '젊음과 열기가 가득한 서해안 최대의 해수욕장에서 신나는 머드 축제와 다양한 해양 스포츠를 즐겨보세요.', tags: ['beach', 'activity', 'young'], duration: ['1n2d', '2n-plus'] },
        { name: '부여 궁남지', desc: '백제 무왕의 사랑 이야기가 깃든 대한민국 최초의 인공 연못. 여름밤 연꽃 사이로 비치는 조명이 낭만적입니다.', tags: ['history', 'walk', 'scenery', 'night', 'romance'], duration: ['day-trip', '1n2d'] },
        { name: '신두리 해안사구', desc: '바람이 만들어낸 거대한 모래 언덕 위를 걸으며, 마치 사막에 온 듯한 이국적인 풍경을 감상할 수 있습니다.', tags: ['nature', 'scenery', 'beach', 'photo'], duration: ['day-trip', '1n2d'] },
        { name: '아산 지중해마을', desc: '산토리니와 프로방스를 옮겨놓은 듯한 이국적인 마을에서 예쁜 사진을 남기며 여유로운 시간을 보내세요.', tags: ['exotic', 'photo', 'cafe'], duration: ['day-trip'] }
    ],
    '전라북도': [
        { name: '전주 한옥마을', desc: '맛과 멋의 고장, 전주에서 오감이 즐거운 미식 모험을 시작해보세요! 한복을 입고 고즈넉한 한옥마을을 거닐 수 있습니다.', tags: ['history', 'food', 'activity', 'walk'], duration: ['day-trip', '1n2d'] },
        { name: '진안 마이산', desc: '두 개의 봉우리가 말의 귀를 닮은 신비로운 산. 수수께끼 같은 돌탑들을 보며 자연의 경이로움을 느껴보세요.', tags: ['nature', 'scenery', 'mystery', 'walk'], duration: ['day-trip', '1n2d'] },
        { name: '채계산 출렁다리', desc: '아찔한 높이의 출렁다리를 건너며 스릴과 함께 아름다운 풍경을 조망할 수 있습니다.', tags: ['thrill', 'scenery', 'activity'], duration: ['day-trip'] },
        { name: '고창읍성', desc: '성곽을 따라 걸으며 옛 모습을 간직한 읍성의 고즈넉한 분위기를 만끽할 수 있는 곳입니다.', tags: ['history', 'walk', 'relax'], duration: ['day-trip'] }
    ],
    '전라남도': [
        { name: '여수 밤바다', desc: '낭만적인 버스킹 음악과 화려한 조명이 어우러진 여수의 밤바다를 거닐어보세요. 낭만 그 자체입니다.', tags: ['sea', 'night', 'romance', 'urban'], duration: ['1n2d', '2n-plus'] },
        { name: '순천만 국가정원', desc: '세계 각국의 아름다운 정원을 한곳에 모아놓은 거대한 힐링 공간입니다. 지친 마음에 휴식을 선물하세요.', tags: ['nature', 'walk', 'scenery', 'relax'], duration: ['day-trip', '1n2d'] },
        { name: '보성 녹차밭', desc: '끝없이 펼쳐진 초록빛 녹차밭의 풍경은 보기만 해도 마음이 편안해집니다. 향긋한 녹차 한 잔의 여유를 즐겨보세요.', tags: ['scenery', 'relax', 'photo', 'food'], duration: ['day-trip', '1n2d'] },
        { name: '신안 퍼플섬', desc: '온통 보라색으로 가득한 신비로운 섬입니다. 독특한 컨셉의 섬에서 특별한 인생샷을 남겨보세요.', tags: ['photo', 'exotic', 'island', 'walk'], duration: ['1n2d'] }
    ],
    '경상북도': [
        { name: '경주 대릉원/황리단길', desc: '신라의 역사가 살아 숨 쉬는 경주에서 특별한 시간 여행을 즐겨보세요. 고분 사이를 산책하고 황리단길의 맛집을 탐방하는 재미가 있습니다.', tags: ['history', 'food', 'walk', 'photo'], duration: ['1n2d', '2n-plus'] },
        { name: '안동 하회마을', desc: '전통적인 유교 문화와 고택의 아름다움을 느낄 수 있는 유네스코 세계유산. 시간이 멈춘 듯한 마을에서 진정한 한국의 미를 느껴보세요.', tags: ['history', 'tradition', 'relax'], duration: ['1n2d', '2n-plus'] },
        { name: '울릉도', desc: '화산 활동이 만들어낸 독특하고 아름다운 자연 경관을 자랑하는 신비의 섬입니다. 배를 타고 떠나는 특별한 모험을 즐겨보세요.', tags: ['island', 'nature', 'sea', 'scenery', 'challenge'], duration: ['2n-plus'] },
        { name: '영주 부석사', desc: '아름다운 목조 건축물과 고즈넉한 산사의 정취를 느낄 수 있는 곳. 특히 해질녘 무량수전에서 바라보는 풍경은 잊을 수 없는 감동을 줍니다.', tags: ['history', 'temple', 'scenery', 'relax'], duration: ['day-trip', '1n2d'] }
    ],
    '경상남도': [
        { name: '통영 루지/케이블카', desc: '짜릿한 루지를 타고 트랙을 질주하거나, 케이블카를 타고 한려수도의 절경을 감상해보세요. 활동적인 당신에게 안성맞춤입니다.', tags: ['activity', 'scenery', 'thrill', 'sea'], duration: ['1n2d'] },
        { name: '거제 바람의 언덕', desc: '푸른 바다와 초원, 커다란 풍차가 어우러져 그림 같은 풍경을 만들어내는 곳. 어디서 사진을 찍어도 인생샷을 건질 수 있습니다.', tags: ['sea', 'scenery', 'photo', 'relax'], duration: ['1n2d'] },
        { name: '진주성', desc: '역사의 숨결이 느껴지는 진주성 성곽을 따라 걸으며 남강의 아름다운 야경을 감상해보세요.', tags: ['history', 'night', 'walk', 'urban'], duration: ['day-trip'] },
        { name: '합천 황매산', desc: '계절마다 다른 색의 옷을 입는 아름다운 산입니다. 특히 봄에는 진분홍 철쭉이, 가을에는 은빛 억새가 온 산을 뒤덮습니다.', tags: ['nature', 'scenery', 'walk', 'challenge'], duration: ['day-trip', '1n2d'] }
    ],
    '제주도': [
        { name: '우도', desc: '에메랄드빛 바다와 하얀 산호 해변이 반겨주는 아름다운 섬 속의 섬. 스쿠터를 타고 해안도로를 달리며 자유를 만끽하세요.', tags: ['beach', 'activity', 'scenery', 'cafe', 'sea'], duration: ['1n2d', '2n-plus'] },
        { name: '한라산 국립공원', desc: '대한민국에서 가장 높은 산, 한라산에 도전해보세요. 힘든 등반 끝에 만나는 백록담의 절경은 평생 잊지 못할 감동을 선사할 것입니다.', tags: ['nature', 'activity', 'challenge', 'scenery'], duration: ['day-trip', '1n2d', '2n-plus'] },
        { name: '비자림', desc: '수천 그루의 비자나무가 뿜어내는 상쾌한 피톤치드를 맞으며, 조용한 숲길을 걷는 것만으로도 힐링이 됩니다.', tags: ['nature', 'walk', 'relax'], duration: ['day-trip', '1n2d'] },
        { name: '사려니숲길', desc: '삼나무가 빽빽하게 들어선 아름다운 숲길입니다. 영화 속 한 장면 같은 신비로운 분위기 속에서 산책을 즐겨보세요.', tags: ['nature', 'walk', 'relax', 'photo'], duration: ['day-trip', '1n2d'] }
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
let selectedDuration = '';
let personalityScore = {};

function calculateResult() {
    let regionDestinations = allDestinations[selectedRegion];
    if (!regionDestinations) return { name: "오류", desc: "선택한 지역의 여행지 정보를 찾을 수 없습니다." };

    let durationDestinations = regionDestinations.filter(d => d.duration.includes(selectedDuration));
    if (durationDestinations.length === 0) {
        durationDestinations = regionDestinations; 
    }

    const sortedScores = Object.entries(personalityScore).sort((a, b) => b[1] - a[1]);
    
    let bestMatch = durationDestinations[0];
    let maxScore = -1;

    durationDestinations.forEach(destination => {
        let currentScore = 0;
        destination.tags.forEach(tag => {
            if (personalityScore[tag]) {
                currentScore += personalityScore[tag];
            }
        });
        
        if (sortedScores.length > 0 && destination.tags.includes(sortedScores[0][0])) currentScore += 3;
        if (sortedScores.length > 1 && destination.tags.includes(sortedScores[1][0])) currentScore += 2;

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

function startTest(duration) {
    document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.duration-btn[data-duration='${duration}']`).classList.add('selected');
    
    selectedDuration = duration;
    qnaIdx = 0;
    personalityScore = {};

    setTimeout(() => {
        durationScreen.classList.add("hidden");
        qnaScreen.classList.remove("hidden");
        nextQuestion();
    }, 300);
}

function selectRegion(region) {
    document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.region-btn[data-region='${region}']`).classList.add('selected');

    selectedRegion = region;
    setTimeout(() => {
        regionScreen.classList.add("hidden");
        durationScreen.classList.remove("hidden");
    }, 300);
}

function retry() {
    resultName.textContent = '';
    resultDesc.textContent = '';

    resultScreen.classList.add("hidden");
    regionScreen.classList.remove("hidden");
    document.querySelectorAll('.region-btn, .duration-btn').forEach(b => b.classList.remove('selected'));
}

// Event Listeners
document.querySelectorAll('.region-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        selectRegion(event.target.dataset.region);
    });
});

document.querySelectorAll('.duration-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        startTest(event.target.dataset.duration);
    });
});

retryBtn.addEventListener("click", retry);