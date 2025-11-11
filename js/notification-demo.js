// Demo functions for testing notifications
function addTestNotification() {
    if (globalNotifications) {
        const notifications = [
            {
                type: 'system',
                title: 'Novo usuário cadastrado',
                message: 'Um novo professor foi adicionado ao sistema',
                icon: 'user-plus'
            },
            {
                type: 'event',
                title: 'Reunião agendada',
                message: 'Nova reunião de pais marcada para amanhã',
                icon: 'calendar'
            },
            {
                type: 'warning',
                title: 'Manutenção programada',
                message: 'Sistema será atualizado hoje à noite',
                icon: 'alert-triangle'
            },
            {
                type: 'info',
                title: 'Novas notas disponíveis',
                message: 'Professores lançaram novas avaliações',
                icon: 'file-text'
            }
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        globalNotifications.addNotification(randomNotification);
    }
}

// Add test button to pages (for development)
document.addEventListener('DOMContentLoaded', () => {
    // Only add in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testButton = document.createElement('button');
        testButton.textContent = 'Adicionar Notificação Teste';
        testButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            padding: 10px 15px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        `;
        testButton.onclick = addTestNotification;
        document.body.appendChild(testButton);
    }
});