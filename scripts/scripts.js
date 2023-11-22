const textField = document.getElementById('textField');
const sendButton = document.getElementById('sendButton');
const listOfElements = document.getElementById('listOfElements');
const loading = document.getElementById('loading');

const url = 'https://api.github.com/search/repositories?q=';


function createListElement(data) {
  for (const i in data.items) {
    console.log(data.items[i].name);
    let liElement = document.createElement('li');
    let author = document.createElement('p');
    author.textContent = data.items[i].owner.login;
    liElement.textContent = data.items[i].name;
    liElement.appendChild(author);
    listOfElements.appendChild(liElement);
  }
}
sendButton.addEventListener('click', () => {
  getData(url, textField.value);
});
async function getData(url, repos) {
  try {
    const animation = () => {loading.style.height = '500px'}
    animation();
    const response = await fetch(url + repos + '/');
    const data = await response.json();
    createListElement(data)
    console.log(data.items);
    animation = false;
  }
  catch (err) {
    console.error(err);
  }
}
