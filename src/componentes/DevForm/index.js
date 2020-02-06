import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [techs, setTechs] = useState('')
    const [github_userName, setGitHubUserName] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude)
        setLongitude(longitude)
        },
        (err) =>{
        console.log(err)
        },
        {
        timeout: 30000,
        }
        )
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_userName,
            techs,
            latitude,
            longitude
          })

        setGitHubUserName('');
        setTechs('');
    }

    return(
        <form onSubmit = {handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usúario do Github</label>
            <input
            name="github_username"
            id= "github_username" 
            onChange ={e => setGitHubUserName(e.target.value)} 
            required/>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
            name="techs"
            id= "techs"
            onChange ={e => setTechs(e.target.value)} 
            required/>
          </div>
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
            name="latitude" 
            type="number" 
            id= "latitude" 
            value={latitude} 
            onChange ={e => setLatitude(e.target.value)}
            required/>
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude"
             type="number"
            id= "longitude"
            value={longitude}
            onChange ={e => setLongitude(e.target.value)}
            required/>
          </div>

          <button type="submit">
            Salvar
          </button>
        </form>
    )
}

export default DevForm