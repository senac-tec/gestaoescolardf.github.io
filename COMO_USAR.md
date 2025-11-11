# 🎓 Sistema de Gestão Escolar - Como Usar

## 🚀 Iniciar o Sistema

### Opção 1: Script Python Completo (Recomendado)
```bash
python iniciar_sistema.py
```

### Opção 2: Script Python Simples
```bash
python start.py
```

### Opção 3: Script Windows (.bat)
```bash
iniciar_sistema.bat
```

## 📋 O que os Scripts Fazem

### ✅ Verificações Automáticas:
- Verifica se Python está instalado
- Instala Flask e Flask-CORS se necessário
- Verifica se os arquivos existem

### 🔧 Inicialização:
1. **Backend (API + Banco)**: `http://localhost:5000`
2. **Frontend (Site)**: `http://localhost:8000`
3. **Abre o navegador** automaticamente

### 📊 Sistema Completo:
- Dashboard com estatísticas
- Gestão de Alunos
- Gestão de Professores
- Gestão de Turmas
- Controle de Notas
- Controle de Presença
- Calendário Escolar

## 🛑 Parar o Sistema

- Pressione `Ctrl+C` no terminal
- Ou feche as janelas do terminal

## 🌐 URLs do Sistema

- **Login (Página Principal)**: http://localhost:8000
- **Dashboard (Após Login)**: http://localhost:8000/home.html
- **API Backend**: http://localhost:5000
- **Banco de Dados**: SQLite (arquivo: backend/escola.db)

## 📁 Estrutura do Projeto

```
gestao-escolar/
├── iniciar_sistema.py     # Script completo (recomendado)
├── start.py              # Script simples
├── iniciar_sistema.bat   # Script Windows
├── index.html           # Página principal
├── backend/
│   ├── app.py          # API Flask
│   └── escola.db       # Banco SQLite
├── css/                # Estilos
├── js/                 # JavaScript
└── ...
```

## 🔧 Requisitos

- **Python 3.7+**
- **Flask** (instalado automaticamente)
- **Flask-CORS** (instalado automaticamente)

## 🆘 Solução de Problemas

### Erro: "Python não encontrado"
- Instale Python: https://python.org
- Certifique-se que está no PATH

### Erro: "Porta já em uso"
- Feche outros servidores na porta 5000 ou 8000
- Ou reinicie o computador

### Site não carrega
- Verifique se ambos os servidores estão rodando
- Acesse: http://localhost:8000

## 📞 Dados de Exemplo

O sistema vem com dados pré-carregados:
- **5 alunos** cadastrados
- **4 professores** ativos
- **4 turmas** configuradas
- **Eventos** no calendário
- **Usuários** para teste