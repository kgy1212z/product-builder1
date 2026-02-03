// New data structure by neighborhood
const neighborhoods = {
    "종로구": "종로구",
    "중구": "중구",
    "용산구": "용산구",
    "성동구": "성동구",
    "마포구": "마포구",
    "서초구/강남구": "서초/강남",
    "송파구": "송파구",
};

// Helper function to get beenThere status from local storage
const getBeenThereStatus = (placeName) => {
    const status = localStorage.getItem(`beenThere_${placeName}`);
    return status === 'true'; // Returns boolean
};

// Helper function to set beenThere status in local storage
const setBeenThereStatus = (placeName, status) => {
    localStorage.setItem(`beenThere_${placeName}`, status);
};

// Initialize destinations with beenThere status
const initializeDestinations = () => {
    const newDestinations = {};
    for (const neighborhood in destinationsByNeighborhood) {
        newDestinations[neighborhood] = destinationsByNeighborhood[neighborhood].map(dest => ({
            ...dest,
            beenThere: getBeenThereStatus(dest.name)
        }));
    }
    return newDestinations;
};

let initializedDestinations; // Declare a variable to hold the initialized data

const destinationsByNeighborhood = {
    "종로구": [
        { name: "경복궁", desc: "조선 왕조 제일의 법궁. 서울의 중심에서 역사의 숨결을 느껴보세요.", website: "http://www.royalpalace.go.kr/", hours: "09:00 - 18:00 (계절별 상이)" },
        { name: "북촌 한옥마을", desc: "전통 한옥이 보존된 아름다운 주거 지역. 고즈넉한 골목길을 산책해보세요.", website: "https://hanok.seoul.go.kr/", hours: "상시 개방 (주거 지역이므로 정숙 유지)" },
        { name: "익선동", desc: "좁은 골목 사이로 개성 넘치는 레스토랑과 전통 찻집이 숨어있는 한옥 명소입니다.", website: "", hours: "상점별 상이" },
        { name: "광장시장", desc: "빈대떡, 마약김밥 등 한국 전통 시장의 맛과 활기를 제대로 느낄 수 있는 곳.", website: "http://www.kwangjangmarket.co.kr/", hours: "09:00 - 23:00 (상점별 상이)" },
        { name: "대학로", desc: "다양한 연극과 뮤지컬을 즐길 수 있는 공연 예술의 중심지입니다.", website: "", hours: "공연별 상이" }
    ],
    "중구": [
        { name: "명동", desc: "뷰티, 패션, 먹거리가 총집합한 쇼핑의 중심지. 활기찬 에너지를 느껴보세요.", website: "", hours: "상점별 상이" },
        { name: "DDP (동대문디자인플라자)", desc: "독특한 건축물과 함께 패션, 전시, 이벤트를 즐길 수 있는 복합 문화 공간입니다.", website: "https://ddp.or.kr/", hours: "10:00 - 20:00" },
        { name: "남산공원 & N서울타워", desc: "케이블카를 타고 올라가 서울의 전경을 한눈에 담아보세요. 특히 야경이 아름답습니다.", website: "https://www.nseoultower.co.kr/", hours: "전망대: 10:00 - 23:00 (주말 23:30)" },
        { name: "덕수궁", desc: "전통과 근대가 공존하는 궁궐. 밤에 방문하는 석조전은 특히 아름답습니다.", website: "http://www.deoksugung.go.kr/", hours: "09:00 - 21:00 (월요일 휴궁)" }
    ],
    "용산구": [
        { name: "리움미술관", desc: "한국 고미술과 현대미술, 국제미술이 어우러진 수준 높은 복합문화공간입니다.", website: "https://www.leeum.org/", hours: "10:00 - 18:00 (월요일 휴관)" },
        { name: "국립중앙박물관", desc: "한국의 역사와 문화를 한눈에 볼 수 있는 곳. 방대한 유물과 기획 전시를 여유롭게 둘러보세요.", website: "https://www.museum.go.kr/", hours: "10:00 - 18:00 (주말/공휴일 19:00)" },
        { name: "이태원", desc: "다양한 국적의 음식과 문화가 공존하는 이국적인 분위기의 거리입니다.", website: "", hours: "상점별 상이" }
    ],
    "성동구": [
        { name: "서울숲", desc: "도심 속에서 만나는 울창한 숲. 사계절 내내 다른 매력을 뽐내는 힐링 공간입니다.", website: "https://parks.seoul.go.kr/seoulforest", hours: "상시 개방 (일부 시설 제외)" },
        { name: "성수동 카페거리", desc: "낡은 공장을 개조한 특색 있는 카페들이 모여있는 트렌디한 감성의 거리입니다.", website: "", hours: "카페별 상이" }
    ],
    "마포구": [
        { name: "홍대", desc: "버스킹, 클럽, 맛집, 쇼핑 등 젊음의 모든 것을 즐길 수 있는 활기찬 거리입니다.", website: "", hours: "상점별 상이" },
        { name: "망원동", desc: "아기자기한 개인 상점과 저렴하고 맛있는 맛집이 모여있는 동네. 망리단길을 거닐어보세요.", website: "", hours: "상점별 상이" },
        { name: "하늘공원", desc: "월드컵공원 내에 위치한 공원으로, 계절마다 아름다운 풍경을 자랑하는 억새 축제가 유명합니다.", website: "https://parks.seoul.go.kr/template/sub/worldcuppark.do", hours: "05:00 - 22:00 (계절별 상이)" }
    ],
    "서초구/강남구": [
        { name: "강남역", desc: "지하상가부터 로드샵까지, 최신 트렌드를 만날 수 있는 쇼핑과 만남의 장소.", website: "", hours: "상점별 상이" },
        { name: "코엑스 아쿠아리움 & 별마당 도서관", desc: "해양 생물을 탐험하고, 거대한 서가 아래에서 책을 읽으며 특별한 하루를 보내세요.", website: "https://www.coexaqua.com/", hours: "10:00 - 20:00" },
        { name: "가로수길", desc: "개성 넘치는 디자이너 샵과 편집샵, 플래그십 스토어가 모여있는 패션 거리.", website: "", hours: "상점별 상이" }
    ],
    "송파구": [
        { name: "롯데월드", desc: "실내외에서 스릴 넘치는 어트랙션과 다채로운 퍼레이드를 즐길 수 있는 테마파크입니다.", website: "https://adventure.lotteworld.com/", hours: "10:00 - 21:00" },
        { name: "올림픽공원", desc: "넓은 잔디밭과 조각 작품들이 어우러진 공원. 나홀로나무 앞에서 인생샷을 남겨보세요.", website: "https://www.ksponco.or.kr/olympicpark/", hours: "05:00 - 22:00" },
        { name: "롯데타워 서울스카이", desc: "국내 최고 높이의 전망대에서 360도로 펼쳐지는 서울의 아찔한 전경을 감상해보세요.", website: "https://seoulsky.lotteworld.com/", hours: "10:30 - 22:00" }
    ]
};

// --- Challenge Logic ---
const calculateProgress = () => {
    const progress = {};
    let totalVisited = 0;
    let totalPlaces = 0;

    for (const neighborhood in initializedDestinations) {
        const places = initializedDestinations[neighborhood];
        const visitedCount = places.filter(dest => dest.beenThere).length;
        const totalCount = places.length;
        progress[neighborhood] = {
            visited: visitedCount,
            total: totalCount,
            percentage: totalCount > 0 ? (visitedCount / totalCount) * 100 : 0
        };
        totalVisited += visitedCount;
        totalPlaces += totalCount;
    }

    progress.total = {
        visited: totalVisited,
        total: totalPlaces,
        percentage: totalPlaces > 0 ? (totalVisited / totalPlaces) * 100 : 0
    };

    return progress;
};

const getBadges = (progress) => {
    const badges = [];
    if (progress.total.visited >= 1) badges.push("서울 첫걸음");
    if (progress.total.visited >= 10) badges.push("서울 탐험가");
    if (progress.total.percentage === 100) badges.push("서울 정복자");

    for (const neighborhood in progress) {
        if (neighborhood !== 'total' && progress[neighborhood].percentage === 100) {
            badges.push(`${neighborhood} 마스터`);
        }
    }
    return badges;
};


document.addEventListener('DOMContentLoaded', () => {
    initializedDestinations = initializeDestinations();

    // --- DOM Elements ---
    const neighborhoodFiltersContainer = document.getElementById('neighborhood-filters');
    const destinationsGrid = document.getElementById('destinations-grid');
    const searchInput = document.getElementById('search-input');
    const mapModal = document.getElementById('map-modal');
    const mapModalCloseBtn = mapModal.querySelector('.modal-close');
    const modalDetailsContainer = document.getElementById('modal-details-container');
    const challengeBtn = document.getElementById('challenge-btn');
    const challengeModal = document.getElementById('challenge-modal');
    const challengeModalCloseBtn = challengeModal.querySelector('.modal-close');
    const challengeContent = document.getElementById('challenge-content');

    let activeNeighborhood = '종로구';
    let currentSearchTerm = '';

    // --- Modal Logic ---
    const openModal = (modalElement) => modalElement.classList.remove('hidden');
    const closeModal = (modalElement) => modalElement.classList.add('hidden');

    const openMapModal = (placeName) => {
        let destination;
        for (const neighborhood in initializedDestinations) {
            const found = initializedDestinations[neighborhood].find(d => d.name === placeName);
            if (found) { destination = found; break; }
        }
        if (!destination) return;
        
        const mapContainer = document.getElementById('map-container');
        mapContainer.innerHTML = '';
        modalDetailsContainer.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        mapContainer.appendChild(iframe);
        
        modalDetailsContainer.innerHTML = `
            <h2>${destination.name}</h2>
            <p>${destination.desc}</p>
            <p><strong>운영시간:</strong> ${destination.hours || '정보 없음'}</p>
            ${destination.website ? `<p><a href="${destination.website}" target="_blank" rel="noopener noreferrer">공식 웹사이트 방문</a></p>` : ''}
        `;
        openModal(mapModal);
    };

    const openChallengeModal = () => {
        const progress = calculateProgress();
        const badges = getBadges(progress);
        
        let contentHTML = `
            <div class="challenge-group">
                <h3>총 진행률 (${progress.total.visited}/${progress.total.total})</h3>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress.total.percentage}%;">${Math.round(progress.total.percentage)}%</div>
                </div>
            </div>
            <div class="challenge-group">
                <h3>획득한 뱃지</h3>
                <div class="badge-container">
                    ${badges.length > 0 ? badges.map(b => `<span class="badge">${b}</span>`).join('') : '<span class="badge locked">아직 뱃지 없음</span>'}
                </div>
            </div>
            <div class="challenge-group">
                <h3>동네별 진행률</h3>
                ${Object.keys(neighborhoods).map(n => `
                    <p>${n} (${progress[n].visited}/${progress[n].total})</p>
                    <div class="progress-bar-container">
                         <div class="progress-bar" style="width: ${progress[n].percentage}%;"></div>
                    </div>
                `).join('')}
            </div>
        `;
        challengeContent.innerHTML = contentHTML;
        openModal(challengeModal);
    };

    // --- Render Logic ---
    const renderDestinations = (neighborhood, searchTerm = '') => {
        destinationsGrid.innerHTML = '';
        let filteredDests = initializedDestinations[neighborhood] || [];

        if (searchTerm) {
            filteredDests = filteredDests.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        
        if (filteredDests.length === 0) {
            destinationsGrid.innerHTML = '<p class="no-results">표시할 장소가 없습니다.</p>';
            return;
        }

        filteredDests.forEach(dest => {
            const card = document.createElement('div');
            card.className = `destination-card ${dest.beenThere ? 'been-there' : ''}`;
            card.dataset.name = dest.name;
            card.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title">${dest.name}</h3>
                    <p class="card-desc">${dest.desc}</p>
                </div>
                <div class="been-there-wrapper">
                    <label class="been-there-label">
                        <input type="checkbox" class="been-there-checkbox" ${dest.beenThere ? 'checked' : ''} data-name="${dest.name}">
                        <span>가봤어요</span>
                    </label>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    };

    const renderNeighborhoodButtons = () => {
        Object.keys(neighborhoods).forEach(key => {
            const button = document.createElement('button');
            button.className = 'theme-btn';
            button.dataset.neighborhood = key;
            button.textContent = neighborhoods[key];
            if (key === activeNeighborhood) button.classList.add('active');
            
            button.addEventListener('click', () => {
                activeNeighborhood = key;
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderDestinations(activeNeighborhood, searchInput.value);
            });
            neighborhoodFiltersContainer.appendChild(button);
        });
    };

    // --- Event Listeners ---
    searchInput.addEventListener('input', e => renderDestinations(activeNeighborhood, e.target.value));

    destinationsGrid.addEventListener('click', (e) => {
        const checkbox = e.target.closest('.been-there-checkbox');
        if (checkbox) {
            const placeName = checkbox.dataset.name;
            const isChecked = checkbox.checked;
            setBeenThereStatus(placeName, isChecked);
            
            const card = checkbox.closest('.destination-card');
            card.classList.toggle('been-there', isChecked);

            for (const neighborhood in initializedDestinations) {
                const dest = initializedDestinations[neighborhood].find(d => d.name === placeName);
                if (dest) { dest.beenThere = isChecked; break; }
            }
            return;
        }
        
        const card = e.target.closest('.destination-card');
        if (card) openMapModal(card.dataset.name);
    });

    mapModalCloseBtn.addEventListener('click', () => closeModal(mapModal));
    mapModal.addEventListener('click', e => { if (e.target === mapModal) closeModal(mapModal); });
    
    challengeBtn.addEventListener('click', openChallengeModal);
    challengeModalCloseBtn.addEventListener('click', () => closeModal(challengeModal));
    challengeModal.addEventListener('click', e => { if (e.target === challengeModal) closeModal(challengeModal); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mapModal.classList.contains('hidden')) closeModal(mapModal);
        if (e.key === 'Escape' && !challengeModal.classList.contains('hidden')) closeModal(challengeModal);
    });

    renderNeighborhoodButtons();
    renderDestinations(activeNeighborhood);
});