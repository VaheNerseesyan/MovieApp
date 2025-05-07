import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

interface FavoritesState {
    favorites: Movie[];
}

const initialState: FavoritesState = {
    favorites: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Movie>) => {
            if (!state.favorites.some(movie => movie.id === action.payload.id)) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
        }
    }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice; 