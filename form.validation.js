/**
 * FisioForm - Pilates Studio
 * Form Validation Script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar validação para todos os formulários
    initFormValidation();
});

/**
 * Inicializa a validação de formulários
 */
function initFormValidation() {
    // Obter todos os formulários que precisamos aplicar estilos de validação customizados
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop sobre eles e prevenir envio se inválido
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Se o formulário for válido, podemos mostrar uma mensagem de sucesso
                // ou realizar outras ações como envio AJAX
                if (form.id === 'contact-form' || form.id === 'appointment-form') {
                    event.preventDefault();
                    simulateFormSubmission(form);
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Adicionar validação customizada para campos específicos
    addCustomValidation();
}

/**
 * Adiciona validações customizadas para campos específicos
 */
function addCustomValidation() {
    // Validação de telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Formatar o número de telefone conforme digita
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    this.value = `(${value}`;
                } else if (value.length <= 6) {
                    this.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 10) {
                    this.value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
                } else {
                    this.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            
            // Validar o número de telefone
            if (value.length < 10 || value.length > 11) {
                this.setCustomValidity('Telefone inválido');
            } else {
                this.setCustomValidity('');
            }
        });
    });
    
    // Validação de data
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.setCustomValidity('Selecione uma data futura');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

/**
 * Simula o envio do formulário com feedback visual
 */
function simulateFormSubmission(form) {
    // Desabilitar o botão de envio e mostrar indicador de carregamento
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...`;
    
    // Simular delay de processamento
    setTimeout(() => {
        // Limpar o formulário
        form.reset();
        form.classList.remove('was-validated');
        
        // Restaurar o botão
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Mostrar mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success alert-dismissible fade show mt-3';
        successMessage.innerHTML = `
            <strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Inserir mensagem após o formulário
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Remover a mensagem após alguns segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 1500);
}
