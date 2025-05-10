import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from "../../features/logedIn/LogedInSlice";
import { NavLink, useNavigate } from 'react-router-dom';
import Search from "antd/es/input/Search";
import { Breadcrumb, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined, HeartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { createSelector } from "@reduxjs/toolkit";

const selectUserFavorites = createSelector(
    [(state: RootState) => state.favorites.favoritesByUser,
    (state: RootState) => state.auth.user?.email],
    (favoritesByUser, userEmail) => favoritesByUser[userEmail || ''] || []
);

function Header() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const userFavorites = useSelector(selectUserFavorites);

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
                    <HomeOutlined style={{ fontSize: '16px', color: 'white' }} /><span style={{color: 'white'}}>&nbsp; Home &nbsp;</span>
                </NavLink>
            ),
        },
        {
            title: (
                <NavLink to="/favorites" end>
                    <HeartOutlined style={{ fontSize: '16px', color: 'white' }} /><span style={{color: 'white'}}>&nbsp; Favorites {userFavorites.length ? userFavorites.length : null} &nbsp;</span>
                </NavLink>
            ),
        },
        {
            title: (
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <UserOutlined style={{ fontSize: '16px', color: 'white', cursor: 'pointer' }} />
                            <span style={{ cursor: 'pointer', color: 'white' }}>{user?.email}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ),
        },
    ];

    const handleSearch = (value: string) => {
        if (searchValue) {
            navigate(`/search/${value}/page/1`);
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: 12,
            backgroundColor: 'rgba(101, 101, 101, 0.77)',
            backdropFilter: 'blur(5px)',
        }}>
            <nav style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20, color: 'white' }}>
                <Breadcrumb items={breadcrumbItems} />
            </nav>

            <Search
                style={{ width: '300px', marginLeft: '100vh' }}
                placeholder="Search By Title"
                onSearch={handleSearch}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="search" />
        </div >
    );
}

export default Header;