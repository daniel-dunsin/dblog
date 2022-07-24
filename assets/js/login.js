import Data from './allInfo.js';
const patterns = {
  username: /^[a-z\d\-\_]{6,}$/i,
  password: /^[\w@\-_?.]{6,}$/,
  email: /^([a-z\d\.\-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};
const inputs = document.querySelectorAll('.form-control');
const form = document.querySelector('.login-form');
const allUsers = await Data.getAllUsers();
const displayError = (e, message)=>{
  const errorEl = e.nextElementSibling;
  if(errorEl){
    errorEl.classList.add('show-error')
    errorEl.textContent = message;
    setTimeout(()=>{
      errorEl.classList.remove('show-error');
    }, 2000);
  }
}
const displayMainError = ()=>{
  const errorEl = document.getElementById('main-error-el');
        errorEl.classList.remove('d-none');
        setTimeout(()=>errorEl.classList.add('d-none'), 1500);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let savedUser={};
    let currUser = {};
    inputs.forEach(input=>{
        const nameAttr = input.getAttribute('name');
        if(!input.value){
            displayError(input, 'please fill all parameters');
            return;
        }else{
            currUser[nameAttr] = input.value;
        }
        
    });
    // get the user from all users
    savedUser = allUsers.find(user=> (user.username == currUser['username/email']) || (user.email == currUser['username/email']));
    // if the user exists, check for the password
    if(savedUser){
      if(savedUser && savedUser.password == currUser.password){
        // if password is correct, redirect to home page
        window.location.replace(`./assets/pages/blogs.html?id=${savedUser.id}`);
      }else if(!savedUser.password || (savedUser.password != currUser.password)){
        displayMainError();
      }
    }else{
      displayMainError();
    }
    

})




