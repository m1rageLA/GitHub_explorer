const textField = document.getElementById('textField');
const listOfElements = document.getElementById('listOfElements');
const loading = document.getElementById('loading');
const idOfPage = document.getElementById('indexOfPage');
const frozenNavContainer = document.querySelector('.navContainer');

const currentPage = 1;
const perPage = 500;
let language = "all";

const url = 'https://api.github.com/search/repositories?q=';

function createListElement(data) {
  
  function createList(i){
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
    console.log(`----------------${language}---------------------`);
  }

  for (const i in data.items) {
    if (data.items[i].language === language) {
      createList(i)
    }
    else if (language === "all") {
      console.log("----------------DEFAULT---------------------");
      createList(i);
    }
  }
}

async function getData(url, repos, page) {
  try {
    console.log(language);
    loading.style.display = `block`;
    loading.style.animation = `rotateAnimation 1s infinite`;
    const response = await fetch(`${url}${repos}/&page=${page}&per_page=${perPage}&language=${language}`);
    console.log(response);
    const data = await response.json();
    setTimeout(() => {
      createListElement(data);
      loading.style.animation = `rotateAnimation 0s infinite`;//none?
      loading.style.display = `none`;
    }, 0);

    console.log(data.items);
  } catch (err) {
    console.error(err);
  }
}

//--------------dropdownButton-----------------
const setupDropdown = () => {
  let isOpen = false;
  let originalHeight;
  const languages = [
    "all", "JavaScript", "Python", "Java", "C#", "C++", "TypeScript", "Ruby", "Swift", "PHP", "Go",
    "Kotlin", "R", "Objective-C", "Shell", "MATLAB", "Rust", "Dart", "Scala", "Lua", "Perl",
  ]
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownBlock = document.getElementById('insideDropDwn');
  let nameOfLanguage = document.createElement('p');
  for (const i of languages) {
    const a = document.createElement('a');
    dropdownBlock.appendChild(a);
    a.textContent = i;
    a.addEventListener('click', () => {
      language = i;
      dropdownButton.nameOfLanguage = '';
      nameOfLanguage.style.position = 'absolute';
      nameOfLanguage.textContent = language;
      dropdownButton.appendChild(nameOfLanguage);
    });
  }
  const dropdownButtonFunct = () => {
    const currentHeight = dropdownButton.offsetHeight;

    if (isOpen) {
      originalHeight = currentHeight;
      dropdownBlock.style.display = 'none';
    } else {
      dropdownBlock.style.display = 'block';
    }

    isOpen = !isOpen;
  };

  dropdownButton.addEventListener('click', dropdownButtonFunct);
};

setupDropdown();


document.getElementById('sendButton').addEventListener('click', () => {
  if (listOfElements.innerHTML != '') {
    listOfElements.innerHTML = '';
    getData(url, textField.value, currentPage);    
  }
  else {
    getData(url, textField.value, currentPage)
  }
});