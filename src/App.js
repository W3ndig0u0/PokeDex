import React, {useState, useEffect} from 'react'
import PokemonList from './pokemonList'
import Search from './Search'
import axios from 'axios';
import './App.css'


function App() {

  const [nextPageUrl, setNextPageUrl] = useState();

  const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [count, setCount] = useState(0);
  
  let random =  Math.floor((Math.random() * 899 + 1));
  // let random =  1;
  let randomLatest = random + 2;

  // !körs bara en gång för varje gång pageUrl ändras
  useEffect(() =>{
    axios.get(pageUrl)
    .then(res => {
      setNextPageUrl(res.data.next);
    })
  }, [pageUrl]);


  function Remove(e) {
    setCount(count + 1)
    document.getElementsByClassName("pokemonCardContainer")[0].remove()
    console.log(document.getElementsByClassName("pokemonCardContainer").length);
    console.log(nextPageUrl);
    
    if (document.getElementsByClassName("pokemonCardContainer").length === 0) {
      setPageUrl(nextPageUrl);
    }
  }


  function goToNextPage()
  {
    setPageUrl(nextPageUrl);
  }
  
  function Add(e){
    let newRandom = randomLatest + count;
    console.log(newRandom);
    if (count < 1) {
      return (
        <>
          <div className="pokemons">
            <PokemonList random = {newRandom} pageUrl = { pageUrl } />
          </div>
        </>)
      }
    }

  return (
    <>
      <div className="appContainer">

        <Search />

        <div className="pokemons">
          <PokemonList random = {random} pageUrl = { pageUrl } />
          <PokemonList random = {random + 1} pageUrl = { pageUrl } />
          <PokemonList random = {randomLatest} pageUrl = { pageUrl } />
        </div>

        <div className="pages">
          
          {/* <button onClick = {Remove}>Remove</button> */}
          <button onClick = {goToNextPage}>Next</button>
          {/* <button onClick = {Add}>Add</button> */}
        </div>
      </div>
    </>
  );
}

export default App;