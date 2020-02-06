import React, { useState, useEffect } from 'react';
import Header from "./Header";
import api from './services/api'
import DevItem from './componentes/Devitem'
import DevForm from './componentes/DevForm'
import "./global.css";
import "./app.css";
import "./SideBar.css";
import "./Main.css";
// Componente: Bloco isolado de Html, Css e Js
// Propriedade: Informação que o conponente pai passa para o filho
// Estado: Imutabilidade

function App() {
  
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data){

    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
        
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem dev={dev}/>
          ))}
        
        </ul>
      </main>
    </div>
  );
}

export default App;
