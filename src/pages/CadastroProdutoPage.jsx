import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function CadastroProdutoPage() {
    const { fetchProdutos, materiasPrimas } = useOutletContext();
    const navigate = useNavigate();

    const [formId, setFormId] = useState('');
    const [formNome, setFormNome] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formTipo, setFormTipo] = useState('MATERIA_PRIMA');
    const [formUnidade, setFormUnidade] = useState('un');
    const [formComponentes, setFormComponentes] = useState([]);
    const [tempCompId, setTempCompId] = useState(materiasPrimas.length > 0 ? materiasPrimas[0].id : '');
    const [tempCompQtd, setTempCompQtd] = useState(0);
    const [cadastroMessage, setCadastroMessage] = useState({ type: '', text: '' });

    async function handleCriarProduto(event) {
        event.preventDefault();
        setCadastroMessage({ type: '', text: '' });
        
        if (formTipo === 'MATERIA_PRIMA') {
            await criarMateriaPrima();
        } else {
            await criarProdutoAcabado();
        }
    }

    async function criarMateriaPrima() {
        const dto = { id: formId, nome: formNome, desc: formDesc, tipo: 'MATERIA_PRIMA', unidadeMedida: formUnidade };
        try {
            await axios.post('http://localhost:8080/api/produtos', dto);
            navigate("/"); 
        } catch (error) {
            setCadastroMessage({ type: 'error', text: error.response?.data || error.message });
        }
    }

    async function criarProdutoAcabado() {
        if (formComponentes.length === 0) {
            setCadastroMessage({ type: 'error', text: "Produto Acabado deve ter pelo menos um componente!" });
            return;
        }
        const componentesDTO = formComponentes.map(comp => ({ materiaPrimaId: comp.id, quantidade: comp.quantidade }));
        const dto = { id: formId, nome: formNome, desc: formDesc, unidadeMedida: formUnidade, componentes: componentesDTO };
        try {
            await axios.post('http://localhost:8080/api/producao/produto-acabado', dto);
            navigate("/");
        } catch (error) {
            setCadastroMessage({ type: 'error', text: error.response?.data || error.message });
        }
    }

    function resetarFormularioProduto() {
        setFormId('');
        setFormNome('');
        setFormDesc('');
        setFormTipo('MATERIA_PRIMA');
        setFormUnidade('un');
        setFormComponentes([]);
        setTempCompId(materiasPrimas.length > 0 ? materiasPrimas[0].id : '');
        setTempCompQtd(0);
    }

    function handleAddComponente(e) {
        e.preventDefault();
        if (tempCompQtd <= 0) {
            setCadastroMessage({ type: 'error', text: "Quantidade do componente deve ser maior que zero." });
            return;
        }
        const mpNome = materiasPrimas.find(mp => mp.id === tempCompId)?.nome || '??';
        setFormComponentes([...formComponentes, { id: tempCompId, nome: mpNome, quantidade: tempCompQtd }]);
        setTempCompQtd(0);
        setCadastroMessage({ type: '', text: '' });
    }

    return (
        <div>
            <h2>Cadastrar Novo Produto</h2>
            {cadastroMessage.text && ( <p className={cadastroMessage.type === 'error' ? 'error-message' : 'success-message'}> {cadastroMessage.text} </p> )}
            <form onSubmit={handleCriarProduto}>
                <div><label>ID do Produto (Ex: MP-004): </label><input type="text" value={formId} onChange={(e) => setFormId(e.target.value)} required /></div>
                <div><label>Nome: </label><input type="text" value={formNome} onChange={(e) => setFormNome(e.target.value)} required /></div>
                <div><label>Descrição: </label><input type="text" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} required /></div>
                <div><label>Unidade: </label><select value={formUnidade} onChange={(e) => setFormUnidade(e.target.value)}><option value="un">un (Unidade)</option><option value="kg">kg (Quilograma)</option><option value="L">L (Litro)</option></select></div>
                <div><label>Tipo: </label><select value={formTipo} onChange={(e) => setFormTipo(e.target.value)}><option value="MATERIA_PRIMA">Matéria-Prima</option><option value="PRODUTO_ACABADO">Produto Acabado</option></select></div>
                {formTipo === 'PRODUTO_ACABADO' && (
                    <div className="recipe-section">
                        <h4>Componentes da Receita:</h4>
                        <form onSubmit={handleAddComponente}>
                            <label>Matéria-Prima: </label>
                            <select value={tempCompId} onChange={(e) => setTempCompId(e.target.value)}>
                                {materiasPrimas.map(mp => (<option key={mp.id} value={mp.id}>{mp.nome} (ID: {mp.id})</option>))}
                            </select>
                            <label> Qtd: </label>
                            <input type="number" step="0.01" min="0.01" value={tempCompQtd} onChange={(e) => setTempCompQtd(Number(e.target.value))} />
                            <button type="submit">Adicionar Componente</button>
                        </form>
                        <ul>
                            {formComponentes.map((comp, index) => (<li key={index}>{comp.quantidade} {comp.nome}</li>))}
                        </ul>
                    </div>
                )}
                <br />
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}