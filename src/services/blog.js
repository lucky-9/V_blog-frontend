import { API } from './../backend';
import { isAuthenticated } from './auth';



export const submitBlog = (blog) =>{
    const result = isAuthenticated();
    const token=result.token;
    const id=result._id;
    blog.author = id;
    console.log("final blog ", blog);
    return fetch(`${API}/create/${id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(blog)
    }).then(res => res.json())
    .catch(err=>console.log(err))
}

export const likeIncrementer =(blogId) =>{
    const result = isAuthenticated();
    const token=result.token;
    const id=result._id;
    return fetch(`${API}/blog/${blogId}/${id}/like`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
        })

}
