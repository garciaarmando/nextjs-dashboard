import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SimplePokemon } from '@/pokemons';

interface PokemonsState {
    [key: string]: SimplePokemon
}

const getInitialState = (): PokemonsState => {
    // if ( typeof localStorage === 'undefined' ) return {}
    const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}')
    return favorites
}

const initialState: PokemonsState = {
    ...getInitialState()
}


const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
            const pokemon = action.payload
            const { id } = pokemon

            if (!!state[id]) {
                delete state[id]
            } else {
                state[id] = pokemon
            }
            // ! You should not do this while using redux. It's considered an anti-pattern

            localStorage.setItem('favorite-pokemons', JSON.stringify(state))
        }
    }
});

export const { toggleFavorite } = pokemonsSlice.actions

export default pokemonsSlice.reducer