export default class Data{
    static async getAllUsers(){
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        return data;
    }
    static async getAllBlogs(){
        const res = await fetch('http://localhost:3000/blogs');
        const data = await res.json();
        return data;
    }
}