// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Vamos criar este ficheiro de CSS a seguir

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h2>Estoque Eficiente</h2>
      </div>
      <ul className="navbar-links">
        {/* NavLink é um Link especial que sabe qual página está "ativa" */}
        <li><NavLink to="/">Lista de Produtos</NavLink></li>
        <li><NavLink to="/cadastrar">Cadastrar Produto</NavLink></li>
        <li><NavLink to="/entrada">Dar Entrada (Compra)</NavLink></li>
        <li><NavLink to="/producao">Executar Produção</NavLink></li>
      </ul>
    </nav>
  );
}