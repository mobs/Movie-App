// {
//     type: ADD_MOVIES
// }
// {
//     type: DELETE_MOVIES
// }

// action types variables
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

// action creators
export function addMovies(movies){
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addFavorite(movie){
    return {
        type: ADD_FAVOURITE,
        movie
    }
}