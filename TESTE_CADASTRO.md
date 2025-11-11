# 🧪 Como Testar o Sistema de Cadastro

## ✅ Passos para Testar:

### 1. Verificar se o Backend está Rodando
```bash
cd gestao-escolar/backend
python app.py
```
Deve aparecer: "Servidor rodando em http://localhost:5000"

### 2. Abrir a Tela de Cadastro
- Abra o arquivo `cadastro.html` no navegador
- Ou navegue para: `file:///[caminho]/gestao-escolar/cadastro.html`

### 3. Usar o Botão de Teste Automático
- Clique no botão verde "🧪 Testar Cadastro (Preencher Automaticamente)"
- Isso preencherá todos os campos automaticamente
- Depois clique em "Criar Conta"

### 4. Ou Preencher Manualmente:
```
Nome: João Silva
Email: joao@teste.com (use um email único)
CPF: 123.456.789-09
Telefone: (61) 99999-9999
Cargo: Professor
Senha: teste123
Confirmar Senha: teste123
☑️ Aceitar termos
```

### 5. Verificar no Console do Navegador
Abra as Ferramentas do Desenvolvedor (F12) e vá na aba "Console" para ver os logs:
- "Inicializando sistema de cadastro..."
- "Sistema de cadastro inicializado!"
- "Formulário submetido!"
- "Enviando dados para cadastro:"

### 6. Resultados Esperados:
- ✅ Mensagem verde: "Conta criada com sucesso! Redirecionando..."
- ✅ Redirecionamento para index.html após 2 segundos
- ✅ No console do backend: "POST /api/auth/register HTTP/1.1" 201

### 🚨 Se Não Funcionar:

1. **Verifique o Console do Navegador** (F12 → Console)
   - Procure por erros em vermelho
   - Verifique se aparecem os logs de inicialização

2. **Verifique o Backend**
   - Confirme que está rodando na porta 5000
   - Veja se aparecem requisições no terminal

3. **Teste a API Diretamente**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"nome":"Teste","email":"teste@teste.com","cpf":"123.456.789-00","cargo":"professor","senha":"teste123"}'
   ```

4. **Problemas Comuns:**
   - CORS: Certifique-se que Flask-CORS está instalado
   - Porta ocupada: Mude a porta no backend se necessário
   - Cache do navegador: Pressione Ctrl+F5 para recarregar

### 📝 Logs de Debug Adicionados:
O sistema agora tem logs detalhados para facilitar o debug:
- Inicialização do sistema
- Submissão do formulário
- Validação de campos
- Envio para API
- Respostas da API

### 🎯 Status Atual:
- ✅ Backend funcionando (testado com curl)
- ✅ API de cadastro respondendo corretamente
- ✅ Formulário HTML estruturado
- ✅ JavaScript com logs de debug
- ✅ Botão de teste automático adicionado