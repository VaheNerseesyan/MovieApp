import { Card, Rate, Button, Typography, Space } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

function FilmCard({ title, poster_path, overview, vote_average, release_date, id }: Movie) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);
    const isFavorite = favorites.favorites.some((fav: Movie) => fav.id === id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({
                id,
                title,
                poster_path,
                overview,
                vote_average,
                release_date
            }));
        }
    };

    return (
        <Card
            hoverable
            id = {id}
            style={{ width: '320px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}
            cover={
                <img
                    alt={title}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    style={{ height: '100%', objectFit: 'cover', width: '320px' }}
                    onClick={() => navigate(`/movie/${id}`)}
                />
            }
            actions={[
                <Button 
                    key="favorite"
                    type="text" 
                    icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
            ]}
        >
            <Card.Meta
                title={title}
                description={
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Typography.Paragraph
                            ellipsis={{ rows: 3 }}
                            style={{ marginBottom: 0 }}
                        >
                            {overview}
                        </Typography.Paragraph>
                        <Space split>
                            <Rate disabled defaultValue={vote_average / 2} allowHalf />
                            <Typography.Text type="secondary">
                                {new Date(release_date).toLocaleDateString()}
                            </Typography.Text>
                        </Space>
                    </Space>
                }
            />
        </Card>
    );
}

export default FilmCard;