import { useEffect, useState } from "react";
import MovieApi from "../api/MovieApi";
import FilmCard from "../FilmCard/FilmCard";

function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        MovieApi.then(res => setMovies(res));
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <div>
                {movies?.length > 0 && movies.map((movie: any) => (
                    <FilmCard
                        key={movie.id}
                        title={movie.name}
                        poster_path={movie.poster_path}
                        overview={movie.overview}
                        vote_average={movie.vote_average}
                        release_date={movie.release_date}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage;