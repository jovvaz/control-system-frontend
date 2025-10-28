import React from 'react';
import axios from 'axios';

export function ProdutoTabela({ produtos, fetchProdutos }) {
    
    const [deleteMessage, setDeleteMessage] = React.useState({ type: '', text: '' });

    async function handleDelete(id, nome) {
        if (!window.confirm(`Tem certeza que deseja deletar o produto: ${nome} (ID: ${id})?`)) {
            return;
        }
        setDeleteMessage({ type: '', text: '' });
        try {
            await axios.delete(`http://localhost:8080/api/produtos/${id}`);
            fetchProdutos();
        } catch (error) {
            if (error.response) {
                setDeleteMessage({ type: 'error', text: error.response.data });
            } else {
                setDeleteMessage({ type: 'error', text: "Erro de rede ao deletar." });
            }
        }
    }

    if (produtos.length === 0) {
        return <p>Nenhum produto encontrado nesta categoria.</p>;
    }

    return (
        <div>
            {deleteMessage.text && (
                <p className={deleteMessage.type === 'error' ? 'error-message' : 'success-message'}>
                    {deleteMessage.text}
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Estoque Atual</th>
                        <th>Unidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.desc}</td>
                            <td>{produto.quantidadeEmEstoque}</td>
                            <td>{produto.unidadeMedida}</td>
                            <td>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(produto.id, produto.nome)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}