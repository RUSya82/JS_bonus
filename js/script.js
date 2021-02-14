let userList = document.querySelector('.userlist');     //контейнер со списком юзеров
let regBtn = document.querySelector('.reg-button');     //кнопка регистрации
let authBtn = document.querySelector('.auth-button');   //кнопка авторизации
let headerSpan = document.querySelector('.header span');        //имя пользователя



let users = [];

init();
//событие по клику на кнопке "Регистрация"
regBtn.addEventListener('click', function (e) {
    let newUser = {};               //объект нового пользователя
    let userNameToArray = [];       //имя и фамилия в массиве
    let userFullName = '';          //имя и фамилия в строке
    do{
        userFullName = getStringFromUser('Введите имя и фамилию');
        userNameToArray = userFullName.split(' ');      //разбиваем на массив по пробелу
    }while (userNameToArray.length !== 2)       //пока не получим именно два элемента массива
    newUser.name = userNameToArray[0];          //записываем данные в новый объект
    newUser.secondname = userNameToArray[1];
    newUser.nickname = getStringFromUser('Введите никнейм');    //получаем ник и пароль
    newUser.password = getStringFromUser('Введите пароль(буквы и цифры)');
    newUser.timestring = getTimeString();       //получаем строку со временем регистрации
    users.unshift(newUser);                     //добавляем в массив юзеров
    setToStorage();                             //пишем и перерисовываем
    render();
});
//событие по клику на кнопке "Авторизация"
authBtn.addEventListener('click', function (e) {
    let userLogin = getStringFromUser('Введите логин');
    let userPassword = getStringFromUser('Введите пароль');
    let user = users.find(item => item.nickname === userLogin); //ищем, есть ли такой юзер
    if(user && user.password === userPassword){                 //проверяем пароль
        headerSpan.textContent = user.name;                     //если найден, то приветствуем по имени
    }else{
        alert('Пользователь не найден!');
    }
});

/**
 * Функция инициализации программы
 */
function init() {
    getFromStorage();
    render();
}

/**
 * Функция отрисовки юзеров
 */
function render() {
    userList.innerHTML = '';
    users.forEach(function (item) {
        let div = document.createElement('div');
        div.classList.add('user-item');
        div.innerHTML = `Имя: ${item.name}, фамилия: ${item.secondname}, зарегистрирован ${item.timestring}` +
            `<button>Удалить</button>`;
        userList.append(div);
        let delBtn = div.querySelector('button');
        delBtn.addEventListener('click', function (e) {     //навешиваем событие на кнопку "Удалить"
            del(item);
        });
    });
}

/**
 * Функция удаления юзера из БД
 * @param element
 */
function del(element) {
    //удаляем элемент по индексу
    if(element){
        users.splice(users.indexOf(element), 1);
        this.setToStorage();        //пишем в storage
        this.render();              //рендерим
    }
}

/**
 * Функция выдает строку со временем регистрации юзера
 * @returns {string}
 */
function getTimeString(){
    let year = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    let date = new Date();
    return `${addZero(date.getDate())} ${year[date.getMonth()]} ${date.getFullYear()}г, ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
}

/**
 * Получение данных из localStorage и запись их в объект
 */
function getFromStorage() {
    if (localStorage.users){
        users = JSON.parse(localStorage.users);
    }
}
/**
 * Функция записи в localStorage
 */
function setToStorage() {
    localStorage.users = JSON.stringify(users);
}
/**
 * Получает строку от пользователя, если пользователь ввёл не строку, то переспрашивает
 * @param message
 * @param defaultValue
 * @returns {string}
 */
function getStringFromUser(message, defaultValue) {
    let userString = '';
    let defaultValueTemp = defaultValue ? String(defaultValue) : '';
    do{
        userString = prompt(message, defaultValueTemp).trim();
    } while (isNumber(userString) || (userString.length === 0));
    return userString;
}
/**
 * Проверяет можно ли преобразовать переменную в число
 * ВНИМАИЕ!!! Не меняет само число, а возвращает только bool
 * @param number
 * @returns {boolean|boolean}
 */
function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}
function addZero(number) {
    return number > 9 ? number : '0' + number;
}