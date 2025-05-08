import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

interface FavoritesState {
    favoritesByUser: {
        [userEmail: string]: Movie[];
    };
}

const initialState: FavoritesState = {
    favoritesByUser: JSON.parse(localStorage.getItem('favorites') || '{}')
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<{userEmail: string; movie: Movie}>) => {
            if (!state.favoritesByUser[action.payload.userEmail]) {
                state.favoritesByUser[action.payload.userEmail] = [];
                localStorage.setItem('favorites', JSON.stringify(state.favoritesByUser));
            }
            if (!state.favoritesByUser[action.payload.userEmail].some(movie => movie.id === action.payload.movie.id)) {
                state.favoritesByUser[action.payload.userEmail].push(action.payload.movie);
                localStorage.setItem('favorites', JSON.stringify(state.favoritesByUser));
            }
        },
        removeFromFavorites: (state, action: PayloadAction<{userEmail: string; movieId: number}>) => {
            if (state.favoritesByUser[action.payload.userEmail]) {
                state.favoritesByUser[action.payload.userEmail] = state.favoritesByUser[action.payload.userEmail]
                    .filter(movie => movie.id !== Number(action.payload.movieId));
                localStorage.setItem('favorites', JSON.stringify(state.favoritesByUser));
            }
        }
    }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice; 