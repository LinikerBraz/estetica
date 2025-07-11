// Classe principal para gerenciar o sistema financeiro
class FinanceManager {
  constructor() {
    // Chave para armazenamento no localStorage
    this.storageKey = "aesthetic_finance_data"

    // Array para armazenar os atendimentos
    this.attendances = []

    // Inicializa o sistema
    this.init()
  }

  // Método de inicialização do sistema
  init() {
    // Carrega dados salvos do localStorage
    this.loadData()

    // Configura os event listeners
    this.setupEventListeners()

    // Renderiza a interface inicial
    this.render()
  }

  // Configura todos os event listeners da aplicação
  setupEventListeners() {
    // Event listener para o formulário de atendimento
    const form = document.getElementById("attendanceForm")
    form.addEventListener("submit", (e) => this.handleFormSubmit(e))

    // Event listener para o botão de limpar dados
    const clearBtn = document.getElementById("clearDataBtn")
    clearBtn.addEventListener("click", () => this.clearAllData())
  }

  // Manipula o envio do formulário
  handleFormSubmit(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault()

    // Obtém os dados do formulário
    const formData = new FormData(event.target)

    // Cria objeto com os dados do atendimento
    const attendance = {
      id: Date.now(), // ID único baseado no timestamp
      clientName: formData.get("clientName").trim(), // Nome do cliente
      chargedValue: Number.parseFloat(formData.get("chargedValue")), // Valor cobrado
      serviceCost: Number.parseFloat(formData.get("serviceCost")), // Custo do serviço
      profit: 0, // Lucro (será calculado)
      date: new Date().toLocaleString("pt-BR"), // Data/hora atual formatada
    }

    // Calcula o lucro (valor cobrado - custo do serviço)
    attendance.profit = attendance.chargedValue - attendance.serviceCost

    // Adiciona o atendimento ao array
    this.attendances.push(attendance)

    // Salva os dados no localStorage
    this.saveData()

    // Re-renderiza a interface
    this.render()

    // Limpa o formulário
    event.target.reset()

    // Exibe mensagem de sucesso
    this.showSuccessMessage("Atendimento adicionado com sucesso!")
  }

  // Remove um atendimento específico
  removeAttendance(id) {
    // Confirma a exclusão com o usuário
    if (confirm("Tem certeza que deseja excluir este atendimento?")) {
      // Remove o atendimento do array
      this.attendances = this.attendances.filter((attendance) => attendance.id !== id)

      // Salva os dados atualizados
      this.saveData()

      // Re-renderiza a interface
      this.render()

      // Exibe mensagem de sucesso
      this.showSuccessMessage("Atendimento removido com sucesso!")
    }
  }

  // Limpa todos os dados armazenados
  clearAllData() {
    // Confirma a ação com o usuário
    if (confirm("Tem certeza que deseja limpar todos os dados da semana? Esta ação não pode ser desfeita.")) {
      // Limpa o array de atendimentos
      this.attendances = []

      // Remove dados do localStorage
      localStorage.removeItem(this.storageKey)

      // Re-renderiza a interface
      this.render()

      // Exibe mensagem de sucesso
      this.showSuccessMessage("Todos os dados foram limpos!")
    }
  }

  // Carrega dados do localStorage
  loadData() {
    try {
      // Tenta recuperar dados do localStorage
      const savedData = localStorage.getItem(this.storageKey)

      // Se existem dados salvos, carrega-os
      if (savedData) {
        this.attendances = JSON.parse(savedData)
      }
    } catch (error) {
      // Em caso de erro, exibe no console e inicializa array vazio
      console.error("Erro ao carregar dados:", error)
      this.attendances = []
    }
  }

  // Salva dados no localStorage
  saveData() {
    try {
      // Converte array para JSON e salva no localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(this.attendances))
    } catch (error) {
      // Em caso de erro, exibe no console
      console.error("Erro ao salvar dados:", error)
      alert("Erro ao salvar dados. Verifique se o navegador permite armazenamento local.")
    }
  }

  // Calcula os totais financeiros
  calculateTotals() {
    // Usa reduce para somar todos os valores
    const totalRevenue = this.attendances.reduce((sum, attendance) => sum + attendance.chargedValue, 0)
    const totalCosts = this.attendances.reduce((sum, attendance) => sum + attendance.serviceCost, 0)
    const totalProfit = this.attendances.reduce((sum, attendance) => sum + attendance.profit, 0)

    // Retorna objeto com os totais
    return {
      revenue: totalRevenue,
      costs: totalCosts,
      profit: totalProfit,
    }
  }

  // Formata valor monetário para exibição
  formatCurrency(value) {
    // Usa Intl.NumberFormat para formatação em Real brasileiro
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Renderiza toda a interface
  render() {
    // Renderiza resumo financeiro
    this.renderSummary()

    // Renderiza tabela de atendimentos
    this.renderTable()
  }

  // Renderiza o resumo financeiro
  renderSummary() {
    // Calcula os totais
    const totals = this.calculateTotals()

    // Atualiza os elementos do DOM com os valores formatados
    document.getElementById("totalRevenue").textContent = this.formatCurrency(totals.revenue)
    document.getElementById("totalCosts").textContent = this.formatCurrency(totals.costs)
    document.getElementById("totalProfit").textContent = this.formatCurrency(totals.profit)
  }

  // Renderiza a tabela de atendimentos
  renderTable() {
    // Obtém referências dos elementos da tabela
    const tableBody = document.getElementById("attendanceTableBody")
    const emptyMessage = document.getElementById("emptyMessage")
    const tableContainer = document.querySelector(".table-container")

    // Limpa o conteúdo atual da tabela
    tableBody.innerHTML = ""

    // Verifica se existem atendimentos
    if (this.attendances.length === 0) {
      // Mostra mensagem vazia e oculta tabela
      emptyMessage.classList.remove("hidden")
      tableContainer.classList.add("hidden")
      return
    }

    // Oculta mensagem vazia e mostra tabela
    emptyMessage.classList.add("hidden")
    tableContainer.classList.remove("hidden")

    // Cria uma linha para cada atendimento
    this.attendances.forEach((attendance) => {
      const row = document.createElement("tr")

      // Define o HTML da linha com todos os dados
      row.innerHTML = `
                <td>${attendance.date}</td>
                <td>${attendance.clientName}</td>
                <td>${this.formatCurrency(attendance.chargedValue)}</td>
                <td>${this.formatCurrency(attendance.serviceCost)}</td>
                <td class="${attendance.profit >= 0 ? "profit-positive" : "profit-negative"}">
                    ${this.formatCurrency(attendance.profit)}
                </td>
                <td>
                    <button 
                        class="btn btn-delete" 
                        onclick="financeManager.removeAttendance(${attendance.id})"
                        title="Excluir atendimento"
                    >
                        🗑️ Excluir
                    </button>
                </td>
            `

      // Adiciona a linha ao corpo da tabela
      tableBody.appendChild(row)
    })
  }

  // Exibe mensagem de sucesso temporária
  showSuccessMessage(message) {
    // Cria elemento da mensagem
    const messageDiv = document.createElement("div")
    messageDiv.className = "success-message"
    messageDiv.textContent = message

    // Adiciona estilos inline para a mensagem
    Object.assign(messageDiv.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "linear-gradient(135deg, #2ecc71, #27ae60)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      zIndex: "1000",
      fontSize: "14px",
      fontWeight: "500",
      animation: "slideInRight 0.3s ease-out",
    })

    // Adiciona a mensagem ao body
    document.body.appendChild(messageDiv)

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
      messageDiv.style.animation = "slideOutRight 0.3s ease-in"
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.parentNode.removeChild(messageDiv)
        }
      }, 300)
    }, 3000)
  }
}

// Adiciona estilos CSS para as animações das mensagens
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .profit-positive {
        color: #27ae60;
        font-weight: 600;
    }
    
    .profit-negative {
        color: #e74c3c;
        font-weight: 600;
    }
`
document.head.appendChild(style)

// Variável global para acessar o gerenciador
let financeManager

// Inicializa o sistema quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Cria instância do gerenciador financeiro
  financeManager = new FinanceManager()
})

// Adiciona event listener para salvar dados antes de sair da página
window.addEventListener("beforeunload", () => {
  // Salva dados automaticamente
  if (financeManager) {
    financeManager.saveData()
  }
})
