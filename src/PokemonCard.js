import React from 'react'
import './pokemonCard.css';

export default function PokemonCard({color, color2, pokemonId, pokemonName, pokemonTypeImg1, pokemonTypeImg2, pokemonType1, pokemonType2}) {
  return (

    <div className="pokemonCardContainer">
    <div className="pokemonCard" style={{backgroundImage: `linear-gradient(160deg,  ${color2}, ${color} )` }}>
        
        <div className="pokemonImgContainer">
          <div className="pokemonBoxImg">
          <img className="pokemonImg" src={" https://pokeres.bastionbot.org/images/pokemon/" + parseInt(pokemonId) + ".png" } alt={pokemonName}/>
          </div>
        </div>

      <div className="pokemonStatsContainer">
          <p className="pokemonId">#{pokemonId}</p>
          <h1 className="pokemonName">{pokemonName}</h1>

        <div className="types">
          <img className="typeImg type1 " src={pokemonTypeImg1} data-tooltip={pokemonType1} alt={pokemonType1}/>
          <img className="typeImg type2" src={pokemonTypeImg2} data-tooltip={pokemonType2} alt={pokemonType2}/>
        </div>
      </div>

    </div>
  </div>
  )
}
