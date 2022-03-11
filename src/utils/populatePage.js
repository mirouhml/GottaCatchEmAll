import createCard from './createCard';
import Item from '../modules/Item';
import itemsCounter from './itemsCounter';
import app from '../modules/App';
import Paginator from '../modules/Paginator';

const populatePage = async (requestURL) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  container.classList.add('no-display');
  container.classList.remove('d-flex');
  const pages = document.getElementById('paginator');
  pages.classList.add('no-display');
  pages.classList.remove('d-flex');
  pages.innerHTML = '';
  const pagesContainer = document.getElementById('cards-container');
  const image = document.createElement('img');
  image.src = './assets/loading.gif';
  image.alt = 'Loading image';
  image.id = 'loading';
  document.documentElement.style.overflow = 'hidden';
  pagesContainer.appendChild(image);
  const likesURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app.id}/likes`;
  let likesArr;
  let itemsCount;
  const promise = new Promise((resolve) => {
    fetch(likesURL)
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      }
    });
  })
  promise.then((json) => {
    likesArr = json;
    console.log('here')
    const cards = [];
    const promise2 = new Promise((resolve) => {
      fetch(requestURL)
      .then((response) => response.json())
      .then((json) => {
        itemsCount = json.results.length;
        itemsCounter(itemsCount, requestURL);
        json.results.forEach((entity, i) => {
          const item = new Item(entity.name, entity.url, `${entity.name + i}`, 0);
          const itemsLikes = likesArr.filter(
            (el) => el.item_id === `${entity.name + i}`,
          );
          if (itemsLikes.length > 0) {
            item.likes = itemsLikes[0].likes;
          }
          createCard(item, i).then((json) => cards.push(json));
        });
        resolve('Ok');
      });
    });
    promise2.then(() => {
      const paginator = new Paginator(cards, 20, 1, pages, container, 5);
      const ok = paginator.init();
      setTimeout(() => {
        container.classList.remove('no-display');
        container.classList.add('d-flex');
        pagesContainer.removeChild(image);
        document.documentElement.style.overflow = '';
        if (ok) {
          pages.classList.remove('no-display');
          pages.classList.add('d-flex');
        } else {
          pages.classList.add('no-display');
          pages.classList.remove('d-flex');
        }
      }, 3000);
    });
  });
}

export default populatePage;
