import { createAppSlice } from "../../app/createAppSlice"

interface AuthState {
  isLoggedIn: boolean;
  user: {
    email: string | null;
    uid: string | null;
  } | null;
  favorites: {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
  }[];
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("user_info") ? true : false,
  user: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info") || "{}") : null,
  favorites: [],
}

const authSlice = createAppSlice({
  name: "auth", 
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("user_info", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload.id);
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user_info");
    },
  },
})

export const { login, logout, removeFavorite } = authSlice.actions
export default authSlice