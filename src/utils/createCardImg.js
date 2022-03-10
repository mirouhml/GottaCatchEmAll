import comments from './populatePopup';

const createCardImg = async (item, cardImg, commentsLink, i) => {
  if (item.url.includes('type') || item.url.includes('ability')) {
    cardImg.src = 'https://i.ibb.co/VV17hyx/download.png';
    cardImg.alt = `${item.name}`;
  } else {
    await fetch(`${item.url}`)
      .then((response) => response.json())
      .then((json) => {
        const image = json.sprites.other['official-artwork'].front_default;
        comments(json, commentsLink, i);
        if (image)
          cardImg.src = image;
        else
          cardImg.src = `${json.sprites.front_default}`;
        cardImg.alt = `${item.name}`;
      });
  }
};
export default (createCardImg);