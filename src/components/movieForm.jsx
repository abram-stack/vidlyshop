import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, getMovies, saveMovie} from '../services/movieService';
import {  getGenres } from '../services/genreService';


class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  // when we set new movie, we'll use Joi schema to help validate
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
  }

  async populateGenres() {
    const {data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if( ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();  
    await this.populateMovie();
    // we collect info of the movieId in url params, 
    // if we click button new, the match.id props will set to new like we set in Link, 
    // then return, because we dont want to populate into the form
    
    // get one single movie, in params. check it if exists,
    // else history.replace, so if user hit back button,not going to infinite loop
    // theres movie exists, we updating the state,

    // we call function map to view model, which return an model of object
    // we want to display, structure bit diffrent, not like in Db ie
    
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }
  
  doSubmit = async() => {
    await saveMovie(this.state.data);
    // redirect the user to /movies
    this.props.history.push('/movies');
  }

  render() { 
    return (  
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;







// const MovieForm = ({ match, history }) => {
//   return (  
//     <div>
//       <h1>Movie Form {match.params.id}</h1>
//       <button className='btn btn-primary' onClick={() => history.push('/movies')}>SAVE</button>
//     </div>
    
//   );
// }
 
