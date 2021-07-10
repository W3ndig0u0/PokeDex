import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './pokemonCard.css';

export default function PokemonList({pokemon}) {
  const colors = {
    fire: '#EE8130',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136', 
    fairy:'#D685AD', 
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28', 
    normal: '#A8A77A',
    ice: '#96D9D6',
    dark: '#705746',
    steel:  '#B7B7CE',
    ghost:  '#735797'
  };
  
  const typeImg = {
    fire: "https://i.imgur.com/5DP7q71.png",
    grass: "https://i.imgur.com/Mwt2to1.png",
    electric: "https://i.imgur.com/L0ToHpZ.png",
    water: "https://i.imgur.com/MLrW8sM.png",
    ground:  "https://i.imgur.com/dFVrsD2.png",
    rock: "https://i.imgur.com/nQf7yK5.png",
    fairy: "https://i.imgur.com/ifIVH5O.png",
    poison: "https://i.imgur.com/tpEqp3O.png",
    bug:  "https://i.imgur.com/5N9JFCq.png",
    dragon: "https://i.imgur.com/L0ToHpZ.png",
    psychic:"https://i.imgur.com/SeIpxwa.png",
    flying: "https://i.imgur.com/0hSckw2.png",
    fighting: "https://i.imgur.com/bZSxj0s.png",
    normal: "https://i.imgur.com/GTGp9Ms.png",
    ice:  "https://i.imgur.com/LgnK83E.png",
    dark: "https://i.imgur.com/4ZkfIlw.png",
    steel:  "https://i.imgur.com/tCC7tJQ.png",
    ghost: "https://i.imgur.com/z1qi568.png"
  };
  
  let random = Math.floor((Math.random() * 1118 + 1));
  let url = "https://pokeapi.co/api/v2/pokemon/";
  let pokemonUrl = url + random;
  
  const [pokemonName, setPokemonName] = useState();
  const [pokemonId, setPokemonId] = useState();
  const [pokemonType, setPokemonType] = useState();
  const [pokemonTypeImg1, setPokemonTypeImg1] = useState();
  const [pokemonTypeImg2, setPokemonTypeImg2] = useState();
  const [color, setColor] = useState();
  
  useEffect(() => {
    axios.get(pokemonUrl)
    .then(res => {
      setPokemonName(res.data.name);
      setPokemonId(res.data.id);
     
      setPokemonTypeImg1(typeImg[(res.data.types.map(type => type.type.name))]);
      setPokemonType((res.data.types.map(type => type.type.name)));
      setColor(colors[(res.data.types.map(type => type.type.name))]);
      
      if (res.data.types[1] !== undefined) {
        setColor(colors[(res.data.types[0].type.name)]);
        setPokemonTypeImg1(typeImg[(res.data.types[0].type.name)]);
        setPokemonTypeImg2(typeImg[(res.data.types[1].type.name)]);
      }
      else return null

    })
    .catch (error => {
      console.log(error);
    })
  }, []);


  return (
    <>
        <div className="pokemonList">
            {pokemon.map(p => (
              <span key={p}> {p} </span>
              ))}
        </div>

      <div className="pokemonCardContainer">
        <div className="pokemonCard" style={{backgroundImage: "linear-gradient( #ffffff ," + color + " )" }}>
            <h1>{pokemonName}</h1>
            <p className="pokemonId">#{pokemonId}</p>
            
            <img className="pokemonImg" src={" https://pokeres.bastionbot.org/images/pokemon/" + parseInt(pokemonId) + ".png" } alt={pokemonName}/>
            <div className="types">

            <img className="typeImg" src={pokemonTypeImg1} alt={pokemonType}/>
            <img className="typeImg" src={pokemonTypeImg2} alt={pokemonType}/>

            </div>
            <p>{pokemonType}</p>
            <p>{color}</p>
        </div>
      </div>
    </>
  )
}
