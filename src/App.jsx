import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/produtos');
      setProdutos(response.data);
      const mps = response.data.filter(p => p.tipo === 'MATERIA_PRIMA');
      setMateriasPrimas(mps);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]); 

  if (loading) {
    return <div className="loading-screen"><h1>Carregando dados do Backend...</h1></div>;
  }

  return (
    <div className="AppLayout">
      <Navbar />
      <main className="content">
        <Outlet context={{ 
          produtos, 
          materiasPrimas, 
          fetchProdutos 
        }} />
      </main>
    </div>
  );
}

export default App;