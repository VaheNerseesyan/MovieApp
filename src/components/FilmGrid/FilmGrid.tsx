import { useParams } from "react-router-dom";
import { getFilm } from "../api/MovieApi";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "antd";

function FilmGrid() {
    const { id } = useParams();
    const [film, setFilm] = useState<any>(null);
    useEffect(() => {
        if (id) {
            getFilm(id).then(res => {
                setFilm(res)
            })
        }
    }, [id]);
    console.log(film);
    return (
        <div key={id}>
            <Card style={{border: '1px solid white'}}>
                <h1>FilmGrid</h1>   
                <img src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`} alt={film?.title} />
                <h2>{film?.title}</h2>
                <p>{film?.overview}</p>
                <p>Vote average: {film?.vote_average} / 10</p>
                <p>Release date: {film?.release_date}</p>
                <Button>Add to favorites</Button>
            </Card>
        </div>
    )
}

export default FilmGrid;