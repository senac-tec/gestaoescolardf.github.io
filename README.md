# 🎓 EducaGestaoDF - Sistema de Gestão Escolar

Sistema completo de gestão escolar com **banco de dados integrado**, interface moderna e relatórios avançados.

## Estrutura do Projeto

\`\`\`
gestao-escolar/
├── backend/               # Backend Python Flask
│   ├── app.py            # API REST
│   ├── requirements.txt  # Dependências Python
│   └── README.md         # Documentação da API
├── css/                  # Estilos CSS
│   └── styles.css        # Estilos globais
├── js/                   # JavaScript
│   ├── dashboard.js      # Lógica do dashboard
│   ├── alunos.js         # Gestão de alunos
│   ├── professores.js    # Gestão de professores
│   ├── turmas.js         # Gestão de turmas
│   └── notas.js          # Gestão de matrículas
├── index.html            # Dashboard principal
├── alunos.html           # Página de alunos
├── professores.html      # Página de professores
├── turmas.html           # Página de turmas
├── notas.html            # Página de matrículas
└── escola.db             # Banco de dados SQLite (gerado automaticamente)
\`\`\`

## 🚀 Como Executar

### **Opção 1: Script Automático (Recomendado)**

**Windows:**
```bash
# Clique duas vezes no arquivo
iniciar-sistema.bat
```

**Linux/Mac:**
```bash
# No terminal
./iniciar-sistema.sh
```

### **Opção 2: Manual**

1. **Instalar dependências:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Iniciar backend:**
   ```bash
   python app.py
   ```

3. **Abrir no navegador:**
   - Acesse diretamente: `home.html`
   - Backend API: `http://localhost:5000`

## ✨ Funcionalidades Principais

### 🏠 **Dashboard Inteligente**
- ✅ **Estatísticas em tempo real** do banco de dados
- ✅ **Atividades recentes** automáticas
- ✅ **Mini calendário** com eventos
- ✅ **Indicador de conexão** visual

### 👥 **Gestão Completa de Pessoas**
- ✅ **Alunos**: CRUD completo com validações
- ✅ **Professores**: Especialização por disciplina
- ✅ **Busca avançada** por qualquer campo
- ✅ **Status dinâmicos** (Ativo/Inativo/Licença)

### 🏫 **Gestão Acadêmica**
- ✅ **Turmas**: Capacidade e horários
- ✅ **Matrículas**: Controle de vínculos
- ✅ **Notas**: Sistema completo por disciplina/bimestre
- ✅ **Frequência**: Controle de presença por turma

### 📅 **Calendário Escolar**
- ✅ **Eventos** com tipos diferenciados
- ✅ **Associação** com turmas e professores
- ✅ **Visualização mensal** interativa
- ✅ **CRUD completo** de eventos

### 📊 **Sistema de Relatórios Avançado**
- ✅ **10 tipos de gráficos** interativos
- ✅ **KPIs em tempo real** calculados
- ✅ **Análises automáticas** (top performers, alunos em risco)
- ✅ **Exportação** CSV/PNG profissional

### 📋 **Boletim Individual**
- ✅ **Dados reais** do banco por aluno
- ✅ **Gráficos personalizados** de desempenho
- ✅ **Cálculo automático** de médias e frequência
- ✅ **Status de aprovação** dinâmico

## Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Lógica e interação com API

### Backend
- **Python 3** - Linguagem de programação
- **Flask** - Framework web
- **SQLite** - Banco de dados
- **Flask-CORS** - Suporte a CORS

## API Endpoints

### Estatísticas
- `GET /api/stats` - Retorna estatísticas do dashboard
- `GET /api/atividades` - Retorna atividades recentes

### Alunos
- `GET /api/alunos` - Lista todos os alunos
- `GET /api/alunos/<id>` - Busca um aluno específico
- `POST /api/alunos` - Cria um novo aluno
- `PUT /api/alunos/<id>` - Atualiza um aluno
- `DELETE /api/alunos/<id>` - Exclui um aluno

### Professores
- `GET /api/professores` - Lista todos os professores
- `GET /api/professores/<id>` - Busca um professor específico
- `POST /api/professores` - Cria um novo professor
- `PUT /api/professores/<id>` - Atualiza um professor
- `DELETE /api/professores/<id>` - Exclui um professor

### Turmas
- `GET /api/turmas` - Lista todas as turmas
- `GET /api/turmas/<id>` - Busca uma turma específica
- `POST /api/turmas` - Cria uma nova turma
- `PUT /api/turmas/<id>` - Atualiza uma turma
- `DELETE /api/turmas/<id>` - Exclui uma turma

### Matrículas
- `GET /api/matriculas` - Lista todas as matrículas
- `POST /api/matriculas` - Cria uma nova matrícula

## Banco de Dados

O sistema utiliza SQLite com as seguintes tabelas:

- **alunos** - Informações dos alunos
- **professores** - Informações dos professores
- **turmas** - Informações das turmas
- **matriculas** - Relacionamento entre alunos e turmas
- **notas** - Notas dos alunos
- **frequencia** - Registro de frequência

## Design

O sistema possui um design moderno e responsivo com:
- Sidebar de navegação fixa
- Cards de estatísticas com ícones coloridos
- Tabelas responsivas
- Modais para formulários
- Badges de status coloridos
- Paleta de cores profissional (azul, verde, roxo, laranja)

## Dados de Exemplo

O sistema é inicializado com dados de exemplo:
- 5 alunos
- 4 professores
- 4 turmas
- 5 matrículas
- Notas e frequências de exemplo

## Requisitos

- Python 3.7+
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## Suporte

Para problemas ou dúvidas, verifique:
1. Se o servidor backend está rodando em `http://localhost:5000`
2. Se não há erros no console do navegador (F12)
3. Se o banco de dados foi criado corretamente

## Licença

Este projeto foi desenvolvido para fins educacionais.
