import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import FilmCard from '../FilmCard/FilmCard';
import { Empty, Row } from 'antd';
import background from '../../assets/Background.png';
const Favorites = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favoritesByUser);
    const user = useSelector((state: RootState) => state.auth.user);

    if (favorites[user?.email || ''] === undefined || favorites[user?.email || ''].length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: `url(${background})`,
            }}>
                <Empty
                    description="No favorite movies yet"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    return (
        <div style={{ background: `url(${background})` }}>
            <div style={{
                display: 'grid',
                gap: '24px'
            }}>
                <h2 style={{ textAlign: 'center', color: 'white', marginTop: '80px' }}>{favorites[user?.email || ''].length} &nbsp; Favorite Movies</h2>
                <Row justify="center" style={{ justifyContent: 'space-evenly', gap: '42px' }}>
                    {favorites[user?.email || ''].map((favorite) => (
                        <FilmCard
                            key={favorite.id}
                            title={favorite.title}
                            poster_path={favorite.poster_path}
                            overview={favorite.overview}
                            vote_average={favorite.vote_average}
                            release_date={favorite.release_date}
                            id={favorite.id.toString()}
                        />
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Favorites;