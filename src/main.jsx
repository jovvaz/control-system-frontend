// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'; // O nosso novo "Layout" (Pai)
import './index.css'; // Estilos globais

// Importamos TODAS as nossas novas páginas
import { ListaProdutosPage } from './pages/ListaProdutosPage.jsx';
import { CadastroProdutoPage } from './pages/CadastroProdutoPage.jsx';
import { EntradaEstoquePage } from './pages/EntradaEstoquePage.jsx';
import { ProducaoPage } from './pages/ProducaoPage.jsx';

// Aqui definimos as rotas (guias)
const router = createBrowserRouter([
  {
    path: "/", // O URL raiz
    element: <App />, // O App (com a Navbar) é o elemento "pai"
    
    // 'children' são as páginas que vão aparecer dentro do <Outlet> do App.jsx
    children: [
      {
        path: "/", // Se o URL for "/"
        element: <ListaProdutosPage />, // Mostre a página da lista de produtos
      },
      {
        path: "/cadastrar", // Se o URL for "/cadastrar"
        element: <CadastroProdutoPage />, // Mostre a página de cadastro
      },
      {
        path: "/entrada", // Se o URL for "/entrada"
        element: <EntradaEstoquePage />, // Mostre a página de entrada
      },
      {
        path: "/producao", // Se o URL for "/producao"
        element: <ProducaoPage />, // Mostre a página de produção
      },
    ]
  }
]);

// O React vai renderizar o nosso "roteador"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);