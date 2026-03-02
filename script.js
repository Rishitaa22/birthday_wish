const birthdayDate = new Date("March 3, 2026 00:00:00").getTime();
let countdownFinished = false;

let isMusicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById("bdayAudio");
    const btn = document.getElementById("musicToggle");
    if (isMusicPlaying) {
        audio.pause();
        btn.innerHTML = "🔇";
    } else {
        audio.play();
        btn.innerHTML = "🎵";
    }
    isMusicPlaying = !isMusicPlaying;
}

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance <= 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "0d 0h 0m 0s";
        document.getElementById("queen-text").innerHTML = "IT IS TIME!";
        
        if (!countdownFinished) {
            countdownFinished = true;
            document.getElementById("clickMeBtn").style.display = "block";
        }
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }
}, 1000);

const quizData = [
    { question: "1. Who is your bestfriend?", options: ["Rusi", "Rusi", "Rusi"], correctIndices: [0, 1, 2] },
    { question: "2. What is Rusi's favourite song?", options: ["Choo Lo - The local Train", "Karale karalinte - Vineeth Sreenivasan", "Kattu Mooliyo - Vineeth Sreenivasan"], correctIndices: [0] },
    { question: "3. What is her favourite colour?", options: ["kili pacha", "neela in general", "chomla"], correctIndices: [1] },
    { question: "4. What is Rusi's favourite food from the below?", options: ["Ponnu", "mandi", "veg buriyani"], correctIndices: [1] },
    { question: "5. When is your birthday?", options: ["july 3", "august 32", "march 3"], correctIndices: [2] }
];

let currentQuestionIndex = 0;

function startPrank() {
    document.getElementById("initialView").style.display = "none";
    document.getElementById("bdayAudio").play();
    isMusicPlaying = true;
    document.getElementById("musicToggle").style.display = "block";
    document.getElementById("quizIntro").style.display = "block";
    document.getElementById("quizIntro").style.animation = "popIn 0.5s ease-out forwards";
}

function startQuiz() {
    document.getElementById("quizIntro").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    document.getElementById("feedbackText").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
    
    const qData = quizData[currentQuestionIndex];
    document.getElementById("questionTitle").innerText = qData.question;
    
    const optionsDiv = document.getElementById("optionsContainer");
    optionsDiv.innerHTML = ""; 
    
    for (let i = 0; i < qData.options.length; i++) {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerText = qData.options[i];
        btn.onclick = function() { checkAnswer(i); };
        optionsDiv.appendChild(btn);
    }
}

function checkAnswer(selectedIndex) {
    const qData = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById("feedbackText");
    const nextBtn = document.getElementById("nextBtn");
    const allOptionButtons = document.querySelectorAll(".quiz-option");
    
    if (qData.correctIndices.includes(selectedIndex)) {
        if (currentQuestionIndex === quizData.length - 1) {
            document.getElementById("quizContainer").style.display = "none";
            document.getElementById("quizEnd").style.display = "block";
            document.getElementById("quizEnd").style.animation = "popIn 0.5s ease-out forwards";
        } else {
            feedbackEl.style.color = "#25D366"; 
            feedbackEl.innerText = "sheri utharammm!! adutha chodyam!";
            nextBtn.style.display = "inline-block";
            
            allOptionButtons.forEach(btn => btn.disabled = true);
        }
    } else {
        const wrongMessages = [
            "Are you sure abt that? 🤔", 
            "Try again! 🤨", 
            "Nope, that ain't it! 😂"
        ];
        const randomMsg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
        feedbackEl.style.color = "#ff6b6b"; 
        feedbackEl.innerText = randomMsg;
        nextBtn.style.display = "none";
    }
}

function goToNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function revealRealMessage() {
    document.getElementById("quizEnd").style.display = "none";
    releaseBalloons();
    setTimeout(() => {
        const msg = document.getElementById("birthdayMessage");
        msg.style.display = "block";
        msg.style.animation = "popIn 1s ease-out forwards";
    }, 600);
}

function openLetter() {
    // Hide the birthday message and the photo flip card to make room for the letter
    document.getElementById("birthdayMessage").style.display = "none";
    document.getElementById("photoCard").style.display = "none";
    
    // Show the letter
    const letter = document.getElementById("letterContainer");
    letter.style.display = "block";
    letter.style.animation = "fadeIn 1.5s ease-in forwards";
}

function goBackToMessage() {
    // Hide the letter
    document.getElementById("letterContainer").style.display = "none";
    
    // Show the photo card and birthday message again
    document.getElementById("photoCard").style.display = "block";
    document.getElementById("birthdayMessage").style.display = "block";
    document.getElementById("birthdayMessage").style.animation = "popIn 0.5s ease-out forwards";
}

function releaseBalloons() {
    const container = document.getElementById('balloon-container');
    const balloonColors = ['🎈', '✨', '🍾', '🥂']; 
    
    for(let i = 0; i < 30; i++) {
        let balloon = document.createElement('div');
        balloon.innerHTML = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.className = 'balloon';
        balloon.style.left = (Math.random() * 100) + 'vw';
        balloon.style.animationDuration = (Math.random() * 3 + 3) + 's';
        balloon.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(balloon);
    }

}

