import React, { Component } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination'
import ListGroup from './common/listGroup';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order:'asc'}
   }

  componentDidMount(){
    console.log('didMount');
    console.log('----------')
    const genres = [{_id:'', name: 'All Genres'}, ...getGenres()];
    this.setState({ movies: getMovies(), genres});
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page})
  }
  
  handleGenreSelect = (genre) => {
    this.setState( {selectedGenre: genre, currentPage: 1});
  }

  handleSort = (sortColumn) => {
    
    this.setState({ sortColumn});
  }

  getPagedData = () => {
    const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state
    // if selectedGenre and its id is truthy(means there is something)then filter the array allMovies, pick if the selectedGenreid = to map through
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter( m => m.genre._id === selectedGenre._id)
      : allMovies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies}
  }

  render() { 
    console.log('movie page rendered')
    const { currentPage, pageSize, sortColumn } = this.state
    const { length: count } = this.state.movies;

    if(count === 0)
      return <p>There are no movies in the database.</p>

    const {totalCount, data: movies} = this.getPagedData();

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup 
            items={this.state.genres} 
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          /> 
          <Pagination itemsCount={totalCount} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage}/>
          </div>
      </div >
    )
  }
}
 
export default Movies;