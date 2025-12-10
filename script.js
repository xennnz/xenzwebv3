
// Smooth Scroll Navbar
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".navbar a").forEach(a => a.classList.remove("active"));
    this.classList.add("active");
  });
});

// Fade-in animation for elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .project-card").forEach(el => observer.observe(el));

// Animate skill bar on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
  skillBars.forEach(bar => {
    let width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}

window.addEventListener("scroll", () => {
  const skillsSection = document.querySelector(".skills-section");
  const rect = skillsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    animateSkills();
  }
});

// Skill Animation on Scroll
const skills = document.querySelectorAll(".skill-per");

window.addEventListener("scroll", () => {
  skills.forEach(skill => {
    const rect = skill.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (rect < screenHeight - 50) {
      skill.style.width = skill.getAttribute("per") + "%";
      skill.classList.add("active");
    }
  });
});

let num1, num2, correctAnswer;
let score = 0;

function generateQuestion() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 + num2;

  document.getElementById("question").textContent =
    `What is ${num1} plus ${num2}?`;
}

function checkAnswer() {
  const userValue = Number(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (userValue === correctAnswer) {
    feedback.textContent = "🎉 Correct! Great job!";
    score++;
  } else {
    feedback.textContent = `❌ Wrong! The correct answer is ${correctAnswer}.`;
  }

  document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
  generateQuestion();
}

generateQuestion();

function launchConfetti(){
  var duration = 2 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 12, spread: 90, origin:{x:Math.random(), y:Math.random()*0.5} });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

const questions = [
  { q: "5 + 7 = ?", a: "12" },
  { q: "10 - 4 = ?", a: "6" },
  { q: "3 × 6 = ?", a: "18" },
  { q: "Bahasa Inggris dari 'Meja' adalah?", a: "Table" },
  { q: "Bahasa Inggris dari 'Buku' ?", a: "Book" },
  { q: "Bahasa Inggris dari 'Cantik' ?", a: "Beautiful" }
];

// sounds
const correctAudio = new Audio("correct.mp3");
const wrongAudio = new Audio("wrong.mp3");

function setRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  current = questions[randomIndex];
  document.getElementById("question").textContent = current.q;
}

setRandomQuestion();

document.getElementById("submit").addEventListener("click", () => {
  const answer = document.getElementById("answer").value.trim();

  if (answer.toLowerCase() === current.a.toLowerCase()) {
    score++;
    document.getElementById("result").textContent = "Benar! 🎉";
    document.getElementById("result").style.color = "green";
    correctAudio.play();
    launchConfetti();
  } else {
    document.getElementById("result").textContent = "Salah!";
    document.getElementById("result").style.color = "red";
    wrongAudio.play();
    document.querySelector(".game-box").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".game-box").classList.remove("shake");
    }, 400);
  }

  document.getElementById("score").textContent = score;
  document.getElementById("answer").value = "";
  setRandomQuestion();
});

function launchConfetti(){
  confetti({ particleCount: 200, spread: 80, origin:{ y:0.6 }});
}
