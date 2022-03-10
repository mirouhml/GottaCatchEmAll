import createCard from './createCard';
import Item from '../modules/Item';
import itemsCounter from './itemsCounter';
import app from '../modules/App';
import Paginator from '../modules/Paginator'

const populatePage = async (requestURL) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  const pages = document.getElementById('paginator');
  pages.innerHTML = '';
  const likesURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app.id}/likes`;
  let likesArr;
  let itemsCount;

  await fetch(likesURL)
    .then((response) => response.json())
    .then((json) => {
      likesArr = json;
  });
  const cards = [];
  await fetch(requestURL)
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
        createCard(item, i).then((json) => cards.push(json))
      });
    }).then(() => {
      new Paginator(cards,20,1,pages,container,5)
    });
};
export default populatePage;
