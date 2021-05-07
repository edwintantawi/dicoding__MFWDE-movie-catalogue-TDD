import { itActsAsFavoriteMovieModel } from './contract/favoriteMovieContract';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Favorite Movie Idb Contract test implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
      await FavoriteMovieIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
});
