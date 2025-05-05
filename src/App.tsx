import { RouterProvider } from "react-router"
import router from "./Routers"
// import ProtectedRoute from "./components/Layout/ProtectedRout";

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App;
