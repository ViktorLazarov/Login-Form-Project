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

// animation stop
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.stop-animation');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            items.forEach(i => i.classList.add('paused'));
        });
        
        item.addEventListener('mouseleave', () => {
            items.forEach(i => i.classList.remove('paused'));
        });
    });
});
