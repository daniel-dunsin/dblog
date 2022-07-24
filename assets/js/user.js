import Data from './allInfo.js';

// get the id for the page.
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.container-lg');


const renderPage = async ()=>{
    const allUsers = await Data.getAllUsers();
    const allBlogs = await Data.getAllBlogs();
    // find the specific user using the id
    const currUser = allUsers.find(user=> user.id == id);
    container.innerHTML = `
    <nav class="mt-2">
    <a href="./blogs.html?id=${id}"><img src="../img/logo.png" alt="" class="logo-img"></a>
    </nav>
    <div class="row justify-content-center align-items-start p-3 mt-5">
        <div class="col-md-6 col-12 my-2 text-center text-md-start">
            <!-- image container -->
            <div class="user-details-container text-center">
                <div class="user-img border border-4 border-gray">
                    <i class="fa fa-user"></i>
                </div>
                <!-- socials container -->
                <section class="mt-2">
                    <button class="btn px-2 py-0 m-0"><a href=${currUser.linkedin}><i class="fab fa-linkedin h3 text-primary"></i></a></button>
                    <button class="btn px-2 py-0 m-0"><a href="https://wa.me/${currUser.whatsapp}"><i class="fab fa-whatsapp h3 text-success"></i></a></button>
                </section>
                <header>
                    <h3 class="fw-bold mt-1">${currUser.username}</h3>
                    <p class="fw-bold text-danger pointer" id="delete-account-btn">Delete my Account</p>
                    <a href="../../index.html" class="text-primary text-decoration-none h5 fw-bold">Log out</a>

                </header>
            </div>
        </div>
        <div class="col-md-6 col-12 my-2">
            <h1 class="display-5 text-second text-center fw-bold text-decoration-underline">Blogs Posted</h1>
            <div class="mt-3 mt-md-5 users-blogs">
                <!-- blog posts -->
                
            </div>
        </div>
    </div>    
    `
    // select blogs container
    const blogsContainer = document.querySelector('.users-blogs');
    blogsContainer.innerHTML = allBlogs.map(blog=>{
        if(blog.UserId == currUser.id){
            return `
            <article class="bg-white p-2 row justify-content-between align-items-center rounded-lg my-2">
            <!-- blog title -->
            <div class="col-6 text-start">
                <h5 class="m-0">${blog.title}</h5>
            </div>
            <!-- icons -->
            <div class="col-6 text-end">
                <button class="btn text-success p-0 px-1"><a href="./editPost.html?id=${blog.id}&userId=${blog.UserId}"><i class="fa fa-edit"></i></a></button>
                <button class="btn p-0 px-1 text-danger" data-id=${blog.id}><i class="fa fa-trash"></i></button>
            </div>
        </article>
        `
        }
    }).join('');
    const deleteAccountBtn = document.querySelector('#delete-account-btn');
    // make a delete request
    console.log(deleteAccountBtn);
    deleteAccountBtn.addEventListener('click', async ()=>{
        await fetch('http://localhost:3000/users/'+id, {
            method: 'DELETE'
        });
        // filter out the blogs of the currUser
        const userBlogs = allBlogs.filter(blog=> blog.UserId == id);
        // delete all the user blogs
        userBlogs.forEach(async(blog)=>{
            await fetch('http://localhost:3000/blogs/'+blog.id,{
                method: 'DELETE'
            })
        })
        // window.location.replace('./signup.html')
    });

    // delete a particular blog
    const deleteBlogBtns = document.querySelectorAll('.fa-trash');
    deleteBlogBtns.forEach(deleteBlogBtn=>{
        deleteBlogBtn.addEventListener('click', async (e)=>{
            const deleteBtnId = parseInt(deleteBlogBtn.parentElement.dataset.id);
            const parent = e.currentTarget.parentElement.parentElement.parentElement;
            blogsContainer.removeChild(parent);
            // make a delete request to the blogs
            await fetch('http://localhost:3000/blogs/'+deleteBtnId, {
                method: 'DELETE'
            });
        })
    })
}
window.addEventListener('DOMContentLoaded', ()=>{
    renderPage();
})