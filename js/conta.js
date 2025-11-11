// Sistema de Gerenciamento de Conta - EducaGestaoDF
class AccountManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    async init() {
        console.log('🔧 Inicializando gerenciador de conta...');
        await this.loadUserData();
        this.setupEventListeners();
    }

    async loadUserData() {
        try {
            // Buscar dados do usuário logado do localStorage
            const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');

            if (!userData.id) {
                console.error('❌ Usuário não encontrado no localStorage');
                window.location.href = 'index.html';
                return;
            }

            // Buscar dados atualizados do servidor
            const response = await fetch(`http://localhost:5000/api/usuarios/${userData.id}`);
            if (response.ok) {
                this.currentUser = await response.json();
                this.populateUserData();
                this.checkAdminAccess();
                console.log('✅ Dados do usuário carregados:', this.currentUser.nome);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados do usuário:', error);
        }
    }

    checkAdminAccess() {
        // Mostrar aba de administração apenas para administradores
        const adminTabBtn = document.getElementById('adminTabBtn');
        if (adminTabBtn && this.currentUser && this.currentUser.cargo === 'admin') {
            adminTabBtn.style.display = 'flex';
            console.log('✅ Acesso de administrador concedido');
        }
    }

    populateUserData() {
        if (!this.currentUser) return;

        // Preencher formulário de perfil
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const cpfInput = document.getElementById('cpf');
        const telefoneInput = document.getElementById('telefone');
        const cargoInput = document.getElementById('cargo');

        if (nomeInput) nomeInput.value = this.currentUser.nome || '';
        if (emailInput) emailInput.value = this.currentUser.email || '';
        if (cpfInput) cpfInput.value = this.currentUser.cpf || '';
        if (telefoneInput) telefoneInput.value = this.currentUser.telefone || '';
        if (cargoInput) cargoInput.value = this.currentUser.cargo || '';

        // Atualizar status
        const statusIndicator = document.getElementById('statusIndicator');
        if (statusIndicator) {
            const statusDot = statusIndicator.querySelector('.status-dot');
            const statusText = statusIndicator.querySelector('.status-text');

            if (this.currentUser.status === 'ativo') {
                if (statusDot) statusDot.className = 'status-dot active';
                if (statusText) statusText.textContent = 'Ativo';
            } else {
                if (statusDot) statusDot.className = 'status-dot inactive';
                if (statusText) statusText.textContent = 'Inativo';
            }
        }
    }

    setupEventListeners() {
        // Formulário de perfil
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }
    }

    async updateProfile() {
        try {
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');

            const data = {
                nome: nomeInput?.value,
                email: emailInput?.value,
                telefone: telefoneInput?.value,
                cpf: this.currentUser.cpf,
                cargo: this.currentUser.cargo,
                status: this.currentUser.status
            };

            // Validações
            if (!data.nome || !data.nome.trim()) {
                this.showNotification('Nome é obrigatório', 'error');
                nomeInput?.focus();
                return;
            }

            if (!data.email || !data.email.trim()) {
                this.showNotification('E-mail é obrigatório', 'error');
                emailInput?.focus();
                return;
            }

            // Atualizar no servidor
            const response = await fetch(`http://localhost:5000/api/usuarios/${this.currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Atualizar dados locais
                this.currentUser = { ...this.currentUser, ...data };
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

                this.showNotification('✅ Perfil atualizado com sucesso!', 'success');
                console.log('✅ Perfil atualizado com sucesso');
            } else {
                throw new Error('Erro ao atualizar perfil');
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar perfil:', error);
            this.showNotification('❌ Erro ao atualizar perfil', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ===== FUNÇÕES GLOBAIS DE PERSONALIZAÇÃO =====

window.changeTheme = function (theme) {
    console.log('🎨 Mudando tema para:', theme);
    if (window.themeManager) {
        window.themeManager.setTheme(theme);

        // Atualizar UI
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active');
        });
        const selectedBtn = document.querySelector(`[data-theme="${theme}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
    } else {
        console.error('❌ themeManager não encontrado!');
        alert('Erro: Sistema de temas não carregado. Recarregue a página.');
    }
};

window.changeAccessibility = function (mode) {
    console.log('♿ Mudando acessibilidade para:', mode);
    if (window.themeManager) {
        window.themeManager.setAccessibility(mode);

        // Atualizar UI
        document.querySelectorAll('.accessibility-option').forEach(btn => {
            btn.classList.remove('active');
        });
        const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
    } else {
        console.error('❌ themeManager não encontrado!');
        alert('Erro: Sistema de acessibilidade não carregado. Recarregue a página.');
    }
};

window.removeProfilePicture = function () {
    console.log('🗑️ Removendo foto de perfil');
    if (window.themeManager) {
        window.themeManager.removeProfilePicture();
        const preview = document.getElementById('profilePicturePreview');
        if (preview) {
            preview.src = 'public/placeholder-user.jpg';
        }
    } else {
        console.error('❌ themeManager não encontrado!');
    }
};

// Inicializar quando a página carregar
let accountManager;
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM carregado, inicializando...');
    accountManager = new AccountManager();

    // Setup foto de perfil
    const input = document.getElementById('profilePictureInput');
    if (input) {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('❌ Imagem muito grande! Máximo 5MB.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageData = event.target.result;
                    const preview = document.getElementById('profilePicturePreview');
                    if (preview) {
                        preview.src = imageData;
                    }

                    if (window.themeManager) {
                        window.themeManager.setProfilePicture(imageData);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Carregar configurações salvas de tema
    setTimeout(() => {
        if (window.themeManager) {
            const savedTheme = localStorage.getItem('theme') || 'purple';
            const savedAccessibility = localStorage.getItem('accessibility') || 'none';

            console.log('✅ Carregando configurações:', { savedTheme, savedAccessibility });

            // Marcar tema ativo
            document.querySelectorAll('.theme-option').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeTheme = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (activeTheme) activeTheme.classList.add('active');

            // Marcar acessibilidade ativa
            document.querySelectorAll('.accessibility-option').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeAccessibility = document.querySelector(`[data-mode="${savedAccessibility}"]`);
            if (activeAccessibility) activeAccessibility.classList.add('active');
        }

        // Carregar usuários inativos se for admin
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (userData.cargo === 'admin') {
            window.loadInactiveUsers();
        }
    }, 500);
});

// ===== FUNÇÕES DE ZONA DE PERIGO =====

window.deactivateAccount = async function () {
    const confirmed = confirm(
        '⚠️ Desativar Conta\n\n' +
        'Sua conta será desativada temporariamente.\n' +
        'Você pode reativá-la fazendo login novamente.\n\n' +
        'Deseja continuar?'
    );

    if (!confirmed) return;

    try {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');

        if (!userData.id) {
            alert('❌ Erro: Usuário não encontrado');
            return;
        }

        // Atualizar status no servidor
        const response = await fetch(`http://localhost:5000/api/usuarios/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...userData,
                status: 'inativo'
            })
        });

        if (response.ok) {
            alert('✅ Conta desativada com sucesso!\n\nVocê será redirecionado para a página de login.');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        } else {
            throw new Error('Erro ao desativar conta');
        }
    } catch (error) {
        console.error('❌ Erro ao desativar conta:', error);
        alert('❌ Erro ao desativar conta. Tente novamente.');
    }
};

window.deleteAccount = async function () {
    const confirmed = confirm(
        '🚨 ATENÇÃO: EXCLUIR CONTA\n\n' +
        'Esta ação é IRREVERSÍVEL!\n' +
        'Todos os seus dados serão PERMANENTEMENTE removidos do sistema.\n\n' +
        'Tem certeza que deseja continuar?'
    );

    if (!confirmed) return;

    // Segunda confirmação
    const doubleConfirm = confirm(
        '⚠️ ÚLTIMA CONFIRMAÇÃO\n\n' +
        'Você tem ABSOLUTA CERTEZA que deseja excluir sua conta?\n' +
        'Esta ação NÃO PODE ser desfeita!\n\n' +
        'Digite OK para confirmar a exclusão.'
    );

    if (!doubleConfirm) return;

    try {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');

        if (!userData.id) {
            alert('❌ Erro: Usuário não encontrado');
            return;
        }

        // Excluir conta no servidor
        const response = await fetch(`http://localhost:5000/api/usuarios/${userData.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            alert('✅ Conta excluída com sucesso!\n\nSeus dados foram removidos do sistema.');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        } else {
            throw new Error('Erro ao excluir conta');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir conta:', error);
        alert('❌ Erro ao excluir conta. Tente novamente.');
    }
};

// ===== FUNÇÕES DE ADMINISTRAÇÃO =====

window.loadInactiveUsers = async function () {
    console.log('📋 Carregando usuários inativos...');

    try {
        const response = await fetch('http://localhost:5000/api/usuarios');
        if (!response.ok) throw new Error('Erro ao buscar usuários');

        const usuarios = await response.json();
        const inativos = usuarios.filter(u => u.status === 'inativo');
        const ativos = usuarios.filter(u => u.status === 'ativo');

        // Atualizar estatísticas
        document.getElementById('totalUsuarios').textContent = usuarios.length;
        document.getElementById('usuariosInativos').textContent = inativos.length;

        // Renderizar lista de usuários inativos
        const container = document.getElementById('inactiveUsersContainer');

        if (inativos.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #6b7280;">
                    <svg style="width: 64px; height: 64px; margin: 0 auto 1rem; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p style="font-size: 1.1rem; font-weight: 500;">Nenhum usuário desativado</p>
                    <p style="font-size: 0.9rem; opacity: 0.7;">Todos os usuários estão ativos no sistema</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Nome</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">E-mail</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Cargo</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">CPF</th>
                            <th style="padding: 1rem; text-align: center; font-weight: 600;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${inativos.map(user => `
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                            ${user.nome.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style="font-weight: 500;">${user.nome}</div>
                                            <div style="font-size: 0.85rem; color: #6b7280;">ID: ${user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 1rem; color: #6b7280;">${user.email}</td>
                                <td style="padding: 1rem;">
                                    <span style="padding: 0.25rem 0.75rem; background: #dbeafe; color: #1e40af; border-radius: 9999px; font-size: 0.85rem; font-weight: 500;">
                                        ${user.cargo}
                                    </span>
                                </td>
                                <td style="padding: 1rem; color: #6b7280; font-family: monospace;">${user.cpf}</td>
                                <td style="padding: 1rem; text-align: center;">
                                    <button class="btn btn-primary btn-sm" onclick="window.reactivateUser(${user.id}, '${user.nome}')" style="margin-right: 0.5rem;">
                                        Reativar
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="window.permanentDeleteUser(${user.id}, '${user.nome}')">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        console.log('✅ Usuários inativos carregados:', inativos.length);
    } catch (error) {
        console.error('❌ Erro ao carregar usuários inativos:', error);
        document.getElementById('inactiveUsersContainer').innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #ef4444;">
                <p>❌ Erro ao carregar usuários. Tente novamente.</p>
            </div>
        `;
    }
};

window.reactivateUser = async function (userId, userName) {
    const confirmed = confirm(
        `🔄 Reativar Conta\n\n` +
        `Deseja reativar a conta de "${userName}"?\n` +
        `O usuário poderá fazer login novamente.`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`);
        if (!response.ok) throw new Error('Usuário não encontrado');

        const user = await response.json();

        const updateResponse = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...user,
                status: 'ativo'
            })
        });

        if (updateResponse.ok) {
            alert(`✅ Conta de "${userName}" reativada com sucesso!`);
            window.loadInactiveUsers();
        } else {
            throw new Error('Erro ao reativar usuário');
        }
    } catch (error) {
        console.error('❌ Erro ao reativar usuário:', error);
        alert('❌ Erro ao reativar usuário. Tente novamente.');
    }
};

window.permanentDeleteUser = async function (userId, userName) {
    const confirmed = confirm(
        `🚨 ATENÇÃO: EXCLUIR USUÁRIO\n\n` +
        `Deseja EXCLUIR PERMANENTEMENTE a conta de "${userName}"?\n` +
        `Esta ação é IRREVERSÍVEL!`
    );

    if (!confirmed) return;

    const doubleConfirm = confirm(
        `⚠️ ÚLTIMA CONFIRMAÇÃO\n\n` +
        `Tem ABSOLUTA CERTEZA que deseja excluir "${userName}"?\n` +
        `Todos os dados serão removidos permanentemente!`
    );

    if (!doubleConfirm) return;

    try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            alert(`✅ Usuário "${userName}" excluído permanentemente.`);
            window.loadInactiveUsers();
        } else {
            throw new Error('Erro ao excluir usuário');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir usuário:', error);
        alert('❌ Erro ao excluir usuário. Tente novamente.');
    }
};

console.log('✅ Sistema de conta carregado!');
