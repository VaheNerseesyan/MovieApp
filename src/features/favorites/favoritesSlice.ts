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
    favoritesByUser: {
        [userEmail: string]: Movie[];
    };
}

const initialState: FavoritesState = {
    favoritesByUser: {}
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<{userEmail: string; movie: Movie}>) => {
            if (!state.favoritesByUser[action.payload.userEmail]) {
                state.favoritesByUser[action.payload.userEmail] = [];
            }
            if (!state.favoritesByUser[action.payload.userEmail].some(movie => movie.id === action.payload.movie.id)) {
                state.favoritesByUser[action.payload.userEmail].push(action.payload.movie);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<{userEmail: string; movieId: string}>) => {
            if (state.favoritesByUser[action.payload.userEmail]) {
                state.favoritesByUser[action.payload.userEmail] = state.favoritesByUser[action.payload.userEmail]
                    .filter(movie => movie.id !== action.payload.movieId);
            }
        }
    }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice; 