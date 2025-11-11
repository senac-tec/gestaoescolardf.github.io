# Instruções para Usar o Sistema de Cadastro

## ✅ Sistema Corrigido e Funcionando!

O problema no cadastro foi identificado e corrigido. Agora o sistema está funcionando perfeitamente.

### 🔧 Problemas que foram corrigidos:

1. **Backend não estava rodando** - O servidor Flask não estava ativo
2. **Dependências faltando** - Flask-CORS foi instalado corretamente
3. **Estilos de alerta ausentes** - Adicionados estilos CSS para mensagens de feedback
4. **Tratamento de erros melhorado** - Sistema agora tem fallback para funcionar offline
5. **Validações aprimoradas** - Verificação de email duplicado e validações em tempo real

### 🚀 Como usar o sistema:

#### 1. Iniciar o Backend
```bash
cd gestao-escolar/backend
python app.py
```

#### 2. Acessar o Cadastro
- Abra o arquivo `cadastro.html` no navegador
- Ou acesse através do sistema principal

#### 3. Preencher o Formulário
- **Nome Completo**: Obrigatório
- **E-mail**: Obrigatório e único no sistema
- **CPF**: Obrigatório, com validação automática
- **Telefone**: Opcional, com máscara automática
- **Cargo**: Obrigatório (Admin, Professor, Secretária, etc.)
- **Senha**: Mínimo 6 caracteres, deve conter letra e número
- **Confirmar Senha**: Deve ser igual à senha
- **Termos**: Obrigatório aceitar

#### 4. Funcionalidades Implementadas
- ✅ Validação em tempo real dos campos
- ✅ Máscaras automáticas para CPF e telefone
- ✅ Verificação de senhas coincidentes
- ✅ Validação de CPF
- ✅ Verificação de email duplicado
- ✅ Mensagens de feedback visuais
- ✅ Fallback para funcionamento offline
- ✅ Redirecionamento automático após sucesso

### 🎯 Recursos Adicionais:

#### Validações Implementadas:
- Email único no sistema
- CPF válido e único
- Senha forte (letra + número + 6 caracteres)
- Campos obrigatórios

#### Feedback Visual:
- Campos válidos ficam verdes
- Campos inválidos ficam vermelhos
- Mensagens de erro específicas
- Alertas de sucesso/erro no topo da tela

#### Funcionalidade Offline:
- Se o servidor estiver offline, os dados são salvos localmente
- Usuário é notificado sobre o status
- Dados podem ser sincronizados quando o servidor voltar

### 🔍 Para Testar:

1. **Teste Básico**: Preencha todos os campos corretamente
2. **Teste de Validação**: Tente usar email duplicado ou CPF inválido
3. **Teste de Senha**: Use senhas que não coincidem
4. **Teste Offline**: Pare o servidor e teste o fallback

### 📝 Dados de Teste:
```
Nome: João Silva
Email: joao.silva@teste.com
CPF: 123.456.789-09
Telefone: (61) 99999-9999
Cargo: Professor
Senha: teste123
```

### 🛠️ Arquivos Modificados:
- `js/cadastro.js` - Lógica de cadastro melhorada
- `css/cadastro.css` - Estilos de alerta adicionados
- `cadastro.html` - Link de login corrigido
- `backend/app.py` - API funcionando corretamente

O sistema agora está 100% funcional e pronto para uso!