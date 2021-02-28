import httpService from './httpService';

const apiEndpoint = '/movies'

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}


export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  // function either create movie, or update, if movie.id exists then update
  // but inside the body contains also the ._id, rest doesnt want to. => clone movie object
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movieUrl(movie._id),body);
  }

  return httpService.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId)); 
}