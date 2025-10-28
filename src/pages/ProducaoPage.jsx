
import React, { useState } from 'react';


import { useOutletContext } from 'react-router-dom'; 


import axios from 'axios';

export function ProducaoPage() {

  const { fetchProdutos } = useOutletContext();
  
  // Estados locais para este formulário
  const [formProdId, setFormProdId] = useState('');
  const [formProdQtd, setFormProdQtd] = useState(1);
  const [productionMessage, setProductionMessage] = useState({ type: '', text: '' }); // Para mensagens de sucesso/erro

  // Função chamada ao submeter o formulário
  async function handleExecutarProducao(event) {
    event.preventDefault();
    setProductionMessage({ type: '', text: '' }); // Limpa mensagens antigas
    
    const ordemProducaoDTO = { 
      produtoAcabadoId: formProdId, 
      quantidadeAProduzir: formProdQtd 
    };
    
    try {
      // Chama a API de /api/producao/executar
      const response = await axios.post('http://localhost:8080/api/producao/executar', ordemProducaoDTO);
      
      // Sucesso!
      setProductionMessage({ type: 'success', text: response.data });
      fetchProdutos(); // Atualiza a lista "global" de produtos
      
      // Limpa o formulário
      setFormProdId('');
      setFormProdQtd(1); // Esta é a linha que corrigimos do "Qtran"

    } catch (error) {
      // Erro!
      if (error.response) {
       
        setProductionMessage({ type: 'error', text: error.response.data });
      } else {
        setProductionMessage({ type: 'error', text: "Erro de rede. Verifique o console." });
      }
      console.error("Erro ao executar produção:", error);
    }
  }

  return (
    <div>
      <h2>Executar Ordem de Produção</h2>
      
      {/* O formulário de produção */}
      <form onSubmit={handleExecutarProducao}>
        <div>
          <label>ID do Produto Acabado: </label>
          <input 
            type="text" 
            placeholder="Ex: PA-001" 
            value={formProdId} 
            onChange={(e) => setFormProdId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Quantidade a Produzir: </label>
          <input 
            type="number" 
            min="1" 
            value={formProdQtd} 
            onChange={(e) => setFormProdQtd(Number(e.target.value))} 
            required 
          />
        </div>
        <button type="submit">Executar Produção</button>
      </form>
      
      {/* Local para mostrar as mensagens de sucesso (verde) ou erro (vermelho) */}
      {productionMessage.text && (
        <p className={productionMessage.type === 'error' ? 'error-message' : 'success-message'}>
          {productionMessage.text}
        </p>
      )}
    </div>
  );
}