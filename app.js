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

const END_POINT = 10; // Number of questions

const qnaList = [
    {
        q: '1. 주말에 나는...',
        a: [
            { answer: '핫플레이스 탐방, 쇼핑 등 주로 밖에서 시간을 보낸다.', type: [0, 1, 9, 11] },
            { answer: '집에서 조용히 휴식하거나, 한적한 곳으로 떠난다.', type: [2, 3, 4, 5, 6, 7, 8, 10] },
        ]
    },
    {
        q: '2. 여행지 숙소를 고를 때 가장 중요한 것은?',
        a: [
            { answer: '주요 관광지 접근성과 편리한 시설', type: [0, 1, 9, 11] },
            { answer: '아름다운 자연 경관과 조용한 분위기', type: [2, 3, 4, 6, 7, 10] },
        ]
    },
    {
        q: '3. 다음 중 더 선호하는 풍경은?',
        a: [
            { answer: '화려한 빌딩과 불빛이 가득한 도시의 야경', type: [0, 9, 11] },
            { answer: '끝없이 펼쳐진 푸른 바다 또는 울창한 숲', type: [2, 3, 4, 6, 9, 10] },
        ]
    },
    {
        q: '4. 여행지에서 꼭 해보고 싶은 활동은?',
        a: [
            { answer: '짜릿한 액티비티 (루지, 서핑 등)', type: [9, 10, 11] },
            { answer: '그 지역의 역사가 담긴 곳을 천천히 둘러보기', type: [0, 1, 5, 7, 8] },
        ]
    },
    {
        q: '5. 여행의 목적은 주로 무엇인가요?',
        a: [
            { answer: '새로운 경험과 도전!', type: [5, 8, 9, 11] },
            { answer: '일상에서의 탈출과 완전한 휴식', type: [2, 3, 4, 6, 7, 10] },
        ]
    },
    {
        q: '6. 여행지에서의 식사는?',
        a: [
            { answer: '유명 셰프의 음식을 맛볼 수 있는 파인 다이닝', type: [0, 9] },
            { answer: '현지인들이 추천하는 숨겨진 맛집 탐방', type: [5, 8] },
        ]
    },
    {
        q: '7. 어떤 여행 스타일을 더 선호하시나요?',
        a: [
            { answer: '시간대별로 계획을 세워 알차게 움직이는 여행', type: [0, 1] },
            { answer: '정해진 계획 없이 발길 닿는 대로 움직이는 즉흥 여행', type: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        ]
    },
    {
        q: '8. 더 오래 머물고 싶은 곳은?',
        a: [
            { answer: '아기자기한 골목과 개성 있는 상점이 많은 곳', type: [0, 8] },
            { answer: '사람이 거의 없는 한적한 자연 속', type: [2, 3, 4, 6, 7] },
        ]
    },
    {
        q: '9. 여행 기념품을 산다면?',
        a: [
            { answer: '그 지역에서만 살 수 있는 특별한 수공예품', type: [1, 5, 8] },
            { answer: '실용적이고 세련된 디자인의 제품', type: [0, 9] },
        ]
    },
    {
        q: '10. 나에게 여행이란?',
        a: [
            { answer: '새로운 에너지를 얻는 재충전의 시간', type: [2, 3, 4, 6, 7, 10] },
            { answer: '평소와 다른 특별한 경험을 하는 시간', type: [0, 1, 5, 8, 9, 11] },
        ]
    }
];

const infoList = [
    // 0
    {
        name: '서울 북촌 한옥마을',
        desc: '전통과 현대가 공존하는 북촌에서 고즈넉한 한옥의 정취를 느껴보세요. 골목골목 숨어있는 갤러리와 카페, 맛집을 발견하는 재미가 쏠쏠합니다. 복잡한 도시 속, 여유로운 산책을 즐기고 싶은 당신에게 딱 맞는 장소입니다.',
        img: 'https://images.unsplash.com/photo-1634952903531-508587201415?q=80&w=2070&auto=format&fit=crop'
    },
    // 1
    {
        name: '수원 화성',
        desc: '유네스코 세계문화유산인 수원 화성의 성곽길을 따라 걸으며 역사 속으로 시간 여행을 떠나보세요. 낮에는 웅장한 건축물의 아름다움을, 밤에는 화려한 조명이 더해진 낭만적인 야경을 감상할 수 있습니다.',
        img: 'https://images.unsplash.com/photo-1592328929283-93c66a0d4a96?q=80&w=2070&auto=format&fit=crop'
    },
    // 2
    {
        name: '태백 매봉산 바람의 언덕',
        desc: '거대한 풍력발전기와 광활한 배추밭이 만들어내는 이국적인 풍경에 감탄하게 될 거예요. 시원한 바람을 맞으며 일상의 스트레스를 날려버리고, 자연의 위대함 앞에서 가슴 벅찬 감동을 느껴보세요.',
        img: 'https://images.unsplash.com/photo-1658428230190-62053f656208?q=80&w=1974&auto=format&fit=crop'
    },
    // 3
    {
        name: '단양 도담삼봉',
        desc: '남한강의 푸른 물결 위로 솟아오른 세 개의 봉우리가 한 폭의 동양화 같은 풍경을 선사합니다. 잔잔한 물안개가 피어오르는 이른 아침, 황금빛으로 물드는 해 질 녘에 방문하면 더욱 신비로운 경치를 만끽할 수 있습니다.',
        img: 'https://images.unsplash.com/photo-1596238299836-8367f0872895?q=80&w=2070&auto=format&fit=crop'
    },
    // 4
    {
        name: '태안 신두리 해안사구',
        desc: '마치 사막에 온 듯한 착각을 불러일으키는 대한민국 최대 규모의 해안사구입니다. 바람이 만들어낸 부드러운 모래 언덕을 맨발로 걸으며 자연의 신비로움을 온몸으로 느껴보세요. 특히 해 질 녘의 노을은 잊지 못할 감동을 선사합니다.',
        img: 'https://images.unsplash.com/photo-1658428230190-62053f656208?q=80&w=1974&auto=format&fit=crop'
    },
    // 5
    {
        name: '전주 한옥마을',
        desc: '맛과 멋의 고장, 전주에서 오감이 즐거운 미식 여행을 떠나보세요. 고즈넉한 한옥마을을 거닐며 다양한 길거리 음식을 맛보고, 푸짐한 한정식으로 든든하게 배를 채울 수 있습니다. 전통과 맛이 어우러진 특별한 경험이 당신을 기다립니다.',
        img: 'https://images.unsplash.com/photo-1601614749302-3c2243d46387?q=80&w=2070&auto=format&fit=crop'
    },
    // 6
    {
        name: '순천만 국가정원',
        desc: '세계 각국의 아름다운 정원을 한곳에 모아놓은 거대한 힐링 공간입니다. 계절마다 피어나는 다채로운 꽃들과 잘 가꿔진 나무들 사이를 거닐며, 지친 마음에 휴식을 선물하세요.',
        img: 'https://images.unsplash.com/photo-1597320466485-695579911943?q=80&w=2070&auto=format&fit=crop'
    },
    // 7
    {
        name: '경주 황리단길',
        desc: '신라의 역사가 살아 숨 쉬는 경주에서 특별한 시간 여행을 즐겨보세요. 대릉원 옆에 자리한 황리단길의 아기자기한 카페와 맛집, 소품샵을 구경하는 재미가 쏠쏠합니다. 과거와 현재가 공존하는 매력적인 도시입니다.',
        img: 'https://images.unsplash.com/photo-1589922579133-148278c43916?q=80&w=1932&auto=format&fit=crop'
    },
    // 8
    {
        name: '통영 스카이라인루지',
        desc: '아름다운 통영의 바다를 배경으로 짜릿한 스피드를 즐겨보세요! 남녀노소 누구나 쉽게 즐길 수 있는 루지는 여행에 특별한 활력을 더해줄 것입니다. 짜릿한 경험을 통해 스트레스를 해소하고 싶은 당신에게 추천합니다.',
        img: 'https://images.unsplash.com/photo-1603831742433-513529a398d5?q=80&w=2070&auto=format&fit=crop'
    },
    // 9
    {
        name: '부산 해운대',
        desc: '활기찬 에너지가 넘치는 대한민국 제1의 해수욕장, 해운대! 세련된 도시의 매력과 시원한 바다의 낭만을 동시에 느낄 수 있습니다. 낮에는 해수욕을, 밤에는 화려한 조명과 함께하는 산책을 즐겨보세요.',
        img: 'https://images.unsplash.com/photo-1599661046223-140c83328104?q=80&w=2070&auto=format&fit=crop'
    },
    // 10
    {
        name: '제주 우도',
        desc: '에메랄드빛 바다와 하얀 산호 해변이 반겨주는 아름다운 섬, 우도. 스쿠터를 타고 해안도로를 달리거나, 땅콩 아이스크림을 맛보며 여유로운 시간을 보낼 수 있습니다. 제주도 본섬과는 또 다른 매력을 가진 보석 같은 곳입니다.',
        img: 'https://images.unsplash.com/photo-1599380961834-8c03565e3b50?q=80&w=2070&auto=format&fit=crop'
    },
    // 11
    {
        name: '인천 월미도',
        desc: '짜릿한 놀이기구와 시원한 바닷바람이 함께하는 월미도에서 동심으로 돌아가 보세요! 디스코팡팡과 바이킹을 즐기고, 갈매기에게 새우깡을 주며 잊지 못할 추억을 만들 수 있습니다. 낭만적인 일몰은 덤입니다.',
        img: 'https://images.unsplash.com/photo-1634547990141-1639e1d5a7a7?q=80&w=2070&auto=format&fit=crop'
    }
];

let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let qnaIdx = 0;

function calculateResult() {
    const resultIndex = score.indexOf(Math.max(...score));
    return infoList[resultIndex];
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
    selectedTypes.forEach(typeIdx => {
        score[typeIdx] += 1;
    });

    qnaIdx++;
    if (qnaIdx === END_POINT) {
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

    statusBar.style.width = `${((qnaIdx + 1) / END_POINT) * 100}%`;
}

function begin() {
    startScreen.classList.add("hidden");
    qnaScreen.classList.remove("hidden");
    nextQuestion();
}

function retry() {
    qnaIdx = 0;
    score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

// Event Listeners
startBtn.addEventListener("click", begin);
retryBtn.addEventListener("click", retry);