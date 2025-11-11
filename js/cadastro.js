// Cadastro System
class CadastroManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupInputMasks();
        this.setupPasswordValidation();
    }

    setupEventListeners() {
        const cadastroForm = document.getElementById('cadastroForm');
        
        // Adicionar múltiplos listeners para garantir que funcione
        cadastroForm.addEventListener('submit', (e) => {
            console.log('Event listener submit ativado!');
            this.handleCadastro(e);
        });
        
        // Listener adicional no botão
        const cadastroButton = document.getElementById('cadastroButton');
        cadastroButton.addEventListener('click', (e) => {
            console.log('Botão clicado!');
            if (e.target.type === 'submit') {
                console.log('Botão de submit clicado, formulário será submetido');
            }
        });

        // Real-time validation
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Password confirmation
        const confirmPassword = document.getElementById('confirmPassword');
        confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
    }

    setupInputMasks() {
        // CPF Mask
        const cpfInput = document.getElementById('cpf');
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        // Phone Mask
        const telefoneInput = document.getElementById('telefone');
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    setupPasswordValidation() {
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', () => this.validatePasswordRequirements());
    }

    validatePasswordRequirements() {
        const password = document.getElementById('password').value;
        
        // Length requirement
        const lengthReq = document.getElementById('req-length');
        if (password.length >= 6) {
            lengthReq.classList.add('valid');
        } else {
            lengthReq.classList.remove('valid');
        }

        // Letter requirement
        const letterReq = document.getElementById('req-letter');
        if (/[a-zA-Z]/.test(password)) {
            letterReq.classList.add('valid');
        } else {
            letterReq.classList.remove('valid');
        }

        // Number requirement
        const numberReq = document.getElementById('req-number');
        if (/\d/.test(password)) {
            numberReq.classList.add('valid');
        } else {
            numberReq.classList.remove('valid');
        }
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmInput = document.getElementById('confirmPassword');

        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError(confirmInput, 'As senhas não coincidem');
            confirmInput.classList.add('invalid');
        } else if (confirmPassword) {
            this.clearFieldError(confirmInput);
            confirmInput.classList.remove('invalid');
            confirmInput.classList.add('valid');
        }
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;

        // Clear previous states
        input.classList.remove('valid', 'invalid');
        this.clearFieldError(input);

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            this.showFieldError(input, 'Este campo é obrigatório');
            input.classList.add('invalid');
            return false;
        }

        // Specific validations
        switch (input.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    this.showFieldError(input, 'E-mail inválido');
                    input.classList.add('invalid');
                    isValid = false;
                }
                break;

            case 'password':
                if (value && !this.isValidPassword(value)) {
                    this.showFieldError(input, 'Senha não atende aos requisitos');
                    input.classList.add('invalid');
                    isValid = false;
                }
                break;
        }

        // CPF validation
        if (input.id === 'cpf' && value && !this.isValidCPF(value)) {
            this.showFieldError(input, 'CPF inválido');
            input.classList.add('invalid');
            isValid = false;
        }

        if (isValid && value) {
            input.classList.add('valid');
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPassword(password) {
        return password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }

    isValidCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            ${message}
        `;
        
        input.parentNode.parentNode.appendChild(errorDiv);
    }

    clearFieldError(input) {
        const errorDiv = input.parentNode.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleCadastro(event) {
        event.preventDefault();
        console.log('Formulário submetido!');
        
        // Validate all fields
        const inputs = document.querySelectorAll('.form-input[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
                console.log('Campo inválido:', input.name, input.value);
            }
        });

        // Check password match
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            this.showAlert('As senhas não coincidem', 'error');
            isFormValid = false;
        }

        // Check terms acceptance
        const termsAccepted = document.getElementById('terms').checked;
        if (!termsAccepted) {
            this.showAlert('Você deve aceitar os termos de uso', 'error');
            isFormValid = false;
        }

        if (!isFormValid) {
            this.shakeForm();
            return;
        }

        this.setLoading(true);

        // Get form data
        const formData = new FormData(event.target);
        const userData = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            cpf: formData.get('cpf'),
            telefone: formData.get('telefone'),
            cargo: formData.get('cargo'),
            senha: formData.get('password')
        };

        // Check email uniqueness
        const emailExists = await this.emailExists(userData.email);
        if (emailExists) {
            this.showAlert('Este e-mail já está cadastrado', 'error');
            this.setLoading(false);
            return;
        }

        try {
            console.log('Enviando dados para cadastro:', userData);
            
            // Call real API
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            console.log('Resposta da API:', response.status, response.statusText);
            
            const result = await response.json();
            console.log('Resultado da API:', result);

            if (response.ok) {
                this.showAlert('Conta criada com sucesso! Redirecionando...', 'success');
                
                // Save user data locally as backup
                this.saveUser(userData);
                
                // Redirect to login after success
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                this.showAlert(result.error || 'Erro ao criar conta', 'error');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            
            // Fallback: save locally if API is not available
            if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                this.showAlert('Servidor offline. Dados salvos localmente. Entre em contato com o administrador.', 'warning');
                this.saveUser(userData);
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                this.showAlert('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
            }
        }

        this.setLoading(false);
    }

    async emailExists(email) {
        try {
            const response = await fetch(`http://localhost:5000/api/usuarios?search=${encodeURIComponent(email)}`);
            if (response.ok) {
                const usuarios = await response.json();
                return usuarios.some(user => user.email === email);
            }
        } catch (error) {
            console.log('Erro ao verificar email:', error);
        }
        
        // Fallback: check localStorage
        const users = JSON.parse(localStorage.getItem('cadastro_users') || '[]');
        return users.some(user => user.email === email);
    }

    saveUser(userData) {
        // In a real application, this would save to a database
        // For now, we'll save to localStorage for demonstration
        const users = JSON.parse(localStorage.getItem('cadastro_users') || '[]');
        users.push({
            ...userData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'pending' // Would need admin approval
        });
        localStorage.setItem('cadastro_users', JSON.stringify(users));
    }

    shakeForm() {
        const form = document.getElementById('cadastroForm');
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }

    setLoading(loading) {
        const button = document.getElementById('cadastroButton');
        const buttonText = button.querySelector('.button-text');
        const buttonLoader = button.querySelector('.button-loader');

        if (loading) {
            button.disabled = true;
            buttonText.style.opacity = '0';
            buttonLoader.style.display = 'block';
        } else {
            button.disabled = false;
            buttonText.style.opacity = '1';
            buttonLoader.style.display = 'none';
        }
    }

    showAlert(message, type = 'info') {
        const container = document.getElementById('alertContainer');
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;

        const icon = this.getAlertIcon(type);
        alert.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        container.appendChild(alert);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (alert.parentNode) {
                        container.removeChild(alert);
                    }
                }, 300);
            }
        }, 5000);
    }

    getAlertIcon(type) {
        const icons = {
            success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 12l2 2 4-4"/>
                        <circle cx="12" cy="12" r="10"/>
                      </svg>`,
            error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>`
        };
        return icons[type] || icons.info;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global functions
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = passwordInput.parentNode.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}

function showTerms() {
    cadastroManager.showAlert(
        'Termos de uso: Ao usar este sistema, você concorda em seguir as políticas da instituição.',
        'warning'
    );
}

function showPrivacy() {
    cadastroManager.showAlert(
        'Política de privacidade: Seus dados pessoais serão protegidos conforme a LGPD.',
        'warning'
    );
}

// Função de teste para preencher o formulário automaticamente
function testarCadastro() {
    console.log('Preenchendo formulário de teste...');
    
    document.getElementById('nome').value = 'João Silva Teste';
    document.getElementById('email').value = 'joao.teste' + Date.now() + '@teste.com';
    document.getElementById('cpf').value = '123.456.789-09';
    document.getElementById('telefone').value = '(61) 99999-9999';
    document.getElementById('cargo').value = 'professor';
    document.getElementById('password').value = 'teste123';
    document.getElementById('confirmPassword').value = 'teste123';
    document.getElementById('terms').checked = true;
    
    console.log('Formulário preenchido! Agora clique em "Criar Conta"');
    
    // Destacar o botão de criar conta
    const botao = document.getElementById('cadastroButton');
    botao.style.animation = 'pulse 1s infinite';
    setTimeout(() => {
        botao.style.animation = '';
    }, 3000);
}

// Initialize cadastro manager
let cadastroManager;
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando sistema de cadastro...');
    cadastroManager = new CadastroManager();
    console.log('Sistema de cadastro inicializado!');
});