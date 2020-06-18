import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ projects, setProjects ] = useState([])

  useEffect(() =>{
    api.get('repositories').then(response => {
      const project = response.data

      setProjects(project)
    })
  },[])

  async function handleAddRepository() {
    const obj = {
      "title" : `Novo projeto ${Date.now()}`,
      "url" : "https://github.com/Rocketseat/umbriel",
      "techs": "Node,Express,TypeScript"
    }
    const response = await api.post(('repositories'), obj)
    const project = response.data

    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setProjects(projects.filter(project => project.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project =>
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
