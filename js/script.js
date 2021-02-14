let userList = document.querySelector('.userlist');
let regBtn = document.querySelector('.reg-button');
let authBtn = document.querySelector('.auth-button');
let headerSpan = document.querySelector('.header span');



let users = [];

init();
regBtn.addEventListener('click', function (e) {
    let newUser = {};
    let userNameToArray = [];
    let userFullName = '';
    do{
        userFullName = getStringFromUser('Введите имя и фамилию');
        userNameToArray = userFullName.split(' ');
    }while (userNameToArray.length !== 2)
    newUser.name = userNameToArray[0];
    newUser.secondname = userNameToArray[1];
    let nickName = getStringFromUser('Введите никнейм');
    newUser.nickname = nickName;
    let pass = getStringFromUser('Введите пароль(буквы и цифры)');
    newUser.password = pass;
    newUser.timestring = getTimeString();
    users.unshift(newUser);
    setToStorage();
    render();
});
authBtn.addEventListener('click', function (e) {
    let userLogin = getStringFromUser('Введите логин');
    let userPassword = getStringFromUser('Введите пароль');
    let user = users.find(item => item.nickname === userLogin);
    if(user && user.password === userPassword){
        console.log(headerSpan);
        headerSpan.textContent = user.name;
    }
});
function init() {
    getFromStorage();
    render();
}
function render() {
    userList.innerHTML = '';
    users.forEach(function (item) {
        let div = document.createElement('div');
        div.classList.add('user-item');
        div.innerHTML = `Имя: ${item.name}, фамилия: ${item.secondname}, зарегистрирован ${item.timestring}` +
            `<button>Удалить</button>`;
        userList.append(div);
        let delBtn = div.querySelector('button');
        delBtn.addEventListener('click', function (e) {
            del(item);
        });
    });
}
function del(element) {
    //удаляем элемент по индексу
    if(element){
        users.splice(users.indexOf(element), 1);
        this.setToStorage();        //пишем в storage
        this.render();              //рендерим
    }
}

function getTimeString(){
    let year = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    let date = new Date();
    return `${date.getDate()} ${year[date.getMonth()]} ${date.getFullYear()}г, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}


function getFromStorage() {
    if (localStorage.users){
        users = JSON.parse(localStorage.users);
    }
};
/**
 * Функция записи в localStorage
 */
function setToStorage() {
    localStorage.users = JSON.stringify(users);
}
function getStringFromUser(message, defaultValue) {
    let userString = '';
    let defaultValueTemp = defaultValue ? String(defaultValue) : '';
    do{
        userString = prompt(message, defaultValueTemp).trim();
    } while (isNumber(userString) || (userString.length === 0));
    return userString;
}
function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}