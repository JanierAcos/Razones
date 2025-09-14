// Frases de amor
const frases = [
    "Porque tu sonrisa ilumina hasta mi día más oscuro.",
    "Porque tienes la capacidad de hacerme feliz con las pequeñas cosas.",
    "Porque cuando te conocí, supe que eras alguien especial.",
    "Porque amo la forma en que te preocupas por los demás.",
    "Porque contigo encontré mi lugar en el mundo.",
    "Porque me haces ser una mejor persona cada día.",
    "Porque tu voz es la melodía que calma mi alma.",
    "Porque en tus ojos encontré mi hogar.",
    "Porque eres la persona con la que quiero despertar cada mañana.",
    "Porque amo tu forma de ver la vida.",
    "Porque me aceptas tal y como soy, con mis virtudes y defectos.",
    "Porque contigo hasta el silencio es cómodo.",
    "Porque me haces reír incluso cuando no tengo ganas.",
    "Porque en tu abrazo encuentro la paz que necesito.",
    "Porque cada momento a tu lado es un recuerdo que atesoro."
];

// Colores de tulipanes
const tulipanColors = [
    { color: "#e91e63", dark: "#c2185b" },
    { color: "#9c27b0", dark: "#7b1fa2" },
    { color: "#673ab7", dark: "#512da8" },
    { color: "#3f51b5", dark: "#303f9f" },
    { color: "#2196f3", dark: "#1976d2" },
    { color: "#03a9f4", dark: "#0288d1" },
    { color: "#00bcd4", dark: "#0097a7" },
    { color: "#009688", dark: "#00796b" },
    { color: "#4caf50", dark: "#388e3c" },
    { color: "#ffeb3b", dark: "#fbc02d" },
    { color: "#ff9800", dark: "#f57c00" },
    { color: "#ff5722", dark: "#d84315" },
    { color: "#795548", dark: "#5d4037" },
    { color: "#9e9e9e", dark: "#616161" },
    { color: "#607d8b", dark: "#455a64" }
];

// Navegación entre secciones
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Quitar clase active de todos los links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Añadir clase active al link clickeado
        this.classList.add('active');
        
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección correspondiente
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Configuración del carrusel
const carousel = document.getElementById('tulipan-carousel');
const indicatorsContainer = document.getElementById('carousel-indicators');
const numTulipanes = 15;
const tulipanesPorSlide = 3;
const totalSlides = Math.ceil(numTulipanes / tulipanesPorSlide);
let currentSlide = 0;

// Crear slides del carrusel
for (let s = 0; s < totalSlides; s++) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.id = `slide-${s}`;
    
    // Crear indicador
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    if (s === 0) indicator.classList.add('active');
    indicator.dataset.slide = s;
    indicator.addEventListener('click', () => goToSlide(s));
    indicatorsContainer.appendChild(indicator);
    
    // Añadir tulipanes al slide
    for (let i = 0; i < tulipanesPorSlide; i++) {
        const index = s * tulipanesPorSlide + i;
        if (index >= numTulipanes) break;
        
        const tulipan = document.createElement('div');
        tulipan.className = 'tulipan';
        tulipan.style.setProperty('--delay', index);
        tulipan.style.setProperty('--tulip-color', tulipanColors[index].color);
        tulipan.style.setProperty('--tulip-dark', tulipanColors[index].dark);
        
        // Tallo
        const stem = document.createElement('div');
        stem.className = 'stem';
        
        // Hoja
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Flor
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Pétalos
        for (let j = 1; j <= 5; j++) {
            const petal = document.createElement('div');
            petal.className = `petal petal${j}`;
            flower.appendChild(petal);
        }
        
        tulipan.appendChild(stem);
        tulipan.appendChild(leaf);
        tulipan.appendChild(flower);
        
        slide.appendChild(tulipan);
    }
    
    carousel.appendChild(slide);
}

// Función para ir a un slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar indicadores
    document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        if (i === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Navegación del carrusel
document.getElementById('carousel-prev').addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        goToSlide(totalSlides - 1);
    }
});

document.getElementById('carousel-next').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(0);
    }
});

// Auto-avance del carrusel
setInterval(() => {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(0);
    }
}, 5000);

// Generar corazones flotantes
const heartsContainer = document.getElementById('hearts');
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.color = tulipanColors[Math.floor(Math.random() * tulipanColors.length)].color;
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 300);

// Mostrar mensajes
const messageBtn = document.getElementById('message-btn');
const messageElement = document.getElementById('message');
let usedPhrases = [];

if (messageBtn && messageElement) {
    messageBtn.addEventListener('click', () => {
        if (usedPhrases.length === frases.length) {
            usedPhrases = [];
        }
        
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * frases.length);
        } while (usedPhrases.includes(randomIndex));
        
        usedPhrases.push(randomIndex);
        
        messageElement.style.opacity = 0;
        
        setTimeout(() => {
            messageElement.textContent = frases[randomIndex];
            messageElement.style.opacity = 1;
            
            // Determinar a qué slide pertenece este tulipán
            const slideIndex = Math.floor(randomIndex / tulipanesPorSlide);
            
            // Si no estamos en ese slide, cambiar a él
            if (slideIndex !== currentSlide) {
                goToSlide(slideIndex);
            }
            
            // Destacar el tulipán correspondiente
            const tulipanes = document.querySelectorAll(`#slide-${slideIndex} .tulipan`);
            const tulipanIndex = randomIndex % tulipanesPorSlide;
            
            if (tulipanes[tulipanIndex]) {
                tulipanes[tulipanIndex].style.transform = 'scale(1.1)';
                tulipanes[tulipanIndex].style.transition = 'transform 0.5s ease';
                
                setTimeout(() => {
                    tulipanes[tulipanIndex].style.transform = 'scale(1)';
                }, 1500);
            }
        }, 500);
    });
}