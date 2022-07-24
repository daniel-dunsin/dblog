import Data from './allInfo.js';
// get the id of the user
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.container-lg');
window.addEventListener('DOMContentLoaded', async ()=>{
    const allUsers = await Data.getAllUsers();
    // find the curr user, his id and username will be needed
    const currUser = allUsers.find(user=>user.id == id);
    container.innerHTML =  `
    <nav class="mt-2">
    <a href="./blogs.html?id=${id}"><img src="../img/logo.png" alt="" class="logo-img"></a>
    </nav>
    <h2 class="mt-4 fw-bold text-second">Add Post</h2>
    <!-- form -->
    <form class="post-form mt-5">
        <p class="create-blog-error fw-bold text-danger d-none">Please fill in all parameters</p>
        <input type="text" placeholder="Title" class="form-control my-2 py-2" name="title">
        <textarea placeholder="Content ..." class="form-control my-2" name="body"></textarea>
        <button type="submit" class="btn btn-lg bg-second text-white px-4 mt-3">Submit</button>
    </form>
    `
    const inputs = document.querySelectorAll('.form-control');
    const form = document.querySelector('.post-form');
    const errorEl = document.querySelector('.create-blog-error');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const newPost = {UserId:currUser.id, author:currUser.username};
        inputs.forEach(input=>{
            const nameAttr = input.getAttribute('name');
            if(!input.value){
                errorEl.classList.remove('d-none');
                // hide the error after 1.5seconds
                setTimeout(()=> errorEl.classList.add('d-none'), 1500);
                return;
            }
            // pass in all the values to newPost
            newPost[nameAttr] = input.value;
        });
        if(Object.keys(newPost).length > 2){
            fetch('http://localhost:3000/blogs',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {'Content-Type': 'application/json'},
        });
        }
        window.location.replace('./blogs.html?id='+id);
    })
})