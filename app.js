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

const destinationsByNeighborhood = {
    "종로구": [
        {
            name: "경복궁",
            desc: "조선 왕조 제일의 법궁. 서울의 중심에서 역사의 숨결을 느껴보세요."
        },
        {
            name: "북촌 한옥마을",
            desc: "전통 한옥이 보존된 아름다운 주거 지역. 고즈넉한 골목길을 산책해보세요."
        },
        {
            name: "익선동",
            desc: "좁은 골목 사이로 개성 넘치는 레스토랑과 전통 찻집이 숨어있는 한옥 명소입니다."
        },
        {
            name: "광장시장",
            desc: "빈대떡, 마약김밥 등 한국 전통 시장의 맛과 활기를 제대로 느낄 수 있는 곳."
        },
        {
            name: "대학로",
            desc: "다양한 연극과 뮤지컬을 즐길 수 있는 공연 예술의 중심지입니다."
        }
    ],
    "중구": [
        {
            name: "명동",
            desc: "뷰티, 패션, 먹거리가 총집합한 쇼핑의 중심지. 활기찬 에너지를 느껴보세요."
        },
        {
            name: "DDP (동대문디자인플라자)",
            desc: "독특한 건축물과 함께 패션, 전시, 이벤트를 즐길 수 있는 복합 문화 공간입니다."
        },
        {
            name: "남산공원 & N서울타워",
            desc: "케이블카를 타고 올라가 서울의 전경을 한눈에 담아보세요. 특히 야경이 아름답습니다."
        },
        {
            name: "덕수궁",
            desc: "전통과 근대가 공존하는 궁궐. 밤에 방문하는 석조전은 특히 아름답습니다."
        }
    ],
    "용산구": [
        {
            name: "리움미술관",
            desc: "한국 고미술과 현대미술, 국제미술이 어우러진 수준 높은 복합문화공간입니다."
        },
        {
            name: "국립중앙박물관",
            desc: "한국의 역사와 문화를 한눈에 볼 수 있는 곳. 방대한 유물과 기획 전시를 여유롭게 둘러보세요."
        },
        {
            name: "이태원",
            desc: "다양한 국적의 음식과 문화가 공존하는 이국적인 분위기의 거리입니다."
        }
    ],
    "성동구": [
        {
            name: "서울숲",
            desc: "도심 속에서 만나는 울창한 숲. 사계절 내내 다른 매력을 뽐내는 힐링 공간입니다."
        },
        {
            name: "성수동 카페거리",
            desc: "낡은 공장을 개조한 특색 있는 카페들이 모여있는 트렌디한 감성의 거리입니다."
        }
    ],
    "마포구": [
        {
            name: "홍대",
            desc: "버스킹, 클럽, 맛집, 쇼핑 등 젊음의 모든 것을 즐길 수 있는 활기찬 거리입니다."
        },
        {
            name: "망원동",
            desc: "아기자기한 개인 상점과 저렴하고 맛있는 맛집이 모여있는 동네. 망리단길을 거닐어보세요."
        },
        {
            name: "하늘공원",
            desc: "월드컵공원 내에 위치한 공원으로, 계절마다 아름다운 풍경을 자랑하는 억새 축제가 유명합니다."
        }
    ],
    "서초구/강남구": [
        {
            name: "강남역",
            desc: "지하상가부터 로드샵까지, 최신 트렌드를 만날 수 있는 쇼핑과 만남의 장소."
        },
        {
            name: "코엑스 아쿠아리움 & 별마당 도서관",
            desc: "해양 생물을 탐험하고, 거대한 서가 아래에서 책을 읽으며 특별한 하루를 보내세요."
        },
        {
            name: "가로수길",
            desc: "개성 넘치는 디자이너 샵과 편집샵, 플래그십 스토어가 모여있는 패션 거리."
        }
    ],
    "송파구": [
        {
            name: "롯데월드",
            desc: "실내외에서 스릴 넘치는 어트랙션과 다채로운 퍼레이드를 즐길 수 있는 테마파크입니다."
        },
        {
            name: "올림픽공원",
            desc: "넓은 잔디밭과 조각 작품들이 어우러진 공원. 나홀로나무 앞에서 인생샷을 남겨보세요."
        },
        {
            name: "롯데타워 서울스카이",
            desc: "국내 최고 높이의 전망대에서 360도로 펼쳐지는 서울의 아찔한 전경을 감상해보세요."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const neighborhoodFiltersContainer = document.getElementById('neighborhood-filters');
    const destinationsGrid = document.getElementById('destinations-grid');
    const searchInput = document.getElementById('search-input');
    const modalOverlay = document.getElementById('map-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const mapContainer = document.getElementById('map-container');

    let activeNeighborhood = '종로구'; // Set default neighborhood
    let currentSearchTerm = '';

    const openModal = (placeName) => {
        mapContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        mapContainer.appendChild(iframe);
        modalOverlay.classList.remove('hidden');
    };

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
        mapContainer.innerHTML = '';
    };

    const renderDestinations = (neighborhood, searchTerm = '') => {
        destinationsGrid.innerHTML = '';
        let filteredDestinations = destinationsByNeighborhood[neighborhood] || [];

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredDestinations = filteredDestinations.filter(dest =>
                dest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                dest.desc.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        
        if (filteredDestinations.length === 0) {
            destinationsGrid.innerHTML = '<p class="no-results">표시할 장소가 없습니다.</p>';
            return;
        }

        filteredDestinations.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.dataset.name = dest.name;
            card.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title">${dest.name}</h3>
                    <p class="card-desc">${dest.desc}</p>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    };

    const renderNeighborhoodButtons = () => {
        for (const [key, value] of Object.entries(neighborhoods)) {
            const button = document.createElement('button');
            button.className = 'theme-btn'; // Reusing the same style
            button.dataset.neighborhood = key;
            button.textContent = value;

            if (key === activeNeighborhood) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                activeNeighborhood = key;
                currentSearchTerm = searchInput.value;
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderDestinations(activeNeighborhood, currentSearchTerm);
            });

            neighborhoodFiltersContainer.appendChild(button);
        }
    };

    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        renderDestinations(activeNeighborhood, currentSearchTerm);
    });

    destinationsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.destination-card');
        if (card && card.dataset.name) {
            openModal(card.dataset.name);
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    renderNeighborhoodButtons();
    renderDestinations(activeNeighborhood);
});
