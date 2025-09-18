// ---------- GLOBAL VARIABLES ----------
const introLine1 = document.getElementById('intro-line1');
const introLine2 = document.getElementById('intro-line2');
const startBtn = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');

const slidesContainer = document.getElementById('slides-container');
const slideTitle = document.getElementById('slide-title');
const slideText = document.getElementById('slide-text');
const nextBtn = document.getElementById('next-btn');

const petalsContainer = document.getElementById('petals');
const bgMusic = document.getElementById('bg-music');

// ---------- TYPEWRITER FUNCTION ----------
function typeWriter(element, text, speed = 80, callback) {
  let i = 0;
  element.textContent = "";
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if(i === text.length){
      clearInterval(interval);
      if(callback) callback();
    }
  }, speed);
}

// ---------- INTRO TEXT ----------
const introText1 = "To the One I Love";
const introText2 = "(My Naughty Lady 🤭😂)";

typeWriter(introLine1, introText1, 80, () => {
  typeWriter(introLine2, introText2, 80);
});

// ---------- SLIDES DATA ----------
const slides = [
  { title: "Introduction", text: "I’m writing this not to pressure you or make you feel guilty — only to explain my heart plainly, because I owe you honesty. I loved you then, and I love you now. If reading this feels hard, know it’s because I want you to see my reasoning and understand how much you truly matter.", bg: "#E6E6FA" },
  { title: "Why I Pull Away", text: "When I get angry, I fear saying things I might regret — words that could hurt you or damage what we have. My way of protecting us has been to step back and calm myself. I know this can feel like rejection or coldness, and for those times I hurt you, I am deeply sorry.", bg: "#FFE5B4" },
  { title: "I See You", text: "I understand that when you feel hurt or angry, closeness and reassurance are what you need. That is valid, natural, and important. I respect that. My intention has never been to make you feel abandoned when I step back to calm down.", bg: "#DFFFE6" },
  { title: "My Request", text: "I want us to meet somewhere in the middle so we stop accidentally hurting each other. I need time to calm down when I’m heated to protect our relationship, but I also want to learn how to give you reassurance in a way that works for both of us.", bg: "#B3E5FC" },
  { title: "Apology / Understanding", text: "If this message finds you hurting because of me, I am sorry. If you feel wronged in any way and want to say sorry, I will accept it with gratitude. More than a formal apology, I hope we truly understand the why behind what happened and learn a better way to communicate.", bg: "#F3E6FF" },
  { title: "Closing / Affirmation", text: "You mattered to me then, and you matter now. I need you. If you’re open, I want to talk this through — to explain my side, listen to yours, and try this middle-ground plan together. If you don’t want to talk, I will respect your decision. My wish is only that you are safe and well.", bg: "#FFDDCC" },
  { title: "Signature", text: "With respect and care,\n— [Your Name]\n\nYou were, you are, and you will always be deeply loved. I hope this message helps you understand my heart and my intentions. I am here, patiently, hoping for understanding, and wishing only the best for you — always.", bg: "#FFF8E7" }
];

let currentSlide = 0;

// ---------- PETALS ----------
function createPetals() {
  const colors = ["#FFC0CB","#FFB6C1","#E6E6FA","#FFF0F5","#FFDDEE"];
  for(let i=0;i<30;i++){
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random()*window.innerWidth+'px';
    petal.style.width = 10+Math.random()*25+'px';
    petal.style.height = petal.style.width;
    petal.style.background = colors[Math.floor(Math.random()*colors.length)];
    petal.style.opacity = 0.7 + Math.random()*0.3;
    petal.style.animationDuration = 5 + Math.random()*5 + 's';
    petal.style.animationDelay = Math.random()*5 + 's';
    petal.style.transform = `rotate(${Math.random()*360}deg)`;
    petalsContainer.appendChild(petal);

    // Continuous horizontal drift
    let drift = Math.random()*40 - 20;
    let direction = Math.random() > 0.5 ? 1 : -1;
    setInterval(() => {
      drift += (Math.random()*2 -1) * direction;
      petal.style.left = (parseFloat(petal.style.left) + drift*0.01) % window.innerWidth + 'px';
    }, 100);
  }
}

// ---------- SHOW SLIDE ----------
function showSlide(index){
  if(index>=slides.length) return;
  const slide = slides[index];
  slidesContainer.style.backgroundColor = slide.bg;
  slideTitle.textContent = slide.title;
  slideText.textContent = "";
  nextBtn.classList.add('hidden');
  typeWriter(slideText, slide.text, 30, () => {
    nextBtn.classList.remove('hidden');
  });
}

// ---------- NEXT BUTTON ----------
nextBtn.addEventListener('click', () => {
  currentSlide++;
  if(currentSlide < slides.length){
    showSlide(currentSlide);
  } else {
    nextBtn.style.display = "none";
  }
});

// ---------- START BUTTON ----------
startBtn.addEventListener('click', () => {
  introScreen.classList.add('hidden');
  slidesContainer.classList.remove('hidden');
  createPetals();
  bgMusic.volume = 0.6;
  bgMusic.play();
  // Gradually increase volume
  let vol = 0.6;
  const volInterval = setInterval(() => {
    vol += 0.01;
    if(vol >= 0.9){
      vol = 0.9;
      clearInterval(volInterval);
    }
    bgMusic.volume = vol;
  }, 30);
  showSlide(currentSlide);
});
