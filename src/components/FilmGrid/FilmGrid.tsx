import { useParams } from "react-router-dom";
import { getFilm, getMovieBackdrops } from "../api/MovieApi";
import { useState, useEffect } from "react";
import { Button, Card, Carousel, Empty, Rate, Spin } from "antd";
import { HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
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
    const [film, setFilm] = useState<any>([]);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const userFavorites = useSelector(selectUserFavorites);
    const isFavorite = userFavorites.some((fav: any) => Number(fav.id) === Number(id));
    const [videos, setVideos] = useState<any>(null);
    const [backdrops, setBackdrops] = useState<any>(null);

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        if (id) {
            getMovieBackdrops(id).then(res => {
                setBackdrops(res)
            })
        }
    }, [])

    return (
        <>
            <div key={id}>
                <Card style={{ background: `url(${background})`, width: '100%', height: '100%' }}>
                    {film.length === 0 ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'white', left: '50vw', top: '50vh' }} spin />} /> :
                        <>
                            <h1 style={{ color: 'white', marginTop: 40, textAlign: 'center' }}>{film?.title}</h1>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                {film?.poster_path ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${film?.poster_path}`}
                                        style={{ height: '100%', objectFit: 'cover', width: '380px' }}
                                    /> :
                                    <Empty
                                        style={{ height: '100%', objectFit: 'cover', width: '320px' }}
                                        description="No poster available"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                }
                                <div style={{ color: 'white', width: '50%', display: 'flex', flexDirection: 'column' }}>
                                    <h2 style={{ color: 'white' }}>Overview</h2>
                                    {film?.overview}
                                    {film?.vote_average && <Rate style={{ marginTop: 10 }} disabled defaultValue={film?.vote_average / 2} allowHalf />}
                                    <div style={{ color: 'white', marginTop: 10 }}>
                                        Release date: {new Date(film?.release_date).toLocaleDateString()}
                                    </div>
                                    <Button
                                        style={{ marginTop: '10px', color: 'white', backgroundColor: 'black', border: '1px solid white', maxWidth: '250px' }}
                                        key="favorite"
                                        type="text"
                                        icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                                        onClick={handleFavoriteClick}
                                    >
                                        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    </Button>
                                    <h2 style={{ color: 'white' }}>Trailer</h2>
                                    {videos?.length > 0 ? (
                                        <iframe style={{ width: '300px', height: '200px' }}
                                            src={`https://www.themoviedb.org/video/play?key=${videos[0].key}`} title={videos[0].name} />
                                    ) : (
                                        <Empty description="No trailer available" />
                                    )}
                                </div>
                            </div>
                            <h2 style={{ color: 'white', textAlign: 'center', marginTop: '30px' }}>Backdrop photos</h2>
                            <Carousel
                                style={{
                                    height: '200px',
                                    marginTop: '10px',
                                }}
                                autoplay
                                autoplaySpeed={1800}
                                dotPosition="bottom"
                                slidesToShow={5}
                                infinite={true}

                            >
                                {backdrops?.length > 0 && backdrops.map((movie: any) => (
                                    <div key={movie.id} style={{

                                    }}>
                                        <img
                                            key={movie.id}
                                            style={{
                                                width: '310px',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                margin: '10px auto',
                                                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                                                transition: 'transform 0.3s ease',
                                                transform: 'scale(0.9)'
                                            }}
                                            src={`https://image.tmdb.org/t/p/w500/${movie.file_path}`}
                                            alt={movie.title}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </>
                    }</Card>
            </div>
        </>
    )
}

export default FilmGrid;