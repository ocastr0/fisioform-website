/**
 * FisioForm - Pilates Studio
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Atualizar a hora atual
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Atualiza a cada minuto
    
    // Inicializar animações de scroll
    initScrollAnimations();
    
    // Inicializar smooth scroll para links âncora
    initSmoothScroll();
    
    // Inicializar cálculo de IMC
    initBMICalculator();
});

/**
 * Atualiza o horário atual no formato desejado
 */
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    if (!currentTimeElement) return;
    
    const now = new Date();
    
    // Formato: HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    currentTimeElement.textContent = `${hours}:${minutes}`;
}

/**
 * Inicializa as animações de entrada ao scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inicializa o smooth scroll para links âncora
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Inicializa a calculadora de IMC
 */
function initBMICalculator() {
    const bmiForm = document.getElementById('bmi-form');
    if (!bmiForm) return;
    
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; // Converter para metros
        
        if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
            alert('Por favor, insira valores válidos para peso e altura.');
            return;
        }
        
        // Cálculo do IMC
        const bmi = weight / (height * height);
        const bmiRounded = bmi.toFixed(1);
        
        // Determinação da categoria
        let category, color;
        if (bmi < 18.5) {
            category = 'Abaixo do peso';
            color = 'text-info';
        } else if (bmi < 25) {
            category = 'Peso normal';
            color = 'text-success';
        } else if (bmi < 30) {
            category = 'Sobrepeso';
            color = 'text-warning';
        } else {
            category = 'Obesidade';
            color = 'text-danger';
        }
        
        // Exibir o resultado
        const resultElement = document.getElementById('bmi-result');
        resultElement.innerHTML = `
            <div class="text-center">
                <h3 class="display-1 ${color} fw-bold">${bmiRounded}</h3>
                <p class="lead ${color} fw-bold">${category}</p>
                <div class="progress mt-3 mb-3">
                    <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-warning" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="row g-0 text-center small">
                    <div class="col-3 text-info">Abaixo</div>
                    <div class="col-3 text-success">Normal</div>
                    <div class="col-3 text-warning">Sobrepeso</div>
                    <div class="col-3 text-danger">Obesidade</div>
                </div>
                <p class="mt-4">O IMC é apenas uma medida inicial. Para uma avaliação completa, consulte um profissional de saúde.</p>
            </div>
        `;
    });
}
