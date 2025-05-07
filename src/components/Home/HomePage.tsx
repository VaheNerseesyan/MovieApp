import { useEffect, useState } from "react";
import { MovieApi, getFilmByTitle } from "../api/MovieApi";
import FilmCard from "../FilmCard/FilmCard";
import { Pagination, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Search from "antd/es/input/Search";


function HomePage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(useParams().pageid || 1);
    const navigate = useNavigate();
    const { pageid } = useParams();
    const [search, setSearch] = useState(useParams().title);
    const location = useLocation();

    useEffect(() => {
        if (isNaN(Number(pageid))) {
            navigate('/pageNotFound');
        } else {
            setCurrentPage(Number(pageid));
            navigate(`/page/${pageid}`);
        }
    }, [pageid])

    const changePage = (pageid: number) => {
        setCurrentPage(pageid);
        navigate(`/page/${pageid}`);
    }

    // useEffect(() => {
    //     navigate(`/page/${currentPage}`);
    // }, [currentPage])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        MovieApi(Number(currentPage)).then(res => setMovies(res));
        // navigate(`/page/${currentPage}`);
    }, [currentPage]);

    // useEffect(() => {
    //     if (!location.pathname.includes('/search/')) {
    //         setSearch('');
    //     }
    // }, [location.pathname]);

    return (
        <>
            <div>
                <Search 
                    style={{ width: '300px' }}
                    placeholder="Search By Title"
                    onSearch={() => console.log('search')}
                    type="text"
                    id="search" />
            </div>
            <div>
                <h1>Movies</h1>
                <div>
                    <Row justify="center" style={{ justifyContent: 'space-evenly' }} gutter={[15, 15]}>
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
        </>
    )
}

export default HomePage;