import { createSlice } from '@reduxjs/toolkit'
import { SimplePokemon } from '@/pokemons';

interface PokemonsState {
    [key: string]: SimplePokemon
}

const initialState: PokemonsState= {
    '1': {id: '1', name: 'bulbasur'},
    '3': {id: '1', name: 'venusaur'},
    '5': {id: '1', name: 'charmaleon'},
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {}
});

export const {} = pokemonsSlice.actions

export default pokemonsSlice.reducer