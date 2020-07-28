const url = `http://www.recipepuppy.com/api`;
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');

async function fetchRec(query) {
  const res = await fetch(`${proxy}${url}?q=${query}`);

  const data = await res.json();

  return data;
}

function handleError(err) {
  console.log('oh no');
  console.log(err);
}
async function handleSubmit(e) {
  e.preventDefault();
  const searchkey = e.target.query.value;
  e.target.submit.disabled = true;
  await search(searchkey);
  e.target.submit.disabled = false;
  console.log(searchkey);
}
async function search(keyword) {
  const returnedData = await fetchRec(keyword).catch(handleError);
  console.log(returnedData);
  displayRec(returnedData);
}

search(form.query.value);

form.addEventListener('submit', handleSubmit);

//populate html with fetched data
function displayRec({ results }) {
  const html = results
    .map(item => {
      return `<div class = 'recipe'>
  <h1>${item.title}</h1>
  <p>${item.ingredients}</p>
  ${item.thumbnail && `<img src="${item.thumbnail}" alt="${item.title}"/>`}
  <button><a href="${item.href}">See Details</a></button>


  </div>`;
    })
    .join('');
  const div = document.querySelector('.recipes');
  div.innerHTML = html;
}
