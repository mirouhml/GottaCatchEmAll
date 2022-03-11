import app from '../modules/App';

const likesURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app.id}/likes`;
const showToast = () => {
  const toast = document.getElementById('snackbar');
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
};

const addLike = async (item, likesNum, likeButton) => {
  let likes = [];
  if (!localStorage.getItem('likes')) {
    localStorage.setItem('likes', JSON.stringify(likes));
  } else {
    likes = JSON.parse(localStorage.getItem('likes'));
  }
  if (likes.filter((like) => like === item.id).length === 0) {
    likeButton.classList.toggle('is-active');
    likes.push(item.id);
    localStorage.setItem('likes', JSON.stringify(likes));
    await fetch(likesURL, {
      method: 'POST',
      body: JSON.stringify({ item_id: `${item.id}` }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      item.likes += 1;
      likesNum.innerHTML = `${item.likes} likes`;
    });
  } else {
    showToast();
  }
};

export default addLike;
