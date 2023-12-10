const textField = document.getElementById('textField');
const sendButton = document.getElementById('sendButton');
const listOfElements = document.getElementById('listOfElements');
const loading = document.getElementById('loading');
const idOfPage = document.getElementById('indexOfPage');

let currentPage = 1; // начальная страница
let perPage = 5;

const url = 'https://api.github.com/search/repositories?q=';

function createListElement(data) {
  for (const i in data.items) {
    console.log(data.items[i].name);
    const liElement = document.createElement('li');
    const nameOfRep = document.createElement('h3');
    const author = document.createElement('p');
    const image = document.createElement('img');


    author.textContent = data.items[i].owner.login;
    nameOfRep.textContent = data.items[i].name;
    image.src = data.items[i].owner.avatar_url;
    
    liElement.classList.add('liElementofList');
    nameOfRep.classList.add('nameOfRep');
    author.classList.add('authorName');
    image.classList.add('authorsImg');

    liElement.appendChild(image);
    liElement.appendChild(nameOfRep);
    liElement.appendChild(author);
    listOfElements.appendChild(liElement);
  }
}

sendButton.addEventListener('click', () => {
  if (listOfElements.innerHTML != '') {
    listOfElements.innerHTML = ''
    getData(url, textField.value, currentPage)
  }
  else {
    getData(url, textField.value, currentPage)
  }
});

async function getData(url, repos, page) {
  try {
    loading.style.display = `block`;
    loading.style.animation = `rotateAnimation 1s infinite`;
    const response = await fetch(`${url}${repos}/&page=${page}&per_page=${perPage}`);
    console.log(response);
    const data = await response.json();
    setTimeout(() => {
      createListElement(data);
      loading.style.animation = `rotateAnimation 0s infinite`;
      loading.style.display = `none`;
    }, 0);
    console.log(data.items);
  } catch (err) {
    console.error(err);
  }
}
