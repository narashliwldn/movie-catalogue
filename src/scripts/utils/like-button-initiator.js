import FavoriteMovieIDB from '../data/favoritemovie-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonIniator = {
  async init({likeButtonContainer, movie}){
    this._likeButtonContainer = likeButtonContainer;
    this._movie = movie;

    await this._renderButton();
  },

  async _renderButton(){
    const {id} = this._movie;

    if (await this._isMovieExisted(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isMovieExisted(id){
    const movie = await FavoriteMovieIDB.getMovie(id);
    return !!movie;
  },

  _renderLike(){
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIDB.putMovie(this._movie);
      this._renderButton();
    });
  },

  _renderLiked(){
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIDB.deleteMovie(this._movie.id);
      this._renderButton();
    });
  },
};

export default LikeButtonIniator;
