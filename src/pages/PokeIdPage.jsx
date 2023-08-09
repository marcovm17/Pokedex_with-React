import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokeIdPage.css'
import logo from './styles/logo.png';

const PokeIdPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/pokedex/')
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
  const [pokemon, getSinglePokemon] = useFetch(url)

  useEffect(() => {
    getSinglePokemon()
  }, [id])

  const firstType = pokemon?.types[0].type.name

  return (
    <article className="pokedexId" __container>
      <div className={`pokeIdcard ${firstType}-border`}>
        <button onClick={handleClick} className={`pokecardIdBtn ${firstType}-color`}>
          <i className='bx bx-arrow-back bx-flip-vertical' style={{ fontSize: '4.5vh', marginRight: '5px' }}></i>
          <div className="pokeId__logo">
            <img className="logo" src={logo} alt="pokedexlogo" />
          </div>
        </button>
        <header className={`pokeIdcard__header ${firstType}-gradient`}>
          <img
            className="pokeIdcard__image"
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt=""
          />
        </header>
        <section className="pokeIdcard__body">
          <h3 className={`pokeIdcard__name ${firstType}-color`}>{pokemon?.name}</h3>
          <ul className="pokeIdcard__types">
            {pokemon?.types.map(typeInfo => (
              <li className={`pokeIdcard__typename ${typeInfo.type.name}-background`} key={typeInfo.type.url}>
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
          <ul className="pokedexidpage__characteristics__list">
            <li className="pokedexidpage__characteristics__item">
              <h4 className="pokedexidpage__characteristics__name">weight</h4>
              <span className="pokedexidpage__characteristics__value">
                {(pokemon?.weight * 0.1).toFixed(1)} Kg
              </span>
            </li>
            <li className="pokedexidpage__characteristics__item">
              <h4 className="pokedexidpage__characteristics__name">height</h4>
              <span className="pokedexidpage__characteristics__value">
                {(pokemon?.height * 0.1).toFixed(1)} M
              </span>
            </li>
          </ul>
          <hr className="pokeIdcard__hr" />
          <ul className="pokeIdcard__stats">
            {pokemon?.stats.map(statInfo => (
              <li className="pokeIdcard__stat" key={statInfo.stat.url}>
                <h4 className="pokeIdcard__stat__name">{statInfo.stat.name}</h4>
                <span className={`pokeIdcard__stat__value ${firstType}-color`}>
                  {statInfo.base_stat}
                </span>
              </li>
            ))}
          </ul>
          <div className="abilities">
            <h2 className="pokedexidpage__title-abilities">Abilities</h2>
            <ul className="pokedexidpage__list-abilities">
              {pokemon?.abilities.map((abilityInfo) => (
                <li
                  className="pokedexidpage__abilityname"
                  key={abilityInfo.ability.url}
                >
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
};

export default PokeIdPage