// Notifications System
class NotificationsManager {
    constructor() {
        this.notifications = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadNotifications();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Auto-refresh notifications every 30 seconds
        setInterval(() => {
            this.loadNotifications();
        }, 30000);
    }

    async loadNotifications() {
        try {
            // Simulate API call - in real app, this would fetch from backend
            const notifications = this.generateSampleNotifications();
            this.notifications = notifications;
            this.renderNotifications();
            this.updateCounts();
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
            this.showError();
        }
    }

    generateSampleNotifications() {
        const now = new Date();
        const notifications = [
            {
                id: 1,
                type: 'system',
                title: 'Novo usuário cadastrado',
                message: 'Um novo professor foi cadastrado no sistema: Maria Santos',
                time: new Date(now - 5 * 60 * 1000), // 5 minutes ago
                read: false,
                actions: [
                    { text: 'Ver perfil', type: 'primary', action: 'viewProfile' },
                    { text: 'Marcar como lida', type: 'secondary', action: 'markRead' }
                ]
            },
            {
                id: 2,
                type: 'event',
                title: 'Reunião de pais amanhã',
                message: 'Lembrete: Reunião de pais e mestres agendada para amanhã às 19:00',
                time: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
                read: false,
                actions: [
                    { text: 'Ver detalhes', type: 'primary', action: 'viewEvent' }
                ]
            },
            {
                id: 3,
                type: 'warning',
                title: 'Backup do sistema',
                message: 'O backup automático do sistema será executado hoje às 23:00',
                time: new Date(now - 4 * 60 * 60 * 1000), // 4 hours ago
                read: true,
                actions: []
            },
            {
                id: 4,
                type: 'info',
                title: 'Atualização de notas',
                message: '15 novas notas foram lançadas no sistema pelos professores',
                time: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
                read: false,
                actions: [
                    { text: 'Ver notas', type: 'primary', action: 'viewGrades' }
                ]
            },
            {
                id: 5,
                type: 'system',
                title: 'Manutenção programada',
                message: 'Manutenção do servidor programada para domingo às 02:00',
                time: new Date(now - 24 * 60 * 60 * 1000), // 1 day ago
                read: true,
                actions: []
            },
            {
                id: 6,
                type: 'event',
                title: 'Feira de ciências',
                message: 'Inscrições abertas para a feira de ciências até 30/10',
                time: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                read: true,
                actions: [
                    { text: 'Ver edital', type: 'primary', action: 'viewNotice' }
                ]
            },
            {
                id: 7,
                type: 'error',
                title: 'Falha no envio de email',
                message: 'Alguns emails de notificação falharam ao ser enviados',
                time: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                read: false,
                actions: [
                    { text: 'Reenviar', type: 'primary', action: 'resendEmails' },
                    { text: 'Ver log', type: 'secondary', action: 'viewLog' }
                ]
            }
        ];

        return notifications.sort((a, b) => b.time - a.time);
    }

    renderNotifications() {
        const container = document.getElementById('notificationsList');
        const emptyState = document.getElementById('emptyState');
        
        const filteredNotifications = this.getFilteredNotifications();
        
        if (filteredNotifications.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'flex';
            return;
        }

        container.style.display = 'block';
        emptyState.style.display = 'none';

        container.innerHTML = filteredNotifications.map(notification => 
            this.createNotificationHTML(notification)
        ).join('');
    }

    createNotificationHTML(notification) {
        const timeAgo = this.getTimeAgo(notification.time);
        const iconHTML = this.getNotificationIcon(notification.type);
        
        return `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                <div class="notification-header">
                    <div class="notification-icon ${notification.type}">
                        ${iconHTML}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title-row">
                            <div class="notification-title">${notification.title}</div>
                            <button class="notification-close-btn" onclick="dismissNotification(${notification.id})" title="Fechar notificação">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-meta">
                            <div class="notification-time">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                                ${timeAgo}
                            </div>
                            <div class="notification-type">${this.getTypeLabel(notification.type)}</div>
                        </div>
                        ${notification.actions.length > 0 ? `
                            <div class="notification-actions">
                                ${notification.actions.map(action => `
                                    <button class="notification-btn ${action.type}" onclick="handleNotificationAction('${action.action}', ${notification.id})">
                                        ${action.text}
                                    </button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    getNotificationIcon(type) {
        const icons = {
            system: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                     </svg>`,
            event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                       <line x1="16" y1="2" x2="16" y2="6"/>
                       <line x1="8" y1="2" x2="8" y2="6"/>
                       <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                         <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                         <line x1="12" y1="9" x2="12" y2="13"/>
                         <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>`,
            error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                       <circle cx="12" cy="12" r="10"/>
                       <line x1="15" y1="9" x2="9" y2="15"/>
                       <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>`,
            info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                   </svg>`
        };
        return icons[type] || icons.info;
    }

    getTypeLabel(type) {
        const labels = {
            system: 'Sistema',
            event: 'Evento',
            warning: 'Aviso',
            error: 'Erro',
            info: 'Info'
        };
        return labels[type] || 'Info';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Agora';
        if (minutes < 60) return `${minutes}m atrás`;
        if (hours < 24) return `${hours}h atrás`;
        if (days < 7) return `${days}d atrás`;
        
        return date.toLocaleDateString('pt-BR');
    }

    getFilteredNotifications() {
        switch (this.currentFilter) {
            case 'unread':
                return this.notifications.filter(n => !n.read);
            case 'system':
                return this.notifications.filter(n => n.type === 'system');
            case 'events':
                return this.notifications.filter(n => n.type === 'event');
            default:
                return this.notifications;
        }
    }

    updateCounts() {
        const counts = {
            all: this.notifications.length,
            unread: this.notifications.filter(n => !n.read).length,
            system: this.notifications.filter(n => n.type === 'system').length,
            events: this.notifications.filter(n => n.type === 'event').length
        };

        Object.keys(counts).forEach(key => {
            const element = document.getElementById(`count${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) {
                element.textContent = counts[key];
            }
        });
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.renderNotifications();
            this.updateCounts();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.renderNotifications();
        this.updateCounts();
    }

    dismissNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.renderNotifications();
        this.updateCounts();
        
        // Show success message
        this.showToast('Notificação removida com sucesso', 'success');
    }

    dismissAllNotifications() {
        this.notifications = [];
        this.renderNotifications();
        this.updateCounts();
        
        // Show success message
        this.showToast('Todas as notificações foram removidas', 'success');
    }

    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.notification-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `notification-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${type === 'success' ? 
                        '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>' :
                        '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
                    }
                </svg>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showError() {
        const container = document.getElementById('notificationsList');
        container.innerHTML = `
            <div class="error-state">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <h3>Erro ao carregar notificações</h3>
                <p>Não foi possível carregar as notificações. Tente novamente.</p>
                <button class="btn btn-primary" onclick="notificationsManager.loadNotifications()">
                    Tentar novamente
                </button>
            </div>
        `;
    }
}

// Global functions
let notificationsManager;

function filterNotifications(filter) {
    notificationsManager.currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    notificationsManager.renderNotifications();
}

function markAllAsRead() {
    notificationsManager.markAllAsRead();
}

function dismissNotification(notificationId) {
    notificationsManager.dismissNotification(notificationId);
}

function dismissAllNotifications() {
    if (confirm('Tem certeza que deseja remover todas as notificações? Esta ação não pode ser desfeita.')) {
        notificationsManager.dismissAllNotifications();
    }
}

function handleNotificationAction(action, notificationId) {
    // Mark notification as read when action is taken
    notificationsManager.markAsRead(notificationId);
    
    // Handle different actions
    switch (action) {
        case 'viewProfile':
            window.location.href = 'professores.html';
            break;
        case 'viewEvent':
            window.location.href = 'calendario.html';
            break;
        case 'viewGrades':
            window.location.href = 'notas.html';
            break;
        case 'viewNotice':
            alert('Redirecionando para o edital...');
            break;
        case 'resendEmails':
            alert('Reenviando emails...');
            break;
        case 'viewLog':
            alert('Abrindo log do sistema...');
            break;
        case 'markRead':
            // Already handled above
            break;
        default:
            console.log('Ação não implementada:', action);
    }
}

// Initialize notifications manager
document.addEventListener('DOMContentLoaded', () => {
    notificationsManager = new NotificationsManager();
});