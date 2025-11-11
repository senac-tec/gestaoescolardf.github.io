// Sistema de Notificações Simplificado - Garantido para funcionar
console.log('🔔 Carregando sistema de notificações simplificado...');

// Dados de exemplo
const sampleNotifications = [
    {
        id: 1,
        type: 'system',
        title: 'Novo usuário cadastrado',
        message: 'Um novo professor foi adicionado ao sistema',
        time: new Date(Date.now() - 5 * 60 * 1000),
        read: false
    },
    {
        id: 2,
        type: 'event',
        title: 'Reunião de pais',
        message: 'Reunião agendada para amanhã às 19:00',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
    },
    {
        id: 3,
        type: 'warning',
        title: 'Manutenção programada',
        message: 'Sistema será atualizado hoje à noite',
        time: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true
    }
];

let notifications = [...sampleNotifications];
let dropdownVisible = false;

// Função para atualizar o badge
function updateNotificationBadge() {
    const badges = document.querySelectorAll('.notification-badge');
    const unreadCount = notifications.filter(n => !n.read).length;
    
    badges.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
    
    console.log(`📊 Badge atualizado: ${unreadCount} não lidas`);
}

// Função para criar o dropdown
function createNotificationDropdown() {
    // Remove dropdown existente
    const existing = document.querySelector('.notification-dropdown-simple');
    if (existing) {
        existing.remove();
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown-simple';
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <h3>Notificações</h3>
            <button class="close-btn" onclick="hideNotificationDropdown()">×</button>
        </div>
        <div class="dropdown-content">
            ${notifications.slice(0, 5).map(notification => `
                <div class="notification-item ${notification.read ? 'read' : 'unread'}">
                    <div class="notification-icon ${notification.type}">
                        ${getNotificationIcon(notification.type)}
                    </div>
                    <div class="notification-text">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${getTimeAgo(notification.time)}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="dropdown-footer">
            <button onclick="markAllNotificationsRead()">Marcar todas como lidas</button>
            <a href="notificacoes.html">Ver todas</a>
        </div>
    `;

    // Adicionar estilos inline para garantir funcionamento
    dropdown.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        width: 350px;
        max-width: 90vw;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        z-index: 9999;
        display: none;
    `;

    document.body.appendChild(dropdown);
    return dropdown;
}

// Função para mostrar o dropdown
function showNotificationDropdown() {
    console.log('📱 Mostrando dropdown de notificações...');
    
    const dropdown = createNotificationDropdown();
    dropdown.style.display = 'block';
    dropdownVisible = true;
    
    // Marcar como lidas após 2 segundos
    setTimeout(() => {
        notifications.forEach(n => n.read = true);
        updateNotificationBadge();
    }, 2000);
}

// Função para esconder o dropdown
function hideNotificationDropdown() {
    console.log('📱 Escondendo dropdown de notificações...');
    
    const dropdown = document.querySelector('.notification-dropdown-simple');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    dropdownVisible = false;
}

// Função para alternar o dropdown
function toggleNotificationDropdown() {
    console.log('🔄 Alternando dropdown de notificações...');
    
    if (dropdownVisible) {
        hideNotificationDropdown();
    } else {
        showNotificationDropdown();
    }
}

// Função para marcar todas como lidas
function markAllNotificationsRead() {
    console.log('✅ Marcando todas as notificações como lidas...');
    
    notifications.forEach(n => n.read = true);
    updateNotificationBadge();
    hideNotificationDropdown();
}

// Função para obter ícone da notificação
function getNotificationIcon(type) {
    const icons = {
        system: '⚙️',
        event: '📅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// Função para calcular tempo
function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString('pt-BR');
}

// Configurar botões quando a página carregar
function setupNotificationButtons() {
    console.log('🔧 Configurando botões de notificação...');
    
    const buttons = document.querySelectorAll('.notifications-btn');
    console.log(`Encontrados ${buttons.length} botões`);
    
    buttons.forEach((button, index) => {
        // Limpar eventos existentes
        button.onclick = null;
        button.removeAttribute('onclick');
        
        // Adicionar novo evento
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`🖱️ Botão ${index + 1} clicado!`);
            toggleNotificationDropdown();
        });
        
        console.log(`✅ Botão ${index + 1} configurado`);
    });
    
    // Atualizar badge inicial
    updateNotificationBadge();
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', function(e) {
    if (dropdownVisible && !e.target.closest('.notifications-btn') && !e.target.closest('.notification-dropdown-simple')) {
        hideNotificationDropdown();
    }
});

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNotificationButtons);
} else {
    setupNotificationButtons();
}

// Tentar novamente após delay para garantir
setTimeout(setupNotificationButtons, 500);
setTimeout(setupNotificationButtons, 1500);

console.log('✅ Sistema de notificações simplificado carregado!');

// Adicionar estilos CSS inline
const style = document.createElement('style');
style.textContent = `
.notification-dropdown-simple .dropdown-header {
    padding: 15px 20px;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
}

.notification-dropdown-simple .dropdown-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.notification-dropdown-simple .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
}

.notification-dropdown-simple .close-btn:hover {
    background: #e2e8f0;
}

.notification-dropdown-simple .dropdown-content {
    max-height: 300px;
    overflow-y: auto;
}

.notification-dropdown-simple .notification-item {
    display: flex;
    gap: 12px;
    padding: 15px 20px;
    border-bottom: 1px solid #f1f5f9;
}

.notification-dropdown-simple .notification-item.unread {
    background: #f0f9ff;
    border-left: 3px solid #3b82f6;
}

.notification-dropdown-simple .notification-icon {
    font-size: 20px;
    width: 30px;
    text-align: center;
}

.notification-dropdown-simple .notification-text {
    flex: 1;
}

.notification-dropdown-simple .notification-title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
}

.notification-dropdown-simple .notification-message {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 4px;
}

.notification-dropdown-simple .notification-time {
    font-size: 12px;
    color: #94a3b8;
}

.notification-dropdown-simple .dropdown-footer {
    padding: 15px 20px;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-dropdown-simple .dropdown-footer button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
}

.notification-dropdown-simple .dropdown-footer a {
    color: #3b82f6;
    text-decoration: none;
    font-size: 13px;
}

.notification-dropdown-simple .dropdown-footer a:hover {
    text-decoration: underline;
}
`;
document.head.appendChild(style);