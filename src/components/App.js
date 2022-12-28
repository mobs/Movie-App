import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { data as moviesList } from '../data';
import { StoreContext } from '../index';

// converting this functional comp to class comp as we now want to take data from a DB and we need componentDidMount()
class App extends React.Component {
  componentDidMount() {
    // const {store} = this.props;
    // store.subscribe(() => {
    //   console.log('UPDATED');
    //   this.forceUpdate(); // should be avoided(here for simplicty only)
    // });
    // //make api call
    // //dispatch action
    // /*
    // store.dispatch({
    //   type: 'ADD_MOVIES',
    //   movies: data
    // });
    // */
    // store.dispatch(addMovies(data));

    // console.log('STATE',this.props.store.getState());

    this.props.store.subscribe(() => this.forceUpdate());
    this.props.store.dispatch(addMovies(moviesList));
  }

  isMovieInFavourites = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }

    return false;
  };

  changeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    // initially we were getting an array and mappin over it but now we get an object so we should use object destructuring
    // const movies = this.props.store.getState();
    const { movies, search } = this.props.store.getState(); // will return { movies: {}, search: []}
    console.log('movies', movies);
    const { list, showFavourites = [], favourites = [] } = movies;
    console.log('RENDER',this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieInFavourites(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

export default AppWrapper;
