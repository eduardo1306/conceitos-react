import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {    
    api.get("/repositories")
      .then(response => {
        setRepositories(response.data)
      })              
  }, []);

  async function handleAddRepository() {          
    
    const newRepo = {
      title: `Novo Repositório ${Date.now()}`,
      url: 'https://github.com/eduardo1306/newRepo',
      techs: ['Javascript', 'React']
    }

    const repository = await api.post('/repositories', newRepo)      
    setRepositories([...repositories, repository.data]);              
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
      
    setRepositories(repositories.filter( repo => repo.id !== id))
  }

  return (
    <>      
      <ul data-testid="repository-list">
      {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
      ))}
      </ul>
      <button onClick={() => handleAddRepository()}>Adicionar</button>            
    </>
  );
}

export default App;