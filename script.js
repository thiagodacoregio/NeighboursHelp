const form = document.getElementById('helpForm');
const postsDiv = document.getElementById('posts');

let posts = JSON.parse(localStorage.getItem('neighboursHelpPosts')) || [];

function renderPosts() {
  postsDiv.innerHTML = '';
  posts.forEach((post, idx) => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <strong>${post.type === 'request' ? '🆘 Request' : '🤝 Offer'}</strong> by ${post.name}<br>
      ${post.description}<br>
      <em>Contact: ${post.contact}</em><br>
      <button onclick="fulfillPost(${idx})">Mark as Fulfilled</button>
    `;
    postsDiv.appendChild(postEl);
  });
}

window.fulfillPost = function(idx) {
  posts.splice(idx, 1);
  localStorage.setItem('neighboursHelpPosts', JSON.stringify(posts));
  renderPosts();
};

form.onsubmit = function(e) {
  e.preventDefault();
  const post = {
    name: form.name.value,
    type: form.type.value,
    description: form.description.value,
    contact: form.contact.value
  };
  posts.push(post);
  localStorage.setItem('neighboursHelpPosts', JSON.stringify(posts));
  renderPosts();
  form.reset();
};

renderPosts();