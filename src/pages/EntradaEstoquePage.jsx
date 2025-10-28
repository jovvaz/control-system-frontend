// src/pages/EntradaEstoquePage.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

// Esta página contém a lógica para o formulário de "Dar Entrada"
export function EntradaEstoquePage() {
  // Pega a função "global" fetchProdutos do App.jsx
  const { fetchProdutos } = useOutletContext();
  
  // Estados locais para este formulário
  const [formEntradaId, setFormEntradaId] = useState('');
  const [formEntradaQtd, setFormEntradaQtd] = useState(0);
  const [entradaMessage, setEntradaMessage] = useState({ type: '', text: '' }); // Para mensagens de sucesso/erro

  // Função chamada ao submeter o formulário
  async function handleDarEntrada(event) {
    event.preventDefault();
    setEntradaMessage({ type: '', text: '' }); // Limpa mensagens antigas
    
    const entradaDTO = { 
      produtoId: formEntradaId, 
      quantidade: formEntradaQtd 
    };
    
    try {
      // Chama a API de /api/produtos/entrada
      const response = await axios.post('http://localhost:8080/api/produtos/entrada', entradaDTO);
      
      // Sucesso!
      setEntradaMessage({ type: 'success', text: `Entrada de ${response.data.nome} registrada com sucesso!` });
      fetchProdutos(); // Atualiza a lista "global" de produtos
      
      // Limpa o formulário
      setFormEntradaId('');
      setFormEntradaQtd(0);

    } catch (error) {
      // Erro!
      if (error.response && error.response.status === 404) {
        setEntradaMessage({ type: 'error', text: `Produto com ID ${formEntradaId} não encontrado.` });
      } else {
        setEntradaMessage({ type: 'error', text: "Erro ao registrar entrada. Verifique o console." });
      }
      console.error("Erro ao dar entrada:", error);
    }
  }

  return (
    <div>
      <h2>Dar Entrada no Estoque (Compra)</h2>
      
      {/* O formulário de entrada */}
      <form onSubmit={handleDarEntrada}>
        <div>
          <label>ID do Produto: </label>
          <input 
            type="text" 
            placeholder="ID do produto (ex: MP-001)" 
            value={formEntradaId} 
            onChange={(e) => setFormEntradaId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Quantidade de Entrada: </label>
          <input 
            type="number" 
            min="1" 
            value={formEntradaQtd} 
            onChange={(e) => setFormEntradaQtd(Number(e.target.value))} 
            required 
          />
        </div>
        <button type="submit">Registrar Entrada</button>
      </form>
      
      {/* Local para mostrar as mensagens de sucesso (verde) ou erro (vermelho) */}
      {entradaMessage.text && (
        <p className={entradaMessage.type === 'error' ? 'error-message' : 'success-message'}>
          {entradaMessage.text}
        </p>
      )}
    </div>
  );
}