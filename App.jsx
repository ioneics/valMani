import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estado para controlar se a tela é de celular/tablet (menor que 768px)
  const [isMobile, setIsMobile] = useState(false)

  // Monitora o tamanho da janela do navegador em tempo real
  useEffect(() => {
    const checarTamanho = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checarTamanho() // Executa assim que o app carrega
    window.addEventListener('resize', checarTamanho) // Executa quando a tela muda de tamanho
    
    return () => window.removeEventListener('resize', checarTamanho)
  }, [])

  // Estado para armazenar a lista de agendamentos (Seus dados salvos!)
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: 'Ana Silva', telefone: '(31) 98888-7777', data: '2026-06-01', hora: '14:00', servico: 'Mão' },
    { id: 2, cliente: 'Beatriz Costa', telefone: '(31) 99999-8888', data: '2026-06-01', hora: '15:30', servico: 'Combo (Pé e Mão)' }
  ])

  // Estado para controlar os campos do formulário
  const [form, setForm] = useState({
    cliente: '',
    telefone: '',
    data: '',
    hora: '',
    servico: 'Mão'
  })

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Função para salvar o novo agendamento
  const handleSalvar = (e) => {
    e.preventDefault()

    if (!form.cliente || !form.telefone || !form.data || !form.hora) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const novoAgendamento = {
      id: Date.now(),
      ...form
    }

    setAgendamentos([...agendamentos, novoAgendamento])
    setForm({ cliente: '', telefone: '', data: '', hora: '', servico: 'Mão' })
  }

  // Função para excluir um agendamento
  const handleExcluir = (id) => {
    if (confirm('Deseja realmente cancelar este agendamento?')) {
      setAgendamentos(agendamentos.filter(item => item.id !== id))
    }
  }

  return (
    <div className="app-container" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: isMobile ? '15px' : '20px', 
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', color: '#d81b60' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '36px', margin: '0 0 5px 0' }}>Val Mani - Agenda</h1>
        <p style={{ margin: 0, fontSize: isMobile ? '14px' : '16px' }}>Gerencie os agendamentos das suas clientes</p>
      </header>

      {/* O container principal muda de Grid (2 colunas) para Flex (1 coluna) no celular */}
      <main style={{ 
        display: isMobile ? 'flex' : 'grid', 
        flexDirection: isMobile ? 'column' : 'unset',
        gridTemplateColumns: isMobile ? 'unset' : '1fr 1fr', 
        gap: '25px' 
      }}>
        
        {/* COLUNA: FORMULÁRIO */}
        <section className="form-section" style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ color: '#333', marginBottom: '15px', fontSize: '20px' }}>Novo Agendamento</h2>
          
          <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Nome da Cliente:</label>
              <input type="text" name="cliente" value={form.cliente} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ex: Maria Oliveira" />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Telefone/WhatsApp:</label>
              <input type="text" name="telefone" value={form.telefone} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ex: (31) 99999-9999" />
            </div>

            {/* Sub-grid de Data e Hora se divide em linhas individuais no celular */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: '10px' 
            }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Data:</label>
                <input type="date" name="data" value={form.data} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Horário:</label>
                <input type="time" name="hora" value={form.hora} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Serviço:</label>
              <select name="servico" value={form.servico} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box' }}>
                <option value="Mão">Mão</option>
                <option value="Pé">Pé</option>
                <option value="Combo (Pé e Mão)">Combo (Pé e Mão)</option>
                <option value="Alongamento">Alongamento Gel/Fibra</option>
              </select>
            </div>

            <button type="submit" style={{ background: '#d81b60', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
              Agendar Cliente
            </button>
          </form>
        </section>

        {/* COLUNA: LISTA DE AGENDAMENTOS */}
        <section className="list-section" style={{ boxSizing: 'border-box' }}>
          <h2 style={{ color: '#333', marginBottom: '15px', fontSize: '20px' }}>Próximos Horários ({agendamentos.length})</h2>
          
          {agendamentos.length === 0 ? (
            <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhum agendamento para os próximos dias.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {agendamentos.map((item) => (
                <div key={item.id} style={{ 
                  borderLeft: '5px solid #d81b60', 
                  background: '#fff', 
                  padding: '15px', 
                  borderRadius: '0 8px 8px 0', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row', // O botão vai para baixo no celular
                  justifyContent: 'space-between', 
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? '12px' : '0'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#222', fontSize: '18px' }}>{item.cliente}</h3>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#555' }}>📞 {item.telefone}</p>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', color: '#d81b60' }}>
                      📅 {item.data.split('-').reverse().join('/')} às {item.hora} - 💅 {item.servico}
                    </p>
                  </div>
                  <button onClick={() => handleExcluir(item.id)} style={{ 
                    background: '#ff4d4d', 
                    color: '#fff', 
                    border: 'none', 
                    padding: isMobile ? '10px 0' : '6px 10px', 
                    width: isMobile ? '100%' : 'auto', // Botão largo e fácil de clicar no toque do celular
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '13px',
                    fontWeight: isMobile ? 'bold' : 'normal'
                  }}>
                    Cancelar Agendamento
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App