import { useParams } from "react-router-dom";
import { getFilm } from "../api/MovieApi";
import { useState, useEffect } from "react";
import { Button, Card, Rate, Typography } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';

const selectUserFavorites = createSelector(
    [(state: RootState) => state.favorites.favoritesByUser, 
     (state: RootState) => state.auth.user?.email],
    (favoritesByUser, userEmail) => favoritesByUser[userEmail || ''] || []
);

function FilmGrid() {
    const { id } = useParams();
    const [film, setFilm] = useState<any>(null);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const userFavorites = useSelector(selectUserFavorites);
    const isFavorite = userFavorites.some((fav: any) => Number(fav.id) === Number(id));

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites({
                userEmail: user?.email || '',
                movieId: Number(id)
            }));
        } else {
            dispatch(addToFavorites({
                userEmail: user?.email || '',
                movie: {
                    id: Number(id),
                    title: film?.title,
                    poster_path: film?.poster_path,
                    overview: film?.overview,
                    vote_average: film?.vote_average,
                    release_date: film?.release_date
                }
            }));
        }
    };

    useEffect(() => {
        if (id) {
            getFilm(id).then(res => {
                setFilm(res)
            })
        }
    }, [id]);

    return (
        <div key={id}>
            <Card style={{ border: '1px solid white' }}>
                <h1>{film?.title}</h1>
                <img style={{ width: 300, height: 450 }} src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`} alt={film?.title} />
                <Typography.Paragraph>
                    {film?.overview}
                </Typography.Paragraph>
                {film?.vote_average && <Rate disabled defaultValue={film?.vote_average / 2} allowHalf />}
                <div>
                    Release date: {new Date(film?.release_date).toLocaleDateString()}
                </div>
                <Button
                    key="favorite"
                    type="text"
                    icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
            </Card>
        </div>
    )
}

export default FilmGrid;