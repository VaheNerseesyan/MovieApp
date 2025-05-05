const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDk1MjcyMTQwYzc0MDY2OGM4YzE2YWEwZDY4MTdlMSIsIm5iZiI6MTc0NjM3Njk5NC4zOTIsInN1YiI6IjY4MTc5OTIyMTRjODY0YWQwNzU3NmVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVzWxyuKpyExx4UjCo59sGNog83ilN4vzht0rFL4BcY'
    }
};

const MovieApi = fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(res => res.json())
    .then(res => res.results)
    .catch(err => console.error(err));

export default MovieApi;
