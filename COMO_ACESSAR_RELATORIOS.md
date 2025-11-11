# 📊 Como Acessar a Tela de Relatórios

## 🎯 Acesso Direto

### Opção 1: Pelo Menu Lateral
1. **Abra qualquer tela do sistema** (Dashboard, Alunos, Professores, etc.)
2. **Procure no menu lateral esquerdo** o item "Relatórios" 
3. **Clique em "Relatórios"** - tem o ícone de gráficos 📊
4. **Você será redirecionado** para a tela completa de relatórios

### Opção 2: URL Direta
- **Digite na barra do navegador**: `relatorios.html`
- **Ou acesse**: `file:///[seu-caminho]/gestao-escolar/relatorios.html`

## 🔧 Se Não Conseguir Ver o Menu

### Verifique se o Backend está Rodando
```bash
cd gestao-escolar/backend
python app.py
```

### Atualize a Página
- **Pressione F5** ou **Ctrl+F5** para recarregar
- **Limpe o cache** do navegador se necessário

## 📊 O que Você Verá na Tela de Relatórios

### KPIs Principais
- **Média Geral** do sistema
- **Alunos Ativos** matriculados
- **Taxa de Presença** média
- **Taxa de Aprovação** geral

### 10 Gráficos Interativos
1. **Desempenho por Disciplina** (Barras)
2. **Evolução das Notas** (Linhas)
3. **Distribuição de Notas** (Rosca)
4. **Análise de Frequência** (Radar)
5. **Comparação entre Turmas** (Barras Agrupadas)
6. **Mapa de Calor** (Heatmap)
7. **Tendências Mensais** (Linhas Duplas)
8. **Correlação Notas×Frequência** (Scatter)
9. **Desempenho por Idade** (Polar)
10. **Progressão Individual** (Linhas)

### Controles Avançados
- **Filtros de Período**: Bimestre, Semestre, Ano, Personalizado
- **Seletor de Aluno**: Para análise individual
- **Exportação**: PNG para gráficos, CSV para relatórios
- **Atualização**: Refresh dos dados em tempo real

## 🚀 Funcionalidades Disponíveis

### Análises Automáticas
- **🏆 Top 10 Melhores Desempenhos**
- **⚠️ Alunos em Risco** (média < 5.0)
- **📚 Disciplinas Críticas** (média < 6.0)
- **🎯 Turmas Destaque** (média ≥ 7.0)

### Relatórios Rápidos
- **Boletim Escolar** completo
- **Relatório de Frequência** detalhado
- **Análise de Desempenho** por disciplina
- **Relatório Comparativo** entre períodos

## 🎨 Interface Moderna

### Design Responsivo
- **Desktop**: Layout completo com múltiplas colunas
- **Tablet**: Adaptação inteligente
- **Mobile**: Interface otimizada para toque

### Interatividade
- **Gráficos Clicáveis**: Hover para detalhes
- **Tooltips Informativos**: Dados contextuais
- **Animações Suaves**: Transições elegantes
- **Cores Semânticas**: Verde/Amarelo/Vermelho

## 🔍 Troubleshooting

### Se a Tela Não Carregar
1. **Verifique o console** (F12 → Console)
2. **Confirme que o backend está rodando**
3. **Teste a URL direta**: `relatorios.html`
4. **Limpe o cache** do navegador

### Se os Gráficos Não Aparecem
1. **Aguarde o carregamento** (pode demorar alguns segundos)
2. **Verifique a conexão** com o backend
3. **Recarregue a página** (F5)
4. **Verifique se Chart.js está carregando**

### Se os Dados Estão Vazios
1. **Certifique-se** que há dados no sistema
2. **Verifique** se o backend tem dados de exemplo
3. **Execute** `python app.py` para gerar dados simulados

## 📱 Compatibilidade

### Navegadores Suportados
- **Chrome 90+** ✅
- **Firefox 88+** ✅
- **Safari 14+** ✅
- **Edge 90+** ✅

### Dispositivos
- **Desktop** (1920x1080+) ✅
- **Tablet** (768x1024) ✅
- **Mobile** (375x667+) ✅

## 🎯 Próximos Passos

1. **Acesse a tela** usando uma das opções acima
2. **Explore os gráficos** clicando e fazendo hover
3. **Teste os filtros** de período e turma
4. **Experimente a exportação** de relatórios
5. **Analise** os dados de performance

---

**A tela de relatórios está pronta e funcionando! Use este guia para acessá-la e explorar todas as funcionalidades. 🚀**