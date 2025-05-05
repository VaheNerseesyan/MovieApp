import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, SettingOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";    

const Layout = () => {
    // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    return (
        <>
            <nav>
                <Breadcrumb>
                    <NavLink to="/favorites" end>
                        <HeartOutlined />&nbsp;Favorites&nbsp;
                    </NavLink>
                    <NavLink to="/account" end>
                        <UserOutlined />&nbsp;Account&nbsp;
                    </NavLink>
                    <NavLink to="/home" end>
                        <HomeOutlined />&nbsp;Home&nbsp;
                    </NavLink>
                </Breadcrumb>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;