// {
//     type: ADD_MOVIES
// }
// {
//     type: DELETE_MOVIES
// }

// action types variables
export const ADD_MOVIES = 'ADD_MOVIES';

// action creators
export function addMovies(movies){
    return {
        type: ADD_MOVIES,
        movies
    }
}