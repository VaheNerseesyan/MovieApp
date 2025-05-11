import { useNavigate, useParams } from "react-router-dom";
import { getFilm, getMovieActors, getMovieBackdrops } from "../../api/movieApi";
import { useState, useEffect } from "react";
import { Button, Card, Carousel, Empty, Rate, Spin } from "antd";
import { HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import background from '../../assets/Background.png';
import { getMovieVideos } from '../../api/movieApi';

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
    const [actors, setActors] = useState<any>([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (isNaN(Number(id))) {
            navigate('/pageNotFound');
        } 
    }, [])

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
            getMovieVideos(id).then(res => {
                setVideos(res)
            })
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        if (id) {
            getMovieBackdrops(id).then(res => {
                setBackdrops(res)
            })
            getMovieActors(id).then(res => {
                setActors(res)
            })
        }
    }, [])

    return (
        <>
            <div key={id}>
                <Card style={{ background: `url(${background})` }}>
                    {film.length === 0 ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'white', left: '50vw', top: '50vh' }} spin />} /> :
                        <>
                            <Button
                                style={{ marginTop: '50px', color: 'white', backgroundColor: 'transparent', border: '1.5px solid white', maxWidth: '250px' }}
                                key="back"
                                type="text"
                                onClick={() => navigate(-1)}
                            >
                                Go Back
                            </Button>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10px' }}>
                                {film?.poster_path ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${film?.poster_path}`}
                                        style={{ height: '100%', objectFit: 'cover', width: '420px' }}
                                    /> :
                                    <Empty
                                        style={{ height: '100%', objectFit: 'cover', width: '320px' }}
                                        description="No poster available"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                }
                                <div style={{ color: 'white', width: '60%', display: 'flex', flexDirection: 'column' }}>
                                    <h1 style={{ color: 'white' }}>{film?.original_title}</h1>
                                    {videos?.length > 0 ? (
                                        <iframe style={{
                                            width: "550px",
                                            height: "280px",
                                            borderRadius: "5px",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                        }}
                                            src={`https://www.youtube.com/embed/${videos[0].key}`}
                                            title={videos[0].name}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen />

                                    ) : (
                                        <Empty description="No trailer available" />
                                    )}
                                    <h2 style={{ color: 'white' }}>Overview</h2>
                                    {film?.overview}
                                    {film?.vote_average && <Rate style={{ marginTop: 10 }} disabled defaultValue={film?.vote_average / 2} allowHalf />}
                                    <div style={{ color: 'white', marginTop: 10 }}>
                                        Release date: {new Date(film?.release_date).toLocaleDateString()}
                                    </div>
                                    <div style={{ color: 'white', marginTop: 10 }}>
                                        {film?.runtime} Minutes
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
                                </div>
                            </div>
                            <Carousel
                                style={{
                                    height: '200px',
                                }}
                                autoplay
                                autoplaySpeed={2000}
                                dotPosition="bottom"
                                dots={false}
                                slidesToShow={5}
                                infinite={true}
                            >
                                {backdrops?.length > 0 && backdrops.map((movie: any) => (
                                    <div key={movie.id}>
                                        <img
                                            key={movie.id}
                                            style={{
                                                width: '300px',
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

                            <h2 style={{ color: 'white', textAlign: 'center', marginTop: '80px' }}>Actors</h2>
                            <Carousel
                                style={{
                                    height: '450px',
                                }}
                                autoplay
                                autoplaySpeed={2000}
                                dots={true}
                                dotPosition="bottom"
                                slidesToShow={6}
                                infinite={true}
                            >
                                {actors?.length > 0 && actors.filter((actor: any) => (
                                    actor.profile_path != null
                                )).map((actor: any) => (
                                    <div key={actor.id}>
                                        <img
                                            key={actor.id}
                                            style={{
                                                width: '200px',
                                                height: '300px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                margin: '10px auto',
                                                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                                                transition: 'transform 0.3s ease',
                                                transform: 'scale(0.9)'
                                            }}
                                            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                            alt={actor.name}
                                        />
                                        <h3 style={{ color: 'white', textAlign: 'center' }}>{actor.name}</h3>
                                        <h4 style={{ color: 'gray', textAlign: 'center' }}>(Actor character){actor.character}</h4>
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