import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { paginate } from '../utils/paginate';
import { toast } from 'react-toastify';
import Pagination from './common/pagination'
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import { getMovies, deleteMovie  } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
   }

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];
    const { data: movies} = await getMovies();
    this.setState({ movies  , genres});
  }

  

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};

    movies[index].liked = !movies[index].liked;
    this.setState( {movies});
    // console.log('like clicked',movie)
    
  }
  
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter( m => m._id !== movie._id);
    this.setState({ movies });
    // deleteMovie(movie._id);

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has been deleted');
      else if (ex.response && ex.response.status === 401)
        toast.error('Unauthorized');
      this.setState({ movies: originalMovies });
    }
    
    
  } 

  handlePageChange = (page) => {
    this.setState({ currentPage: page})
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn});
  }

// control component, cannot be null or undefined
  handleGenreSelect = (genre) => {
    this.setState({
      // search box is controlled component
      selectedGenre: genre, searchQuery: '', currentPage: 1
    });
  }
  // (e.currentTarget as component)
  handleSearch = (query) => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1})
  }


  getPagedData = () => {
    const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn, searchQuery } = this.state
    
    // if selectedGenre and its id is truthy(means there is something)then filter the array allMovies, pick if the selectedGenreid = to map through
    
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies}
  }

  render() {
    console.log('movie page rendered')
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state
    const { length: count } = this.state.movies;
    const { user } = this.props;

    if (count === 0)
      return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData();
    

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
          { user && <Link
            to='/movies/new'
            className='btn btn-primary'
            style={{marginBottom: 20}}
          >
            New Movie
          </Link>}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
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