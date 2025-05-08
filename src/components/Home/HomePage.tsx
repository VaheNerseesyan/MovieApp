import { useEffect, useState, memo } from "react";
import { MovieApi } from "../api/MovieApi";
import FilmCard from "../FilmCard/FilmCard";
import { Pagination, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";


function HomePage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(useParams().pageid || 1);
    const navigate = useNavigate();
    const { pageid } = useParams();
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


    return (
        <>
            <div>
                <h1>Movies</h1>
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
        </>
    )
}

export default memo(HomePage);