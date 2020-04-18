import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      title: `Teste ${Date.now()}`, 
      url: 'meurepositorio',
      techs: [
        'nodejs',
        'reactjs'
      ]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    
    try {
      const response = await api.delete(`repositories/${id}`);

      const repos = repositories;
      const repoIndex = repos.findIndex(repository => repository.id === id);
      repos.splice(repoIndex, 1);
  
      setRepositories([...repos]);
      
    } catch (error) {
      alert(`Erro ao remover: ${error.response.data.error}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
