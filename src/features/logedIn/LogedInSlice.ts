import { createAppSlice } from "../../app/createAppSlice"

interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
}

const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true
    },
    logout: state => {
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice