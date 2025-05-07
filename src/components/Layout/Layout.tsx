import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, HeartOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { logout } from "../../features/logedIn/LogedInSlice";

const Layout = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch(); 

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Logout',
            onClick: () => {
                dispatch(logout());
            }
        },
    ];


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <nav style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Breadcrumb>
                    <NavLink to="/" end>
                        <HomeOutlined style={{ fontSize: '16px', color: 'black' }} />&nbsp; Home &nbsp;
                    </NavLink>
                    <NavLink to="/favorites" end>
                        <HeartOutlined style={{ fontSize: '16px', color: 'black' }} />&nbsp; Favorites &nbsp;
                    </NavLink>
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <UserOutlined style={{ fontSize: '16px', color: 'black', cursor: 'pointer' }} />
                                <span style={{ cursor: 'pointer' }}>{user?.email}</span>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Breadcrumb>
            </nav>
            <Outlet />
        </div >
    );
}

export default Layout;