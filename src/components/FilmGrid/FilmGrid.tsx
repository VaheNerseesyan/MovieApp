import { useParams } from "react-router-dom";
import { getFilm } from "../api/MovieApi";
import { useState, useEffect } from "react";
import { Button, Card, Empty, Rate, Typography } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import background from '../../assets/Background.png';
import { getMovieVideos } from '../api/MovieApi';

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
    const [videos, setVideos] = useState<any>(null);

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

    useEffect(() => {
        if (id) {
            getMovieVideos(id).then(res => {
                setVideos(res)
            })
        }
    }, [id])

    console.log('videos', videos)
    return (
        <>
            <div key={id}>
                <Card style={{ background: `url(${background})`, width: '99vw', height: '100vw' }}>
                    <h1 style={{ color: 'white', marginTop: 40 }}>{film?.title}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {film?.backdrop_path ?
                            <img
                                src={`https://image.tmdb.org/t/p/original/${film?.backdrop_path}`}
                                style={{ width: '100%', objectFit: 'cover', }}
                            /> :
                            <Empty
                                style={{ height: '100%', objectFit: 'cover', width: '320px' }}
                                description="No poster available"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        }
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                            <h2 style={{ color: 'white' }}>Trailer</h2>
                            {videos?.length > 0 ? (
                                <iframe style={{ width: '300px', height: '200px' }}
                                    src={`https://www.themoviedb.org/video/play?key=${videos[0].key}`} title={videos[0].name} />
                            ) : (
                                <Empty description="No trailer available" />
                            )}
                            {film?.vote_average && <Rate style={{ marginTop: 10 }} disabled defaultValue={film?.vote_average / 2} allowHalf />}
                            <div style={{ color: 'white', marginTop: 10 }}>
                                Release date: {new Date(film?.release_date).toLocaleDateString()}
                            </div>
                            <Button
                                style={{ marginTop: '10px', color: 'white', backgroundColor: 'black', border: '1px solid white' }}
                                key="favorite"
                                type="text"
                                icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                                onClick={handleFavoriteClick}
                            >
                                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            </Button>
                        </div>
                        <Typography.Paragraph style={{ color: 'white', width: '50%' }}>
                            <h2 style={{ color: 'white' }}>Overview</h2>
                            {film?.overview}
                        </Typography.Paragraph>
                    </div>

                </Card>
            </div>
        </>
    )
}

export default FilmGrid;