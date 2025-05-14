/**
 * FisioForm - Pilates Studio
 * API Integration Script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Carregar exercícios da API
    loadExerciseTips();
});

/**
 * Carrega dicas de exercícios da API Exercises
 */
async function loadExerciseTips() {
    const exerciseTipsContainer = document.getElementById('exercise-tips');
    if (!exerciseTipsContainer) return;
    
    try {
        // Utilizando a API Exercises
        const response = await fetch('https://api.api-ninjas.com/v1/exercises?muscle=abdominals&type=stretching', {
            headers: {
                'X-Api-Key': 'YOUR_API_KEY' // Substitua com sua chave de API
            }
        });
        
        if (!response.ok) {
            throw new Error('Falha ao carregar dados da API');
        }
        
        const exercises = await response.json();
        
        // Limitando a 3 exercícios para exibição
        const displayExercises = exercises.slice(0, 3);
        
        // Limpar container e exibir os exercícios
        exerciseTipsContainer.innerHTML = '';
        
        displayExercises.forEach(exercise => {
            const exerciseCard = document.createElement('div');
            exerciseCard.className = 'col-lg-4 col-md-6 mb-4';
            exerciseCard.innerHTML = `
                <div class="card h-100 border-0 rounded-4 shadow-sm health-tip-card">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="icon-box bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                                <i class="fas fa-dumbbell text-primary"></i>
                            </div>
                            <h3 class="card-title h5 mb-0">${exercise.name}</h3>
                        </div>
                        <p class="card-text"><strong>Tipo:</strong> ${capitalizeFirstLetter(exercise.type)}</p>
                        <p class="card-text"><strong>Músculo:</strong> ${capitalizeFirstLetter(exercise.muscle)}</p>
                        <p class="card-text"><strong>Dificuldade:</strong> ${capitalizeFirstLetter(exercise.difficulty)}</p>
                        <div class="collapse" id="collapse${sanitizeId(exercise.name)}">
                            <p class="card-text">${exercise.instructions}</p>
                        </div>
                        <button class="btn btn-link p-0 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${sanitizeId(exercise.name)}" aria-expanded="false">
                            Ver instruções
                        </button>
                    </div>
                </div>
            `;
            exerciseTipsContainer.appendChild(exerciseCard);
        });
        
        // Se não houver exercícios ou ocorrer erro, exibir conteúdo alternativo
        if (displayExercises.length === 0) {
            displayFallbackContent(exerciseTipsContainer);
        }
        
    } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
        displayFallbackContent(exerciseTipsContainer);
    }
}

/**
 * Exibe conteúdo alternativo caso a API falhe
 */
function displayFallbackContent(container) {
    container.innerHTML = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 border-0 rounded-4 shadow-sm health-tip-card">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-box bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <i class="fas fa-heart text-primary"></i>
                        </div>
                        <h3 class="card-title h5 mb-0">Benefícios do Pilates</h3>
                    </div>
                    <p class="card-text">O Pilates melhora a flexibilidade, aumenta a força muscular e tonifica os músculos abdominais, lombares, quadris e glúteos.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 border-0 rounded-4 shadow-sm health-tip-card">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-box bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <i class="fas fa-spa text-primary"></i>
                        </div>
                        <h3 class="card-title h5 mb-0">Respiração Correta</h3>
                    </div>
                    <p class="card-text">A respiração adequada durante os exercícios melhora a oxigenação, reduz o estresse e aumenta a concentração e consciência corporal.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 border-0 rounded-4 shadow-sm health-tip-card">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-box bg-primary bg-opacity-10 p-3 rounded-3 me-
                                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-box bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <i class="fas fa-brain text-primary"></i>
                        </div>
                        <h3 class="card-title h5 mb-0">Saúde Mental</h3>
                    </div>
                    <p class="card-text">A prática regular de Pilates ajuda no gerenciamento do estresse e relaxamento, melhorando o bem-estar mental e a qualidade do sono.</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Funções utilitárias
 */
function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
}

function sanitizeId(string) {
    if (!string) return '';
    return string.replace(/[^a-z0-9]/gi, '');
}
