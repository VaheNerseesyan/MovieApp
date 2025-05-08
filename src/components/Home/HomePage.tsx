import { useEffect, useState, memo } from "react";
import { MovieApi, getPopularMovies } from "../api/MovieApi";
import FilmCard from "../FilmCard/FilmCard";
import { Pagination, Row, Carousel } from "antd";
import { useNavigate, useParams } from "react-router-dom";


function HomePage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(useParams().pageid || 1);
    const navigate = useNavigate();
    const { pageid } = useParams();
    const [popularMovies, setPopularMovies] = useState([]);
    // const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (isNaN(Number(pageid))) {
            navigate('/pageNotFound');
        } else {
            setCurrentPage(Number(pageid));
            navigate(`/page/${pageid}`);
        }
    }, [pageid])

    useEffect(() => {
        MovieApi(Number(currentPage)).then(res => setMovies(res));
    }, [currentPage]);

    const changePage = (pageid: number) => {
        setCurrentPage(pageid);
        navigate(`/page/${pageid}`);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        getPopularMovies().then(res => setPopularMovies(res));
    }, []);
    return (
        <div>
            <div>
                <h2 style={{ textAlign: 'center' }}>Popular Movies</h2>
                <div style={{ 
                    width: '99vw',
                    height: '370px', 
                    backgroundColor: '#d1d1d1', 
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}>
                    <Carousel 
                        style={{ 
                            width: '99vw',
                            height: '350px',
                        }} 
                        autoplay
                        autoplaySpeed={1800}
                        dotPosition="bottom"
                        slidesToShow={5}
                        centerMode={true}
                        centerPadding="100px"
                        infinite={true}
                        
                    >
                        {popularMovies?.length > 0 && popularMovies.map((movie: any) => (
                            <div key={movie.id} style={{
                                padding: '0 10px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img 
                                    style={{ 
                                        width: '200px', 
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        margin: '10px auto',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                                        transition: 'transform 0.3s ease',
                                        transform: 'scale(0.9)'
                                    }} 
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                                    alt={movie.title} 
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Movies</h2>
                    <div>
                    <Row justify="center" style={{ justifyContent: 'space-evenly' }}>
                        {movies?.length > 0 && movies.map((movie: any) => (
                            <FilmCard
                                key={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                overview={movie.overview}
                                vote_average={movie.vote_average}
                                release_date={movie.release_date}
                                id={movie.id}
                            />
                        ))}
                    </Row>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        current={Number(currentPage)}
                        onChange={changePage}
                        total={50}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default memo(HomePage);