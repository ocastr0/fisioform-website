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
    
    // Inicializar filtros da galeria
    initGalleryFilters();
    
    // Tratamento de erro para imagens
    handleImageErrors();
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
 * Inicializa os filtros da galeria
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline-primary');
            
            // Filtrar itens da galeria
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'todas' || filter === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Tratamento para imagens que não carregam
 */
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Erro ao carregar imagem:', this.src);
            // Substitui com uma imagem padrão ou placeholder
            this.src = 'assets/img/placeholder.jpg';
            this.alt = 'Imagem temporariamente indisponível';
        });
    });
}

/**
 * Validação do formulário de contato
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Aqui você adicionaria a lógica para enviar o formulário
        // Por enquanto, apenas exibimos uma mensagem de sucesso
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
        
        setTimeout(() => {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = '<strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.';
            
            contactForm.reset();
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}
