import Data from './allInfo.js';
// get the userId and the blogId 
const blogId = new URLSearchParams(window.location.search).get('id');
const userId = new URLSearchParams(window.location.search).get('userId');
const container = document.querySelector('.container-lg');

window.addEventListener('DOMContentLoaded', async ()=>{
    const allBlogs = await Data.getAllBlogs();
    // find the blog with the particular id and fill in all the input boxes with its value;
    const currBlog = allBlogs.find(blog=>blog.id == blogId);
    container.innerHTML = `
    <nav class="mt-2">
    <a href="./blogs.html?id=${userId}"><img src="../img/logo.png" alt="" class="logo-img"></a>
    </nav>
    <h2 class="mt-4 fw-bold text-second">Edit Post</h2>
    <!-- form -->
    <form class="post-form mt-5">
        <input type="text" placeholder="Title" class="form-control my-2 py-2" name="title">
        <textarea placeholder="Content ..." class="form-control my-2" name="body"></textarea>
        <button type="submit" class="btn btn-lg bg-second text-white px-4 mt-3">Submit</button>
    </form>
    `

    const inputs = document.querySelectorAll('.form-control');
    const form = document.querySelector('.post-form');
    inputs.forEach(input=>{
        const nameAttr = input.getAttribute('name');
        input.value = currBlog[nameAttr];
    });
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        inputs.forEach(input=>{
            const nameAttr = input.getAttribute('name');
            currBlog[nameAttr] = input.value;
        });
        await fetch('http://localhost:3000/blogs/'+blogId, {
            method: 'PATCH',
            body: JSON.stringify({title:currBlog.title, body:currBlog.body}),
            headers: {'Content-Type': 'application/json'}
        });

        // window.location.replace('./blogs.html?id='+userId);
    })
})