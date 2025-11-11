// Sistema de Perfil e Configurações
class PerfilManager {
    constructor() {
        this.API_URL = "http://localhost:5000/api";
        this.currentUser = null;
        this.preferences = {
            tema: 'claro',
            idioma: 'pt-BR',
            densidade: 'normal',
            paginaInicial: 'dashboard',
            autoUpdate: true,
            notifications: {
                sistema: true,
                alunos: true,
                notas: true,
                eventos: true,
                relatorios: false
            },
            methods: {
                email: true,
                push: false
            }
        };
        
        this.init();
    }

    async init() {
        try {
            await this.loadUserData();
            this.loadPreferences();
            this.setupEventListeners();
            this.setupPasswordStrength();
            this.handleHashNavigation();
        } catch (error) {
            console.error('Erro ao inicializar perfil:', error);
        }
    }

    handleHashNavigation() {
        // Verificar se há hash na URL para abrir aba específica
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash + 'Tab')) {
            showTab(hash);
        }
    }

    async loadUserData() {
        try {
            // Simular dados do usuário logado (em produção, pegar do localStorage ou API)
            this.currentUser = {
                id: 1,
                nome: 'Administrador do Sistema',
                email: 'admin@escola.com',
                cpf: '000.000.000-00',
                telefone: '(61) 99999-0000',
                cargo: 'admin',
                status: 'ativo',
                created_at: '2025-01-01T00:00:00Z',
                last_login: new Date().toISOString()
            };

            this.updateProfileDisplay();
            this.populateForm();
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    }

    updateProfileDisplay() {
        if (!this.currentUser) return;

        document.getElementById('profileName').textContent = this.currentUser.nome;
        document.getElementById('profileRole').textContent = this.getRoleDisplayName(this.currentUser.cargo);
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        
        const lastLogin = new Date(this.currentUser.last_login);
        document.getElementById('lastLogin').textContent = this.formatDateTime(lastLogin);
        
        const memberSince = new Date(this.currentUser.created_at);
        document.getElementById('memberSince').textContent = this.formatDate(memberSince);
    }

    populateForm() {
        if (!this.currentUser) return;

        document.getElementById('nome').value = this.currentUser.nome;
        document.getElementById('email').value = this.currentUser.email;
        document.getElementById('cpf').value = this.currentUser.cpf;
        document.getElementById('telefone').value = this.currentUser.telefone || '';
        document.getElementById('cargo').value = this.currentUser.cargo;
        document.getElementById('status').value = this.currentUser.status;
    }

    loadPreferences() {
        // Carregar preferências do localStorage
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            this.preferences = { ...this.preferences, ...JSON.parse(savedPrefs) };
        }

        // Aplicar preferências na interface
        document.getElementById('tema').value = this.preferences.tema;
        document.getElementById('idioma').value = this.preferences.idioma;
        document.getElementById('densidade').value = this.preferences.densidade;
        document.getElementById('paginaInicial').value = this.preferences.paginaInicial;
        document.getElementById('autoUpdate').checked = this.preferences.autoUpdate;

        // Notificações
        document.getElementById('notifSistema').checked = this.preferences.notifications.sistema;
        document.getElementById('notifAlunos').checked = this.preferences.notifications.alunos;
        document.getElementById('notifNotas').checked = this.preferences.notifications.notas;
        document.getElementById('notifEventos').checked = this.preferences.notifications.eventos;
        document.getElementById('notifRelatorios').checked = this.preferences.notifications.relatorios;

        // Métodos de notificação
        document.getElementById('emailNotif').checked = this.preferences.methods.email;
        document.getElementById('pushNotif').checked = this.preferences.methods.push;

        // Aplicar tema
        this.applyTheme(this.preferences.tema);
    }

    setupEventListeners() {
        // Listeners para mudanças nas preferências
        document.getElementById('tema').addEventListener('change', (e) => {
            this.preferences.tema = e.target.value;
            this.applyTheme(e.target.value);
            this.savePreferences();
        });

        document.getElementById('idioma').addEventListener('change', (e) => {
            this.preferences.idioma = e.target.value;
            this.savePreferences();
        });

        document.getElementById('densidade').addEventListener('change', (e) => {
            this.preferences.densidade = e.target.value;
            this.applyDensity(e.target.value);
            this.savePreferences();
        });

        document.getElementById('paginaInicial').addEventListener('change', (e) => {
            this.preferences.paginaInicial = e.target.value;
            this.savePreferences();
        });

        document.getElementById('autoUpdate').addEventListener('change', (e) => {
            this.preferences.autoUpdate = e.target.checked;
            this.savePreferences();
        });

        // Listeners para notificações
        const notifCheckboxes = ['notifSistema', 'notifAlunos', 'notifNotas', 'notifEventos', 'notifRelatorios'];
        notifCheckboxes.forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                const key = id.replace('notif', '').toLowerCase();
                this.preferences.notifications[key] = e.target.checked;
                this.savePreferences();
            });
        });

        // Listeners para métodos de notificação
        document.getElementById('emailNotif').addEventListener('change', (e) => {
            this.preferences.methods.email = e.target.checked;
            this.savePreferences();
        });

        document.getElementById('pushNotif').addEventListener('change', (e) => {
            this.preferences.methods.push = e.target.checked;
            this.savePreferences();
        });
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('novaSenha');
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            
            strengthBar.className = 'strength-fill';
            
            if (password.length === 0) {
                strengthText.textContent = 'Digite uma senha';
                return;
            }

            if (strength < 2) {
                strengthBar.classList.add('weak');
                strengthText.textContent = 'Senha fraca';
            } else if (strength < 3) {
                strengthBar.classList.add('fair');
                strengthText.textContent = 'Senha razoável';
            } else if (strength < 4) {
                strengthBar.classList.add('good');
                strengthText.textContent = 'Senha boa';
            } else {
                strengthBar.classList.add('strong');
                strengthText.textContent = 'Senha forte';
            }
        });
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        return strength;
    }

    applyTheme(theme) {
        const body = document.body;
        body.classList.remove('theme-claro', 'theme-escuro');
        
        if (theme === 'escuro') {
            body.classList.add('theme-escuro');
        } else if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                body.classList.add('theme-escuro');
            }
        }
    }

    applyDensity(density) {
        const body = document.body;
        body.classList.remove('density-compacta', 'density-normal', 'density-confortavel');
        body.classList.add(`density-${density}`);
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }

    getRoleDisplayName(role) {
        const roles = {
            'admin': 'Administrador',
            'diretor': 'Diretor',
            'coordenador': 'Coordenador',
            'professor': 'Professor',
            'secretaria': 'Secretária'
        };
        return roles[role] || role;
    }

    formatDate(date) {
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateTime(date) {
        return date.toLocaleString('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async salvarPerfil() {
        try {
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                cargo: document.getElementById('cargo').value,
                status: document.getElementById('status').value
            };

            // Validações
            if (!formData.nome || !formData.email) {
                this.showAlert('Nome e email são obrigatórios', 'error');
                return;
            }

            // Simular salvamento (em produção, fazer requisição para API)
            this.currentUser = { ...this.currentUser, ...formData };
            this.updateProfileDisplay();
            
            this.showAlert('Perfil atualizado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            this.showAlert('Erro ao salvar perfil', 'error');
        }
    }

    async alterarSenha() {
        try {
            const senhaAtual = document.getElementById('senhaAtual').value;
            const novaSenha = document.getElementById('novaSenha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            // Validações
            if (!senhaAtual || !novaSenha || !confirmarSenha) {
                this.showAlert('Todos os campos de senha são obrigatórios', 'error');
                return;
            }

            if (novaSenha !== confirmarSenha) {
                this.showAlert('Nova senha e confirmação não coincidem', 'error');
                return;
            }

            if (novaSenha.length < 6) {
                this.showAlert('Nova senha deve ter pelo menos 6 caracteres', 'error');
                return;
            }

            // Simular alteração de senha (em produção, fazer requisição para API)
            document.getElementById('senhaForm').reset();
            this.showAlert('Senha alterada com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            this.showAlert('Erro ao alterar senha', 'error');
        }
    }

    toggleTwoFactor() {
        const status = document.getElementById('twoFactorStatus');
        const text = document.getElementById('twoFactorText');
        const btn = document.getElementById('twoFactorBtn');

        if (status.classList.contains('inactive')) {
            status.classList.remove('inactive');
            status.classList.add('active');
            text.textContent = 'Ativada - Sua conta está protegida com 2FA';
            btn.textContent = 'Desativar';
            this.showAlert('Autenticação de dois fatores ativada!', 'success');
        } else {
            status.classList.remove('active');
            status.classList.add('inactive');
            text.textContent = 'Desativada - Adicione uma camada extra de segurança';
            btn.textContent = 'Ativar';
            this.showAlert('Autenticação de dois fatores desativada!', 'info');
        }
    }

    editarAvatar() {
        document.getElementById('avatarModal').classList.add('active');
    }

    closeAvatarModal() {
        document.getElementById('avatarModal').classList.remove('active');
        document.getElementById('avatarPreview').style.display = 'none';
    }

    previewAvatar(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('previewImage').src = e.target.result;
                document.getElementById('avatarPreview').style.display = 'block';
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    salvarAvatar() {
        const previewImage = document.getElementById('previewImage');
        if (previewImage.src) {
            document.getElementById('avatarImage').src = previewImage.src;
            this.closeAvatarModal();
            this.showAlert('Avatar atualizado com sucesso!', 'success');
        }
    }

    exportarDados() {
        try {
            const dados = {
                usuario: this.currentUser,
                preferencias: this.preferences,
                exportadoEm: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `perfil_${this.currentUser.nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);

            this.showAlert('Dados exportados com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.showAlert('Erro ao exportar dados', 'error');
        }
    }

    async criarBackup() {
        this.showAlert('Criando backup do sistema...', 'info');
        
        // Simular criação de backup
        setTimeout(() => {
            this.showAlert('Backup criado com sucesso!', 'success');
        }, 2000);
    }

    async restaurarBackup() {
        if (!confirm('Tem certeza que deseja restaurar o sistema? Esta ação não pode ser desfeita.')) {
            return;
        }

        this.showAlert('Funcionalidade de restauração em desenvolvimento', 'info');
    }

    limparCache() {
        if (!confirm('Tem certeza que deseja limpar o cache? Você precisará fazer login novamente.')) {
            return;
        }

        localStorage.clear();
        sessionStorage.clear();
        this.showAlert('Cache limpo com sucesso! Recarregando página...', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    resetarConfiguracoes() {
        if (!confirm('Tem certeza que deseja resetar todas as configurações? Esta ação não pode ser desfeita.')) {
            return;
        }

        // Resetar preferências para padrão
        this.preferences = {
            tema: 'claro',
            idioma: 'pt-BR',
            densidade: 'normal',
            paginaInicial: 'dashboard',
            autoUpdate: true,
            notifications: {
                sistema: true,
                alunos: true,
                notas: true,
                eventos: true,
                relatorios: false
            },
            methods: {
                email: true,
                push: false
            }
        };

        this.savePreferences();
        this.loadPreferences();
        this.showAlert('Configurações resetadas com sucesso!', 'success');
    }

    salvarTudo() {
        this.salvarPerfil();
        this.savePreferences();
        this.showAlert('Todas as configurações foram salvas!', 'success');
    }

    showAlert(message, type = 'info') {
        // Implementar sistema de notificações
        console.log(`${type.toUpperCase()}: ${message}`);
        alert(message); // Temporário
    }
}

// Funções globais
let perfilManager;

function showTab(tabName, element) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Ativar tab selecionada
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback: encontrar o botão pela tab name
        document.querySelector(`[onclick*="${tabName}"]`).classList.add('active');
    }
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function alterarSenha() {
    perfilManager.alterarSenha();
}

function toggleTwoFactor() {
    perfilManager.toggleTwoFactor();
}

function editarAvatar() {
    perfilManager.editarAvatar();
}

function closeAvatarModal() {
    perfilManager.closeAvatarModal();
}

function previewAvatar(input) {
    perfilManager.previewAvatar(input);
}

function salvarAvatar() {
    perfilManager.salvarAvatar();
}

function exportarDados() {
    perfilManager.exportarDados();
}

function criarBackup() {
    perfilManager.criarBackup();
}

function restaurarBackup() {
    perfilManager.restaurarBackup();
}

function limparCache() {
    perfilManager.limparCache();
}

function resetarConfiguracoes() {
    perfilManager.resetarConfiguracoes();
}

function salvarTudo() {
    perfilManager.salvarTudo();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    perfilManager = new PerfilManager();
});