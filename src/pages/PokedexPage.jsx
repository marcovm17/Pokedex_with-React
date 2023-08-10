import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import PokeCard from '../components/PokedexPage/PokeCard'
import { useRef } from 'react'
import SelectType from '../components/PokedexPage/SelectType'
import logo from './styles/logo.png';
import pokeball from './styles/pokeball.png';
import './styles/PokedexPage.css'

const PokedexPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 16;

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')

  const trainer = useSelector(reducer => reducer.trainer)

  const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${resultsPerPage * 10}`
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      getAllPokemons()
    } else {
      getPokemonsByType(selectValue)
    }
  }, [selectValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim().toLowerCase())
  }

  const cbFilter = poke => poke.name.includes(inputValue)

  return (
    <div className='pokedex'>
      <div className='logo__pokedex'>
        <img className="pokedex__logo" src={logo} alt="pokedexlogo" />
      </div>
      <div className='pokedexPage__container'>
        <div className='pokedexPage__header'>
          <p className='pokedexPage__welcome'><span>Welcome {trainer}!</span>, here you could find your favorite pokemon.</p>
          <form className='pokedexPage__form' onSubmit={handleSubmit}>
            <input className='pokedexPage__form-submit' placeholder={'Write the name of your favorite pokemon..'} ref={inputSearch} type='text' />
            <button className='pokedexPage__form-btn'>Search</button>
          </form>
        </div>
        <div className='pokedexPage__selectype'>
          <SelectType setSelectValue={setSelectValue} />
        </div>
        <div className='pokedexPage__cards'>
          {
            pokemons?.results
              .filter(cbFilter)
              .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
              .map(poke => (
                <PokeCard
                  key={poke.url}
                  url={poke.url}
                />
              ))
          }
        </div>
        <div className='pokedexPage__pagination'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            disabled={
              !pokemons || currentPage * resultsPerPage >= pokemons.results.length
            }
            onClick={() => {
              if (currentPage * resultsPerPage < pokemons.results.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
      <header className='header__pokedexPage'>
        <img className='pokeball' src={pokeball} alt="" />
      </header>
    </div>
  );
};

export default PokedexPage