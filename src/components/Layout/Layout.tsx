import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{  }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;