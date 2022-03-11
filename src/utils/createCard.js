import createCardImg from './createCardImg';
import addLike from './addLike';

const createCard = async (item, i) => {
  /// create card
  const card = document.createElement('div');
  card.id = item.id;
  card.classList = 'card m-4';
  /// create comments
  const commentsLink = document.createElement('a');
  if (item.url.includes('pokemon')) {
    commentsLink.classList = 'btn btn-primary my-1';
    commentsLink.innerHTML = 'Comments';
  }

  // create card img
  const cardImg = document.createElement('img');
  cardImg.classList = 'card-img-top';

  createCardImg(item, cardImg, commentsLink, i);

  /// create card text
  const cardText = document.createElement('div');
  cardText.classList = 'card-body text-center';
  /// create card title
  const cardTitle = document.createElement('h5');
  const header = document.createElement('div');
  header.classList = ' card-title row ';
  cardTitle.innerHTML = `${item.name.toUpperCase()}`;
  cardTitle.classList = 'col-12';

  /// create like Button
  const likeButtonContainer = document.createElement('div');
  likeButtonContainer.classList = 'd-flex align-items-center';
  const likeButton = document.createElement('div');
  likeButton.classList.add('heart');
  likeButton.classList.add('ms-auto');
  const likesNum = document.createElement('p');
  if (localStorage.getItem('likes')) {
    const likes = JSON.parse(localStorage.getItem('likes'));
    if (likes.filter((like) => like === item.id).length === 1) {
      likeButton.classList.toggle('is-active');
    }
  }
  likeButton.onclick = (e) => {
    e.preventDefault();
    addLike(item, likesNum, likeButton);
  };

  /// create likes Count
  const likesCount = document.createElement('div');
  likesNum.classList = 'likes-count pt-4 mt-2';
  likesNum.innerHTML = `${item.likes} likes`;
  /// append children
  likesCount.appendChild(likesNum);
  likeButtonContainer.appendChild(likesCount);
  likeButtonContainer.appendChild(likeButton);

  header.appendChild(cardTitle);
  header.appendChild(likeButtonContainer);

  cardText.appendChild(header);

  cardText.appendChild(commentsLink);
  card.appendChild(cardImg);
  card.appendChild(cardText);
  card.style = 'width: 18rem;';

  return card;
};
export default (createCard);
