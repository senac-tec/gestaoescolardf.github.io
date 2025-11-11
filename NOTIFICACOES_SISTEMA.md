# Sistema de Notificações - EducaGestaoDF

## Visão Geral

O sistema de notificações foi completamente reformulado para oferecer uma experiência mais fluida e funcional. Agora inclui:

- ✅ Dropdown de notificações funcional
- ✅ Badge com contador de notificações não lidas
- ✅ Botão para fechar notificações individuais
- ✅ Botão para limpar todas as notificações
- ✅ Animações e feedback visual
- ✅ Sistema responsivo

## Arquivos Criados/Modificados

### Novos Arquivos
- `js/notifications-global.js` - Sistema global de notificações
- `css/notifications-global.css` - Estilos do dropdown e badge
- `js/notification-demo.js` - Funções de demonstração

### Arquivos Modificados
- `js/notificacoes.js` - Adicionadas funções para fechar notificações
- `css/notificacoes.css` - Novos estilos para botões de fechar
- `notificacoes.html` - Botão para limpar todas as notificações
- Todos os arquivos HTML principais - Inclusão dos novos scripts e estilos

## Funcionalidades

### 1. Badge de Notificações
- Mostra o número de notificações não lidas
- Animação pulsante para chamar atenção
- Oculta automaticamente quando não há notificações

### 2. Dropdown de Notificações
- Abre ao clicar no botão de notificações
- Mostra as 5 notificações mais recentes
- Botão para marcar todas como lidas
- Botão para fechar o dropdown
- Link para ver todas as notificações

### 3. Página de Notificações
- Botão para fechar notificações individuais
- Botão para limpar todas as notificações
- Confirmação antes de limpar todas
- Toast de feedback para ações

### 4. Notificações Individuais
- Botão X para fechar cada notificação
- Animação suave ao remover
- Feedback visual com toast

## Como Usar

### Para Desenvolvedores

1. **Adicionar uma nova notificação:**
```javascript
globalNotifications.addNotification({
    type: 'info', // system, event, warning, error, info
    title: 'Título da notificação',
    message: 'Mensagem da notificação',
    icon: 'file-text' // user-plus, calendar, alert-triangle, file-text
});
```

2. **Marcar todas como lidas:**
```javascript
globalNotifications.markAllAsRead();
```

3. **Dispensar uma notificação:**
```javascript
globalNotifications.dismissNotification(notificationId);
```

### Para Usuários

1. **Ver notificações:** Clique no ícone de sino no header
2. **Fechar dropdown:** Clique fora ou pressione ESC
3. **Marcar como lidas:** Clique no ícone de check no dropdown
4. **Ver todas:** Clique em "Ver todas as notificações"
5. **Fechar individual:** Clique no X em cada notificação
6. **Limpar todas:** Use o botão "Limpar todas" na página de notificações

## Tipos de Notificação

- **system** (azul): Notificações do sistema
- **event** (verde): Eventos e lembretes
- **warning** (amarelo): Avisos importantes
- **error** (vermelho): Erros e problemas
- **info** (azul claro): Informações gerais

## Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop: Dropdown posicionado à direita
- Mobile: Dropdown ocupa a largura da tela
- Tablets: Layout intermediário

## Acessibilidade

- Suporte a navegação por teclado
- Títulos descritivos nos botões
- Cores contrastantes
- Animações suaves

## Demonstração

Em ambiente de desenvolvimento (localhost), um botão de teste aparece no canto inferior esquerdo para adicionar notificações de exemplo.

## Integração com Backend

O sistema está preparado para integração com APIs reais. Substitua a função `generateSampleNotifications()` por chamadas reais ao backend:

```javascript
async loadNotifications() {
    try {
        const response = await fetch('/api/notifications');
        const notifications = await response.json();
        this.notifications = notifications;
        // ... resto da lógica
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
    }
}
```

## Configurações

O sistema pode ser configurado através das variáveis no início da classe `GlobalNotifications`:

- Intervalo de atualização automática (padrão: 30 segundos)
- Número máximo de notificações no dropdown (padrão: 5)
- Tempo de exibição do toast (padrão: 3 segundos)