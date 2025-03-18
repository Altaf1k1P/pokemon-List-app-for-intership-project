import { useState } from 'react'
import './App.css'
import PokemonList from './components/pokemonList.jsx'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <PokemonList />
    </>
  )
}

export default App
