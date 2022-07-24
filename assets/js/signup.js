import Data from './allInfo.js';
const patterns = {
  username: /^[a-z\d\-\_]{6,}$/i,
  password: /^[\w@\-_?.]{6,}$/,
  email: /^([a-z\d\.\-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};
const inputs = document.querySelectorAll('.form-control');
const form = document.querySelector('.signup-form');
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

const addUser = async (user)=>{
  await fetch('http://localhost:3000//users',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });

}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const user = {};
  let status = true;
  inputs.forEach(input=>{
    const nameAttr = input.getAttribute('name');
    // if the fields are empty
    if(input.value == ''){
      displayError(input, 'please fill all parameters');
      status = false;
    }
    if(patterns[nameAttr]){
      // check if they match the regex
      if(!patterns[nameAttr].test(input.value)){
        displayError(input, `Make sure your ${nameAttr} is more than or equal to 6 characters and in a valid format`);
        status = false
      };
    }
    // check if the user exists already
    if(nameAttr=='username'||nameAttr=='email'){
      allUsers.forEach(user=>{
        if(user[nameAttr] == input.value){
          displayError(input, `user with this ${nameAttr} already exist`);
          status = false;
        }
      })
    }
    if(!status){ 
      return;
    }
    user[nameAttr] = input.value;
  });
  if(Object.keys(user).length == inputs.length){
    console.log('correct');
    addUser(user);
    window.location.replace('../../index.html');
  }
})



