import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Liking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the movie has not been liked before',
    async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        movie: {
          id: 1,
        },
      });

      expect(document.querySelector('[aria-label="like this movie"]'))
        .toBeTruthy();
    });

  it('should not show the unlike button when the movie has not been liked before',
    async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        movie: {
          id: 1,
        },
      });

      expect(document.querySelector('[aria-label="unlike this movie"]'))
        .toBeFalsy();
    });

  it('should be able to like the movie', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const movie = await FavoriteMovieIdb.getMovie(1);
    expect(movie).toEqual({ id: 1 });

    await FavoriteMovieIdb.deleteMovie(1);
  });

  it('should not add a movie again when is already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1,
      },
    });

    await FavoriteMovieIdb.putMovie({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    FavoriteMovieIdb.deleteMovie(1);
  });
});
