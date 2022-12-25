import React from 'react';
import { data } from '../data';
import Navbar from './Navbar'; 
import MovieCard from './MovieCard';

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
    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });

    console.log('STATE',this.props.store.getState());
  }
  
  render() {
    const movies = this.props.store.getState();
    console.log('RENDER');
    return (
      <div className='App'>
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className='tab'>Movies</div>
            <div className='tab'>Favourites</div>
          </div>

          <div className='list'>
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={'movies-$index'} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
