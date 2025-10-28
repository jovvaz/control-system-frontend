import React, { useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProdutoTabela } from '../components/ProdutoTabela';

export function ListaProdutosPage() {
    const { produtos, fetchProdutos } = useOutletContext();

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]);

    const materiasPrimas = useMemo(() => 
        produtos.filter(p => p.tipo === 'MATERIA_PRIMA'), 
    [produtos]);
    
    const produtosAcabados = useMemo(() => 
        produtos.filter(p => p.tipo === 'PRODUTO_ACABADO'), 
    [produtos]);

    return (
        <div>
            <h2>Matérias-Primas</h2>
            <ProdutoTabela 
                produtos={materiasPrimas} 
                fetchProdutos={fetchProdutos} 
            />
            <hr style={{ margin: '40px 0' }} />
            <h2>Produtos Acabados</h2>
            <ProdutoTabela 
                produtos={produtosAcabados} 
                fetchProdutos={fetchProdutos} 
            />
        </div>
    );
}