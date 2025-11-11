// Fix for notifications system - ensures it works on all pages
(function() {
    'use strict';
    
    console.log('Notifications fix loading...');
    
    // Ensure we have a global notifications object
    if (!window.globalNotifications && window.GlobalNotifications) {
        window.globalNotifications = new GlobalNotifications();
        console.log('GlobalNotifications initialized via fix');
    }
    
    function setupNotificationButtons() {
        const buttons = document.querySelectorAll('.notifications-btn');
        console.log(`Found ${buttons.length} notification buttons`);
        
        buttons.forEach((button, index) => {
            // Remove any existing onclick attributes
            button.removeAttribute('onclick');
            
            // Remove existing event listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add our event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Notification button clicked (via fix)');
                
                if (window.globalNotifications) {
                    window.globalNotifications.toggleDropdown();
                } else if (window.GlobalNotifications) {
                    // Initialize if not already done
                    window.globalNotifications = new GlobalNotifications();
                    window.globalNotifications.toggleDropdown();
                } else {
                    console.warn('GlobalNotifications not available, redirecting...');
                    window.location.href = 'notificacoes.html';
                }
            });
            
            console.log(`Button ${index + 1} setup complete`);
        });
    }
    
    // Try to setup immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupNotificationButtons);
    } else {
        setupNotificationButtons();
    }
    
    // Also try after a delay to catch any dynamically added buttons
    setTimeout(setupNotificationButtons, 500);
    setTimeout(setupNotificationButtons, 1500);
    
    console.log('Notifications fix loaded');
})();