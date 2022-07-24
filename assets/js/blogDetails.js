import Data from './allInfo.js'
// get the blog id
const id = new URLSearchParams(window.location.search).get('id');
const userId = new URLSearchParams(window.location.search).get('userId');
console.log(userId);
const container = document.querySelector('.container-lg');

window.addEventListener('DOMContentLoaded', async ()=>{
    const allBlogs = await Data.getAllBlogs();
    // find the current blog
    const currBlog = allBlogs.find(blog=> blog.id == id);
    container.innerHTML = `
    <nav class="mt-2">
    <a href="./blogs.html?id=${userId}"><img src="../img/logo.png" alt="" class="logo-img"></a>
    </nav>
    <article class="blog my-5">
    <!-- title -->
    <header>
        <h1 class="fw-bold text-second p-0 m-0 mb-1">${currBlog.title}</h1>
        <!-- name of author -->
        <p class="lead text-gray fw-bold">${currBlog.author}</p>
        <p>${currBlog.body}</p>
    </header>
    </article>
    `
})