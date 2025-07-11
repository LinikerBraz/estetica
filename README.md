# 💅 Sistema de Controle Financeiro para Estética

Um sistema web completo para controle financeiro de atendimentos estéticos, desenvolvido em HTML, CSS e JavaScript puro, sem necessidade de banco de dados.

## 📋 Funcionalidades

### ✨ Principais Recursos
- **Cadastro de Atendimentos**: Registre cliente, valor cobrado e custo do serviço
- **Cálculo Automático de Lucro**: O sistema calcula automaticamente o lucro (valor - custo)
- **Resumo Financeiro**: Visualize totais de receita, custos e lucro em cards coloridos
- **Tabela Detalhada**: Lista todos os atendimentos com data/hora, cliente e valores
- **Armazenamento Local**: Dados salvos no navegador usando localStorage
- **Limpeza de Dados**: Botão para limpar todos os dados da semana
- **Design Responsivo**: Interface adaptável para desktop, tablet e celular

### 🎨 Interface
- Design limpo com cores suaves (rosa/lilás) adequadas para o segmento estético
- Animações suaves e efeitos visuais modernos
- Cards coloridos para diferentes métricas financeiras
- Tabela responsiva com scroll horizontal
- Mensagens de feedback para ações do usuário

## 🚀 Como Usar

### Instalação
1. Baixe todos os arquivos do projeto
2. Abra o arquivo \`index.html\` em qualquer navegador moderno
3. O sistema estará pronto para uso!

### Operação Básica

#### Adicionando um Atendimento
1. Preencha o formulário "Novo Atendimento":
   - **Nome do Cliente**: Digite o nome completo
   - **Valor Cobrado**: Valor que você cobrou pelo serviço
   - **Custo do Serviço**: Custo dos materiais/produtos utilizados
2. Clique em "✨ Adicionar Atendimento"
3. O lucro será calculado automaticamente (Valor Cobrado - Custo)

#### Visualizando Dados
- **Resumo Financeiro**: Cards coloridos mostram totais consolidados
- **Tabela de Atendimentos**: Lista detalhada de todos os registros
- **Valores em Tempo Real**: Totais atualizados automaticamente

#### Gerenciando Dados
- **Excluir Atendimento**: Clique no botão "🗑️ Excluir" na linha desejada
- **Limpar Semana**: Use o botão "🗑️ Limpar Dados da Semana" para resetar tudo

## 📁 Estrutura do Projeto

\`\`\`
projeto/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos e design responsivo
├── script.js           # Lógica JavaScript e gerenciamento de dados
└── README.md           # Documentação (este arquivo)
\`\`\`

## 🔧 Documentação Técnica

### Arquivos Principais

#### index.html
Estrutura HTML semântica com:
- **Header**: Título e descrição do sistema
- **Form Section**: Formulário para novos atendimentos
- **Summary Section**: Cards com resumo financeiro
- **Table Section**: Tabela de atendimentos registrados

#### styles.css
Estilos CSS organizados com:
- **Reset e Configurações Globais**: Normalização de estilos
- **Layout Responsivo**: Grid e flexbox para diferentes telas
- **Componentes Visuais**: Cards, botões, tabelas estilizados
- **Animações**: Transições suaves e efeitos visuais
- **Media Queries**: Adaptação para tablet e mobile

#### script.js
Lógica JavaScript estruturada em classe:
- **FinanceManager**: Classe principal que gerencia todo o sistema
- **Event Listeners**: Captura interações do usuário
- **LocalStorage**: Persistência de dados no navegador
- **Cálculos Financeiros**: Processamento de totais e lucros
- **Renderização**: Atualização dinâmica da interface

### Principais Métodos JavaScript

#### Inicialização
\`\`\`javascript
init() // Inicializa o sistema
setupEventListeners() // Configura eventos
loadData() // Carrega dados salvos
\`\`\`

#### Manipulação de Dados
\`\`\`javascript
handleFormSubmit(event) // Processa novo atendimento
removeAttendance(id) // Remove atendimento específico
clearAllData() // Limpa todos os dados
\`\`\`

#### Armazenamento
\`\`\`javascript
saveData() // Salva no localStorage
loadData() // Carrega do localStorage
\`\`\`

#### Cálculos e Renderização
\`\`\`javascript
calculateTotals() // Calcula totais financeiros
formatCurrency(value) // Formata valores monetários
render() // Atualiza interface completa
\`\`\`

## 💾 Armazenamento de Dados

### LocalStorage
- **Chave**: \`aesthetic_finance_data\`
- **Formato**: JSON array com objetos de atendimento
- **Persistência**: Dados mantidos entre sessões do navegador
- **Capacidade**: Limitada pelo navegador (geralmente 5-10MB)

### Estrutura dos Dados
\`\`\`javascript
{
  id: 1640995200000,           // Timestamp único
  clientName: "Maria Silva",    // Nome do cliente
  chargedValue: 150.00,        // Valor cobrado
  serviceCost: 45.00,          // Custo do serviço
  profit: 105.00,              // Lucro calculado
  date: "31/12/2023 14:30:00"  // Data/hora formatada
}
\`\`\`

## 🎨 Personalização

### Cores do Sistema
- **Primária**: #8b5a96 (Roxo suave)
- **Secundária**: #a569bd (Lilás)
- **Receita**: #2ecc71 (Verde)
- **Custos**: #f39c12 (Laranja)
- **Lucro**: #3498db (Azul)
- **Perigo**: #e74c3c (Vermelho)

### Modificando Estilos
Para personalizar as cores, edite as variáveis CSS em \`styles.css\`:
\`\`\`css
/* Exemplo de personalização */
.btn-primary {
    background: linear-gradient(135deg, #sua-cor-1, #sua-cor-2);
}
\`\`\`

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 768px (Layout em 2 colunas)
- **Tablet**: ≤ 768px (Layout em 1 coluna)
- **Mobile**: ≤ 480px (Otimizações adicionais)

### Adaptações Mobile
- Formulário e resumo em coluna única
- Tabela com scroll horizontal
- Botões em largura total
- Fontes e espaçamentos reduzidos

## 🔒 Segurança e Privacidade

### Dados Locais
- **Armazenamento**: Apenas no navegador do usuário
- **Privacidade**: Dados não são enviados para servidores
- **Backup**: Responsabilidade do usuário
- **Limpeza**: Dados removidos ao limpar cache do navegador

### Recomendações
- Faça backup regular dos dados importantes
- Use o sistema em navegador confiável
- Evite usar em computadores públicos para dados sensíveis

## 🐛 Solução de Problemas

### Problemas Comuns

#### Dados não salvam
- Verifique se o navegador permite localStorage
- Confirme que não está em modo privado/incógnito
- Limpe cache e cookies se necessário

#### Interface não carrega
- Verifique se JavaScript está habilitado
- Confirme que todos os arquivos estão na mesma pasta
- Teste em navegador diferente

#### Valores incorretos
- Use ponto (.) como separador decimal
- Verifique se os campos estão preenchidos corretamente
- Confirme que valores são números positivos

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- Exportação de dados para Excel/PDF
- Gráficos de desempenho financeiro
- Categorização de serviços
- Relatórios por período
- Backup automático na nuvem

### Contribuições
Este é um projeto de código aberto. Sugestões e melhorias são bem-vindas!

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte esta documentação
2. Verifique os problemas comuns acima
3. Teste em navegador atualizado
4. Confirme que JavaScript está habilitado

---

**Desenvolvido com 💜 para profissionais da estética**

*Sistema simples, eficiente e seguro para controle financeiro de atendimentos estéticos.*
