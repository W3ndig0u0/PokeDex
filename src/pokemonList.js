import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard'

export default function PokemonList({random, pageUrl}) {
  
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
    dragon: "https://i.imgur.com/zeZiQYf.png",
    psychic:"https://i.imgur.com/SeIpxwa.png",
    flying: "https://i.imgur.com/0hSckw2.png",
    fighting: "https://i.imgur.com/bZSxj0s.png",
    normal: "https://i.imgur.com/GTGp9Ms.png",
    ice:  "https://i.imgur.com/LgnK83E.png",
    dark: "https://i.imgur.com/4ZkfIlw.png",
    steel:  "https://i.imgur.com/tCC7tJQ.png",
    ghost: "https://i.imgur.com/z1qi568.png"
  };

  let url = "https://pokeapi.co/api/v2/pokemon/";
  let pokemonUrl = url + random;
  
  const [pokemonName, setPokemonName] = useState();
  const [pokemonId, setPokemonId] = useState();
  const [pokemonType1, setPokemonType1] = useState();
  const [pokemonType2, setPokemonType2] = useState();
  const [pokemonTypeImg1, setPokemonTypeImg1] = useState();
  const [pokemonTypeImg2, setPokemonTypeImg2] = useState();
  const [color, setColor] = useState();
  const [color2, setColor2] = useState();
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    setLoading(true);
    axios.get(pokemonUrl)

    .then(res => {
      setLoading(false);
      setPokemonName(res.data.name);
      setPokemonId(res.data.id);
     
      setPokemonTypeImg1(typeImg[(res.data?.types[0]?.type.name)]);
      setPokemonType1(res.data?.types[0]?.type.name);
      setColor(colors[(res.data.types.map(type => type.type.name))]);
      setColor2(colors[(res.data?.types[0]?.type.name)]);
      
      if (res.data.types[1] !== undefined) {
        setColor(colors[(res.data?.types[0]?.type.name)]);
        setColor2(colors[(res.data?.types[1]?.type.name)]);
        setPokemonType2(res.data?.types[1]?.type.name);
        setPokemonTypeImg2(typeImg[(res.data?.types[1]?.type.name)]);
      }

    })
    .catch (err => {
      console.error(err);
    })
  }, [pageUrl]);

  if (loading) return (<div className="loading">"loading.."</div>)

  return (
    <>

        <PokemonCard 
          color = {color} color2 = {color2} 
          pokemonId = {pokemonId} pokemonName = {pokemonName} 
          pokemonTypeImg1 = {pokemonTypeImg1} pokemonTypeImg2 = {pokemonTypeImg2} 
          pokemonType1 = {pokemonType1} pokemonType2 = {pokemonType2} />
    </>
  )
}
