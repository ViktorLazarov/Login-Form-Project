//form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    } 
}

// form validation 

const username = document.querySelector('.username') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if (username == null) { // login page is open, since there's no username input field on the page
    submitBtn.addEventListener('click', () => {
        fetch('login-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data,false);
        })
    })
}else { // register page is open, since there is a username input field on the page
    submitBtn.addEventListener('click', () => {
        fetch('register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data,true);
        })
    })
}

const validateData = (data,isRegister) => {
    if(!isRegister){
        if(!data.username){
            alertBox(data);
        } else{
            sessionStorage.username = data.username;
            sessionStorage.email = data.email;
            location.href = '/';
        }
    } else{
        if(!data.username){
            alertBox(data);
        } else{
            sessionStorage.username = data.username;
            sessionStorage.email = data.email;
            alertBox('Successfuly Registered!');

            setTimeout(()=> {
                location.href = '/login';
            }, 2500);
        }
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');

    alertMsg.innerHTML = data;

    alertContainer.style.top = '5%';

    setTimeout(() => {
        alertContainer.style.top = null;
    }, 3000);
}