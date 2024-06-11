const greeting = document.querySelector('.greeting');
const greeting2 = document.querySelectorAll('.greeting2');

window.onload = () => {
    if(!sessionStorage.username){
        location.href = '/login';
    } else{
        greeting.innerHTML = `Hello ${sessionStorage.username}`;
        greeting2.forEach(element => {
            element.innerHTML = sessionStorage.username;
        });
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}