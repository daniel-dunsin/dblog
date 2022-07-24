import Data from "./allInfo.js";
//  get the id from the search parameter
const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".container-lg");


const renderBlogs = (container, allBlogs)=>{
    container.innerHTML =  allBlogs.map(blog=>{
        return `
            <div class="col-md-4 bg-white rounded p-4 blog col-12 mx-md-1 my-1">
            <!-- author -->
            <h4 class="fw-bold d-inline-block text-second text-capitalize">${blog.title}</h4>
            <p class="text-first h6 fw-lighter text-second">${blog.author}</p>
            <p class="text-muted">${blog.body.slice(0,100)}
            </p>
            <a href="./blogDetails.html?id=${blog.id}&userId=${id}" class="text-first"
            >Read More <i class="fa fa-arrow-right px-1"></i
            ></a>
        </div>
        `
    }).join('')
}


// load all the blogs from the database
const renderPage = async () => {
  container.innerHTML = `
        <nav class="p-2 py-3 row justify-content-between align-items-center mb-5">
        <div class="col-md-10 col-7">
        <img src="../img/logo.png" class="logo-img" alt="" />
        </div>
        <div
        class="col-md-2 col-5 row justify-content-center align-items-center"
        >
        <a href="./createPost.html?id=${id}" class="text-black col-4"
            ><i class="fa fa-plus h4 mt-2"></i
        ></a>
        <a href="user.html?id=${id}" class="profile-img col-8"
            ><i class="fa fa-user text-white"></i
        ></a>
        </div>
    </nav>

    <div class="row justify-content-between align-items-center">
        <form class="col-md-8 col-9">
        <input type="text" class="form-control" placeholder="Search Blogs" />
        </form>
    </div>

    <div
            id="all-blogs"
            class="my-5 row justify-content-center justify-content-md-start align-items-center p-1 "
        ></div>
    `;
    const allBlogs = await Data.getAllBlogs();
    
    // select all blogs container afterwards and inject it
    const blogsContainer = document.getElementById('all-blogs');
    renderBlogs(blogsContainer, allBlogs);

    // seact functionality
    const searchBox = document.querySelector('.form-control');
    searchBox.addEventListener('keyup',async ()=>{
        const value = searchBox.value;
        const uri = 'http://localhost:3000/blogs?q='+value;
        const searchedBlogs = await fetch(uri).then(response=>response.json()).then(data=> data);
        renderBlogs(blogsContainer, searchedBlogs);
    })
};

window.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
