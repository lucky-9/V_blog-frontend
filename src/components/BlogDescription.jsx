import React, { Component } from 'react';
import  MDSpinner  from 'react-md-spinner';
import ReactHtmlParser from 'react-html-parser'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { API } from './../backend';
import {likeIncrementer} from '../services/blog';
import { isAuthenticated } from './../services/auth';


const sizeOfLoader = 150;
const loaderColor = "#f4f4f4";

class BlogDescription extends Component {
    constructor(props){
        super(props)
        this.state={blog:'',disabled:false, liked:false}
    }

    handleLike =async () =>{
        if(!isAuthenticated()){
           this.props.history.push('/signin') 
        }
        if(this.state.liked){
            return;
        }
        let blog = {};
        blog = {...this.state.blog};
        blog.likes = blog.likes+1;
        // console.log("before setting state : ", blog);
        this.setState({blog});
        this.setState({liked:true});
        this.setState({disabled:true});
        await likeIncrementer(blog._id);
    }

    handleBack = () =>{
        this.props.history.goBack();
    }
    async componentDidMount(){
        try{
            const blogApiCall = await fetch(`${API}/blog/${this.props.match.params.blogId}`)
            var blog = await blogApiCall.json()
            this.setState({blog})
        }
        catch(ex){
            console.log(`error fetching blog by ID ${ex}`)
        }
       
            if(isAuthenticated()){
            const result = isAuthenticated();
            const userId=result._id;
            try {
                const userApiCall = await fetch(`${API}/user/${userId}`, {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${result.token}`
                    }});
                let user = await userApiCall.json();
                let likedBlogs = user.likedBlogs;
                if(likedBlogs.includes(blog._id)){
                    this.setState({liked:true});
                    this.setState({disabled:true});
                }else{
                    console.log("Blog is not liked by this user")
                }  
            } catch (ex) {
                console.log(ex);
            }
            

            }
        
    }

    render() {
        if(!this.state.blog){
            return(<div style={{textAlign:"center", marginTop:"30vh"}}>
              <MDSpinner size={sizeOfLoader} singleColor={loaderColor}/>
            </div>) 
          } 
        const {title, description, createdAt, author} = this.state.blog;
        console.log("the author ", author.username)
        return ( 
        <>
        <div className="blog-header-background mb-5">
            <h1 className="blog-heading">{title}</h1>
            <p className="blog-author-details">By {author.username} on {createdAt.substring(0,10)}</p>
            <button disabled={this.state.disabled} className="btn btn-dark" onClick={this.handleLike}><ThumbUpAltIcon fontSize="large"/>{this.state.blog.likes}</button>
        </div>
        <div className="container">
            <p className="blog-description blog-text flex-wrap">{ReactHtmlParser(description)}</p>
        </div>
        <button className="ml-3 mu-5 btn btn-dark" onClick={this.handleBack}>BACK</button>
        </>
         );
    }
}
 
export default BlogDescription;