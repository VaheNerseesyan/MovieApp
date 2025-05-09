const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDk1MjcyMTQwYzc0MDY2OGM4YzE2YWEwZDY4MTdlMSIsIm5iZiI6MTc0NjM3Njk5NC4zOTIsInN1YiI6IjY4MTc5OTIyMTRjODY0YWQwNzU3NmVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVzWxyuKpyExx4UjCo59sGNog83ilN4vzht0rFL4BcY'
    },
    total_results: 0,
};

const MovieApi = (page: number) => fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`, options)
    .then(res => res.json())
    .then(res => res.results)
    .catch(err => console.error(err));

const GET_FILM_URL = 'https://api.themoviedb.org/3/movie/';

const getFilm = async (id: string) => {
    const url = `${GET_FILM_URL}${id}`;
    return fetch(url, options)
        .then(res => res.json())
};

const GET_FILM_BY_TITLE_URL = 'https://api.themoviedb.org/3/search/movie?query=';

const getFilmByTitle = async (title: string, page: number) => {
    const url = `${GET_FILM_BY_TITLE_URL}${title}&page=${page}`;
    return fetch(url, options)
        .then(res => res.json())
        .then(res => [res.results, res.total_results])
};



const getPopularMovies = async () => {
    return fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', options)
        .then(res => res.json())
        .then(res => res.results)
        .catch(err => console.error(err));
}

const getMovieVideos = async (id: string) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?`, options)
        .then(res => res.json())
        .then(res => res.results)
        .catch(err => console.error(err));
}

const getMovieBackdrops = async (id: string) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
        .then(res => res.json())
        .then(res => res.backdrops)
        .catch(err => console.error(err));
}

const getMovieActors = async (id: string) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
        .then(res => res.json())
        .then(res => res.cast)
        .catch(err => console.error(err));
};

export { getFilm, MovieApi, getFilmByTitle, getPopularMovies, getMovieVideos, getMovieBackdrops, getMovieActors };

