document.addEventListener('DOMContentLoaded', () => {
    const storyLog = document.getElementById('story-log');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');

    // AI 응답을 생성하는 함수 (현재는 임시)
    async function getAIResponse(prompt) {
        // 이 부분은 나중에 실제 AI 모델 API 호출로 대체됩니다.
        console.log("AI 프롬프트:", prompt);
        
        // 임시 응답 로직
        const responses = [
            "당신은 으스스한 동굴 입구에 도착했습니다. 안에서는 차가운 바람이 불어옵니다.",
            "길은 두 갈래로 나뉩니다. 왼쪽은 어두운 숲으로, 오른쪽은 높은 산으로 이어집니다.",
            "작은 오두막을 발견했습니다. 굴뚝에서는 연기가 피어오르고 있습니다.",
            "강가에 도착했습니다. 낡은 나룻배가 하나 보입니다."
        ];
        
        // 실제 API를 호출하는 것처럼 보이게 하기 위해 약간의 딜레이를 줍니다.
        return new Promise(resolve => {
            setTimeout(() => {
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resolve(randomResponse);
            }, 500);
        });
    }

    // 스토리를 로그에 추가하는 함수
    function addToStory(text, type = 'story') {
        const paragraph = document.createElement('div');
        paragraph.textContent = text;
        paragraph.classList.add(type === 'story' ? 'story-paragraph' : 'user-choice');
        storyLog.appendChild(paragraph);
        // 새 메시지가 추가될 때마다 맨 아래로 스크롤
        storyLog.parentElement.scrollTop = storyLog.parentElement.scrollHeight;
    }

    // 사용자 입력 처리 함수
    async function handleUserInput() {
        const choice = userInput.value.trim();
        if (choice === '') return;

        addToStory(`> ${choice}`, 'user');
        userInput.value = '';
        userInput.disabled = true;
        submitBtn.disabled = true;

        // AI로부터 다음 이야기 조각을 받아옵니다.
        // 현재는 이전 대화 내용이 포함되지 않지만, 추후에는 전체 대화 로그를 전달해야 합니다.
        const aiResponse = await getAIResponse(choice);
        addToStory(aiResponse, 'story');

        userInput.disabled = false;
        submitBtn.disabled = false;
        userInput.focus();
    }

    // 이벤트 리스너 설정
    submitBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // 초기 시작 메시지
    function startStory() {
        const initialMessage = "당신은 끝없이 펼쳐진 안개 낀 평원 한가운데에 서 있습니다. 사방이 고요하고, 길은 보이지 않습니다. 무엇을 하시겠습니까?";
        addToStory(initialMessage);
        userInput.focus();
    }

    startStory();
});
