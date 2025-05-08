import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, HeartOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { logout } from "../../features/logedIn/LogedInSlice";
import Search from "antd/es/input/Search";
import { useState } from "react";

const Layout = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch(); 
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
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

    const breadcrumbItems = [
        {
            title: (
                <NavLink to="/" end>
                    <HomeOutlined style={{ fontSize: '16px', color: 'black' }} />&nbsp; Home &nbsp;
                </NavLink>
            ),
        },
        {
            title: (
                <NavLink to="/favorites" end>
                    <HeartOutlined style={{ fontSize: '16px', color: 'black' }} />&nbsp; Favorites &nbsp;
                </NavLink>
            ),
        },
        {
            title: (
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <UserOutlined style={{ fontSize: '16px', color: 'black', cursor: 'pointer' }} />
                            <span style={{ cursor: 'pointer' }}>{user?.email}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ),
        },
    ];

    const handleSearch = (value: string) => {
        navigate(`/search/${value}/page/1`);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <nav style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Breadcrumb items={breadcrumbItems} />
            </nav>
            <div>
                <Search
                    style={{ width: '300px' }}
                    placeholder="Search By Title"
                    onSearch={handleSearch}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    id="search" />
            </div>
            <Outlet />
        </div >
    );
}

export default Layout;