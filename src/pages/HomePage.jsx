import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainerG } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import pokedex1 from './styles/pokedex1.png';
import logo from './styles/logo.png';
import pokeball from './styles/pokeball.png';
import './styles/HomePage.css';

const HomePage = () => {
  const inputTrainer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setTrainerG(inputTrainer.current.value.trim()));
    navigate('/pokedex');
  };

  return (
    <div className='home__page'>
      <div className='home__page-container'>
        <img className="pokedex__logo" src={logo} alt="pokedexlogo" />
        <div className="pokedex-container">
          <div className='pokedex__container-submit'>
            <form onSubmit={handleSubmit}>
              <input placeholder={'Write your name..'} id="inputTrainer" ref={inputTrainer} type="text" />
              <button className='button__homepage'>Gotta catch'em all!</button>
            </form>
          </div>
          <img className="pokedex__img" src={pokedex1} alt="pokedex" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;


