// 1. Efek Mengetik (Typing Effect)
const words = ["Web Developer", "UI/UX Designer", "Freelancer"];
let i = 0;
let timer;
let isDeleting = false;
let charIndex = 0;

function typingEffect() {
    let currentWord = words[i];
    let typewriterElement = document.getElementById("typewriter");

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Jeda sebelum mulai menghapus
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        i = (i + 1) % words.length; // Lanjut ke kata berikutnya
        typeSpeed = 500;
    }

    setTimeout(typingEffect, typeSpeed);
}

// Jalankan efek mengetik
document.addEventListener("DOMContentLoaded", () => {
    if(words.length) setTimeout(typingEffect, 1000);
});

// 2. Animasi Saat Scroll (Intersection Observer)
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
  element.classList.add('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  })
}

// Event listener untuk scroll
window.addEventListener('scroll', () => {
  handleScrollAnimation();
});

// Panggil sekali saat dimuat untuk elemen yang sudah ada di layar
handleScrollAnimation();