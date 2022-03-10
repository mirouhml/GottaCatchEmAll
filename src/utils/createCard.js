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
  cardImg.classList = 'card-img-top p-4';

  createCardImg(item, cardImg, commentsLink, i);

  /// create card text
  const cardText = document.createElement('div');
  cardText.classList = 'card-body text-center';
  /// create card title
  const cardTitle = document.createElement('h5');
  const header = document.createElement('div');
  header.classList = ' card-title row ';
  cardTitle.innerHTML = `${item.name.toUpperCase()}`;
  cardTitle.classList = 'col-10';

  /// create like Button
  const likeButton = document.createElement('a');
  likeButton.innerHTML = "<i class='far fa-heart'></i>";
  likeButton.classList = 'col-2 text-dark';
  const likesNum = document.createElement('p');
  likeButton.onclick = (e) => {
    e.preventDefault();
    addLike(item, likesNum);
  };
  /// create likes Count
  const likesCount = document.createElement('div');
  likesNum.classList = 'likes-count';
  likesCount.classList = ' my-1';
  likesNum.innerHTML = `${item.likes} likes`;
  /// append children
  likesCount.appendChild(likesNum);
  header.appendChild(cardTitle);
  header.appendChild(likeButton);

  cardText.appendChild(header);
  cardText.appendChild(likesCount);

  cardText.appendChild(commentsLink);
  card.appendChild(cardImg);
  card.appendChild(cardText);
  card.style = 'width: 18rem;';
  
  return card;
};
export default (createCard);
