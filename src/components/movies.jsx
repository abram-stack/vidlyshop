import React, { Component } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination'
import Like from './common/like';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = { 
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
   }

  handlePageChange = (page) => {
    this.setState({ currentPage: page})
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};

    movies[index].liked = !movies[index].liked;
    this.setState( {movies});
    // console.log('like clicked',movie)
    
  }
  
  handleDelete = (movie) => {
    const movies = this.state.movies.filter( m => m._id !== movie._id);
    this.setState({movies});
  } 


  render() { 
    const { currentPage, pageSize, movies: allMovies } = this.state
    const { length: count } = this.state.movies;

    if(count === 0)
      return <p>There are no movies in the database.</p>
    
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        <tbody>
            { movies.map(movie => ( 
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td><Like liked={movie.liked} onClick={ () => this.handleLike(movie)}/></td>
              <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr> 
            ))}
          
        </tbody>
        </table>

        <Pagination itemsCount={count} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage}/>
      </React.Fragment>
    )
  }
}
 
export default Movies;