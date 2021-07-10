import React, {useState, useEffect} from 'react'
import PokemonList from './pokemonList'
import Pages from './Pages'
import axios from 'axios';
import './App.css'


function App() {
  
  const [pokemon, setPokemon] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [loading, setLoading] = useState(true);
  let cancel;
  
  // !körs bara en gång för varje gång pageUrl ändras
  useEffect(() =>{
    setLoading(true);
    axios.get(pageUrl, {cancelToken: new axios.CancelToken(c => cancel = c)})
    .then(res => {
      setLoading(false);
      // !listan
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name));
    })
    return () => cancel()
  }, [pageUrl]);

  if (loading) return (<div className="loading">"loading.."</div>)

  function goToNextPage(){
    setPageUrl(nextPageUrl);
  }

  function goToPrevPage(){
    setPageUrl(prevPageUrl);
  }

  return (
    <>
      <div className="appContainer">
        <div className="pokemons">
          <PokemonList pokemon = {pokemon} />
        </div>

        <div className="pages">
          <Pages
            goToNextPage = {nextPageUrl ? goToNextPage : null}
            goToPrevPage = {prevPageUrl ? goToPrevPage : null} />
        </div>
      </div>
    </>
  );
}

export default App;
