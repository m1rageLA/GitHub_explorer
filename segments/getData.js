/*const url = 'https://api.github.com/search/repositories?q=';
const owner = 'ToDo';
async function getTitle(url) {
  try { 
    const response = await fetch(url + owner + '/');
    const data = await response.json()
    console.log(data.items);  
  } catch (err) {
    console.error('Ошибка при запросе:', err);
  }
}


getTitle(url);

/*
важно понимать Promise. Promise - это объект,
представляющий результат асинхронной операции
*/

//Асинхронные функции всегда возвращают Promise.

/*
await используется внутри асинхронной функции и останавливает
выполнение функции до тех пор, пока не завершится операция,
после которой оно продолжит выполнение 
*/

//fetch для получения данных