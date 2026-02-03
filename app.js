const themes = {
    "history": "고궁 & 역사",
    "shopping": "쇼핑 & 패션",
    "nature": "자연 & 힐링",
    "food": "미식 & 맛집",
    "art": "예술 & 문화",
    "entertainment": "엔터테인먼트 & 액티비티"
};

const destinations = {
    "history": [
        {
            name: "경복궁",
            desc: "조선 왕조 제일의 법궁. 서울의 중심에서 역사의 숨결을 느껴보세요.",
            img: "https://images.unsplash.com/photo-1545595993-2f34c795d4c3?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "북촌 한옥마을",
            desc: "전통 한옥이 보존된 아름다운 주거 지역. 고즈넉한 골목길을 산책해보세요.",
            img: "https://images.unsplash.com/photo-1593327914837-529d15024b4f?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "서대문형무소",
            desc: "대한민국의 아픈 역사를 되새겨볼 수 있는 의미 있는 장소입니다.",
            img: "https://images.unsplash.com/photo-1577908589283-649931b26a8e?q=80&w=2832&auto=format&fit=crop"
        }
    ],
    "shopping": [
        {
            name: "명동",
            desc: "뷰티, 패션, 먹거리가 총집합한 쇼핑의 중심지. 활기찬 에너지를 느껴보세요.",
            img: "https://images.unsplash.com/photo-1563222340-93c6ad4d4d53?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "더현대 서울",
            desc: "자연 채광 아래에서 즐기는 미래형 쇼핑 공간. 실내 정원이 인상적입니다.",
            img: "https://images.unsplash.com/photo-1634931336183-3c88b00a0659?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "동대문디자인플라자 (DDP)",
            desc: "독특한 건축물과 함께 패션, 전시, 이벤트를 즐길 수 있는 복합 문화 공간입니다.",
            img: "https://images.unsplash.com/photo-1590748529283-35a730453303?q=80&w=2940&auto=format&fit=crop"
        }
    ],
    "nature": [
        {
            name: "서울숲",
            desc: "도심 속에서 만나는 울창한 숲. 사계절 내내 다른 매력을 뽐내는 힐링 공간입니다.",
            img: "https://images.unsplash.com/photo-1583995837332-13b78f9363dc?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "남산공원 & N서울타워",
            desc: "케이블카를 타고 올라가 서울의 전경을 한눈에 담아보세요. 특히 야경이 아름답습니다.",
            img: "https://images.unsplash.com/photo-1544616223-835a60a3f7f0?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "북한산 국립공원",
            desc: "서울 근교에서 즐기는 본격적인 등산. 정상에서 느끼는 성취감은 특별합니다.",
            img: "https://images.unsplash.com/photo-1587883906277-28d5494f6e3c?q=80&w=2940&auto=format&fit=crop"
        }
    ],
    "food": [
        {
            name: "광장시장",
            desc: "빈대떡, 마약김밥 등 한국 전통 시장의 맛과 활기를 제대로 느낄 수 있는 곳.",
            img: "https://images.unsplash.com/photo-1615802117585-7033a8b41724?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "성수동 카페거리",
            desc: "낡은 공장을 개조한 특색 있는 카페들이 모여있는 트렌디한 감성의 거리입니다.",
            img: "https://images.unsplash.com/photo-1623901141703-a12b23cef3a5?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "익선동",
            desc: "좁은 골목 사이로 개성 넘치는 레스토랑과 전통 찻집이 숨어있는 한옥 명소입니다.",
            img: "https://images.unsplash.com/photo-1579581566861-c88f3a38a7e0?q=80&w=2940&auto=format&fit=crop"
        }
    ],
    "art": [
        {
            name: "리움미술관",
            desc: "한국 고미술과 현대미술, 국제미술이 어우러진 수준 높은 복합문화공간입니다.",
            img: "https://images.unsplash.com/photo-1621216262452-e5a953a71391?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "국립중앙박물관",
            desc: "한국의 역사와 문화를 한눈에 볼 수 있는 곳. 방대한 유물과 기획 전시를 여유롭게 둘러보세요.",
            img: "https://images.unsplash.com/photo-1592500052382-720072e6b014?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "대학로",
            desc: "다양한 연극과 뮤지컬을 즐길 수 있는 공연 예술의 중심지입니다.",
            img: "https://images.unsplash.com/photo-1580851886842-8d7a16f5b741?q=80&w=2940&auto=format&fit=crop"
        }
    ],
    "entertainment": [
        {
            name: "롯데월드",
            desc: "실내외에서 스릴 넘치는 어트랙션과 다채로운 퍼레이드를 즐길 수 있는 테마파크입니다.",
            img: "https://images.unsplash.com/photo-1587823338383-7d72b53589b2?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "코엑스 아쿠아리움",
            desc: "다양한 해양 생물들을 만나며 바닷속 세상을 탐험하는 신비로운 경험.",
            img: "https://images.unsplash.com/photo-1534591320392-06b2d88a1013?q=80&w=2940&auto=format&fit=crop"
        },
        {
            name: "홍대",
            desc: "버스킹, 클럽, 맛집, 쇼핑 등 젊음의 모든 것을 즐길 수 있는 활기찬 거리입니다.",
            img: "https://images.unsplash.com/photo-1557313491-a4b5b7b1372b?q=80&w=2940&auto=format&fit=crop"
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const themeFiltersContainer = document.getElementById('theme-filters');
    const destinationsGrid = document.getElementById('destinations-grid');

    let activeTheme = 'history'; // Set default theme

    // Function to render destination cards
    const renderDestinations = (theme) => {
        destinationsGrid.innerHTML = '';
        const selectedDestinations = destinations[theme] || [];

        selectedDestinations.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <img src="${dest.img}" alt="${dest.name}" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">${dest.name}</h3>
                    <p class="card-desc">${dest.desc}</p>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    };

    // Function to render theme buttons
    const renderThemeButtons = () => {
        for (const [key, value] of Object.entries(themes)) {
            const button = document.createElement('button');
            button.className = 'theme-btn';
            button.dataset.theme = key;
            button.textContent = value;

            if (key === activeTheme) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                activeTheme = key;
                // Update active class on buttons
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                // Render destinations for the new active theme
                renderDestinations(activeTheme);
            });

            themeFiltersContainer.appendChild(button);
        }
    };

    // Initial Render
    renderThemeButtons();
    renderDestinations(activeTheme);
});