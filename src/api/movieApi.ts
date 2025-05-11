
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,   
        
    },
    total_results: 0,
};

const moviesApi = (page: number) => fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`, options)
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

export { getFilm, moviesApi, getFilmByTitle, getPopularMovies, getMovieVideos, getMovieBackdrops, getMovieActors };

