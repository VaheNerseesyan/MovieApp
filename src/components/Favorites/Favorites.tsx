import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import FilmCard from '../FilmCard/FilmCard';
import { Empty, Row } from 'antd';

const Favorites = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favoritesByUser);
    const user = useSelector((state: RootState) => state.auth.user);

    if (favorites[user?.email || ''] === undefined || favorites[user?.email || ''].length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <Empty
                    description="No favorite movies yet"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Favorite Movies</h2>
            <div style={{
                display: 'grid',
                gap: '24px'
            }}>
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