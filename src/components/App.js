import React from 'react';
import { data } from '../data';
import Navbar from './Navbar'; 
import MovieCard from './MovieCard';
import { addMovies } from '../actions';

// converting this functional comp to class comp as we now want to take data from a DB and we need componentDidMount()

class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate(); // should be avoided(here for simplicty only)
    });
    //make api call
    //dispatch action
    /*
    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });
    */
    store.dispatch(addMovies(data));

    console.log('STATE',this.props.store.getState());
  }
  
  isMovieFavourite = (movie) => {
    const {favourites} = this.props.store.getState();

    const index = favourites.indexOf(movie);
    if(index !== -1){
      //found the movie
      return true;
    }
    return false;
  }
  render() {
    // initially we were getting an array and mappin over it but now we get an object so we should use object destructuring
    // const movies = this.props.store.getState();

    const {list} = this.props.store.getState();
    console.log('RENDER',this.props.store.getState());
    return (
      <div className='App'>
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className='tab'>Movies</div>
            <div className='tab'>Favourites</div>
          </div>

          <div className='list'>
            {list.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                // key={'movies-$index'} 
                dispatch={this.props.store.dispatch} 
                isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
