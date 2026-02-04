// =================================================================================
// Data Structures
// =================================================================================
let destinationsByNeighborhood = {};
let initializedDestinations;
let tripCourse = [];

// =================================================================================
// Helper Functions
// =================================================================================
const getBeenThereStatus = (placeName) => localStorage.getItem(`beenThere_${placeName}`) === 'true';
const setBeenThereStatus = (placeName, status) => localStorage.setItem(`beenThere_${placeName}`, status);

const getTripCourse = () => JSON.parse(localStorage.getItem('tripCourse') || '[]');
const saveTripCourse = (course) => localStorage.setItem('tripCourse', JSON.stringify(course));

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

// =================================================================================
// Challenge Logic
// =================================================================================
const calculateProgress = () => {
    const progress = {};
    let totalVisited = 0;
    let totalPlaces = 0;

    for (const neighborhood in initializedDestinations) {
        const places = initializedDestinations[neighborhood];
        const visitedCount = places.filter(dest => dest.beenThere).length;
        const totalCount = places.length;
        progress[neighborhood] = { visited: visitedCount, total: totalCount, percentage: totalCount > 0 ? (visitedCount / totalCount) * 100 : 0 };
        totalVisited += visitedCount;
        totalPlaces += totalCount;
    }
    progress.total = { visited: totalVisited, total: totalPlaces, percentage: totalPlaces > 0 ? (totalVisited / totalPlaces) * 100 : 0 };
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

// =================================================================================
// Main Application Logic
// =================================================================================
document.addEventListener('DOMContentLoaded', async () => {
    const destinationsGrid = document.getElementById('destinations-grid');

    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        destinationsByNeighborhood = await response.json();
    } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
        destinationsGrid.innerHTML = '<p class="no-results">장소 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.</p>';
        return;
    }

    initializedDestinations = initializeDestinations();
    tripCourse = getTripCourse();

    // --- DOM Elements ---
    const neighborhoodFiltersContainer = document.getElementById('neighborhood-filters');
    const searchInput = document.getElementById('search-input');
    const mapModal = document.getElementById('map-modal');
    const challengeModal = document.getElementById('challenge-modal');
    const tripCourseModal = document.getElementById('trip-course-modal');
    const tripCourseList = document.getElementById('trip-course-list');

    let activeNeighborhood = Object.keys(destinationsByNeighborhood)[0]; // 첫 번째 동네를 기본값으로 설정
    let draggedItemIndex = null;

    // --- Toast Notification ---
    const showToast = (message) => {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 500);
        }, 2500);
    };

    // --- Modal Control ---
    const openModal = (modalElement) => modalElement.classList.remove('hidden');
    const closeModal = (modalElement) => modalElement.classList.add('hidden');

    const setupModalCloseEvents = (modalElement) => {
        modalElement.querySelector('.modal-close').addEventListener('click', () => closeModal(modalElement));
        modalElement.addEventListener('click', e => { if (e.target === modalElement) closeModal(modalElement); });
    };
    
    setupModalCloseEvents(mapModal);
    setupModalCloseEvents(challengeModal);
    setupModalCloseEvents(tripCourseModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [mapModal, challengeModal, tripCourseModal].forEach(m => {
                if (!m.classList.contains('hidden')) closeModal(m);
            });
        }
    });

    // --- Render Functions ---
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
                <div class="card-actions">
                    <div class="been-there-wrapper">
                        <label class="been-there-label">
                            <input type="checkbox" class="been-there-checkbox" ${dest.beenThere ? 'checked' : ''} data-name="${dest.name}">
                            <span>가봤어요</span>
                        </label>
                    </div>
                    <button class="add-to-course-btn" data-name="${dest.name}">+ 코스에 추가</button>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    };

    const renderNeighborhoodButtons = () => {
        const neighborhoods = Object.keys(destinationsByNeighborhood);
        neighborhoodFiltersContainer.innerHTML = ''; // 기존 버튼 초기화

        neighborhoods.forEach(key => {
            const button = document.createElement('button');
            button.className = 'theme-btn';
            button.dataset.neighborhood = key;
            button.textContent = key;
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

    const renderTripCourse = () => {
        tripCourseList.innerHTML = '';
        if (tripCourse.length === 0) {
            tripCourseList.innerHTML = '<p class="no-results">코스에 추가된 장소가 없습니다.</p>';
            return;
        }
        tripCourse.forEach((placeName, index) => {
            const item = document.createElement('li');
            item.className = 'trip-course-item';
            item.setAttribute('draggable', 'true');
            item.dataset.index = index;
            item.innerHTML = `<span>${index + 1}. ${placeName}</span><button class="remove-from-course-btn" data-name="${placeName}">&times;</button>`;
            tripCourseList.appendChild(item);
        });
    };

    // --- Modal Openers ---
    const openMapModal = (placeName) => {
        let destination;
        for (const neighborhood in initializedDestinations) {
            const found = initializedDestinations[neighborhood].find(d => d.name === placeName);
            if (found) { destination = found; break; }
        }
        if (!destination) return;
        
        document.getElementById('map-container').innerHTML = `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed" allowfullscreen="" loading="lazy"></iframe>`;
        document.getElementById('modal-details-container').innerHTML = `
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
        const neighborhoods = Object.keys(destinationsByNeighborhood);
        document.getElementById('challenge-content').innerHTML = `
            <div class="challenge-group"><h3>총 진행률 (${progress.total.visited}/${progress.total.total})</h3><div class="progress-bar-container"><div class="progress-bar" style="width: ${progress.total.percentage}%;">${Math.round(progress.total.percentage)}%</div></div></div>
            <div class="challenge-group"><h3>획득한 뱃지</h3><div class="badge-container">${badges.length > 0 ? badges.map(b => `<span class="badge">${b}</span>`).join('') : '<span class="badge locked">아직 뱃지 없음</span>'}</div></div>
            <div class="challenge-group"><h3>동네별 진행률</h3>${neighborhoods.map(n => {
                const prog = progress[n] || { visited: 0, total: 0, percentage: 0 };
                return `<p>${n} (${prog.visited}/${prog.total})</p><div class="progress-bar-container"><div class="progress-bar" style="width: ${prog.percentage}%;"></div></div>`
            }).join('')}</div>
        `;
        openModal(challengeModal);
    };

    const openTripCourseModal = () => {
        renderTripCourse();
        openModal(tripCourseModal);
    };

    // --- Event Listeners ---
    searchInput.addEventListener('input', e => renderDestinations(activeNeighborhood, e.target.value));

    destinationsGrid.addEventListener('click', (e) => {
        const checkbox = e.target.closest('.been-there-checkbox');
        if (checkbox) {
            e.stopPropagation();
            const placeName = checkbox.dataset.name;
            const isChecked = checkbox.checked;
            setBeenThereStatus(placeName, isChecked);
            checkbox.closest('.destination-card').classList.toggle('been-there', isChecked);
            for (const neighborhood in initializedDestinations) {
                const dest = initializedDestinations[neighborhood].find(d => d.name === placeName);
                if (dest) { dest.beenThere = isChecked; break; }
            }
            return;
        }

        const addToCourseBtn = e.target.closest('.add-to-course-btn');
        if (addToCourseBtn) {
            e.stopPropagation();
            const placeName = addToCourseBtn.dataset.name;
            if (!tripCourse.includes(placeName)) {
                tripCourse.push(placeName);
                saveTripCourse(tripCourse);
                showToast(`${placeName}이(가) 코스에 추가되었습니다.`);
            } else {
                showToast('이미 코스에 추가된 장소입니다.');
            }
            return;
        }
        
        const card = e.target.closest('.destination-card');
        if (card) openMapModal(card.dataset.name);
    });

    document.getElementById('challenge-btn').addEventListener('click', openChallengeModal);
    document.getElementById('trip-course-btn').addEventListener('click', openTripCourseModal);

    // --- Trip Course Modal Event Listeners (Remove + Drag/Drop) ---
    tripCourseList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-from-course-btn');
        if (removeBtn) {
            const placeName = removeBtn.dataset.name;
            tripCourse = tripCourse.filter(p => p !== placeName);
            saveTripCourse(tripCourse);
            renderTripCourse();
        }
    });

    tripCourseList.addEventListener('dragstart', (e) => {
        const draggedItem = e.target.closest('.trip-course-item');
        if (!draggedItem) return;
        draggedItemIndex = parseInt(draggedItem.dataset.index, 10);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => draggedItem.classList.add('dragging'), 0);
    });

    tripCourseList.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tripCourseList.addEventListener('drop', (e) => {
        e.preventDefault();
        const dropTarget = e.target.closest('.trip-course-item');
        if (dropTarget && draggedItemIndex !== null) {
            const dropIndex = parseInt(dropTarget.dataset.index, 10);
            const [draggedElement] = tripCourse.splice(draggedItemIndex, 1);
            tripCourse.splice(dropIndex, 0, draggedElement);
            saveTripCourse(tripCourse);
            renderTripCourse();
        }
    });
    
    tripCourseList.addEventListener('dragend', (e) => {
        const draggedItem = e.target.closest('.trip-course-item');
        if(draggedItem) {
            draggedItem.classList.remove('dragging');
        }
        draggedItemIndex = null;
    });

    document.getElementById('clear-course-btn').addEventListener('click', () => {
        if (confirm('정말 코스를 모두 비우시겠습니까?')) {
            tripCourse = [];
            saveTripCourse(tripCourse);
            renderTripCourse();
        }
    });

    // --- Initial Render ---
    renderNeighborhoodButtons();
    renderDestinations(activeNeighborhood);
});