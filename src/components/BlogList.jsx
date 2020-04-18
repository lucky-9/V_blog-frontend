import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner'
import BlogCard from './BlogCard';
import { API } from './../backend';


const sizeOfLoader = 150;
const loaderColor = "#f4f4f4";
class BlogList extends Component {

    state = { blogs:[] }

    async componentDidMount(){
        try{
            const blogsApiCall = await fetch(`${API}/blogs`);
            const blogs =await blogsApiCall.json();
            console.log(blogs);
            this.setState({blogs})
        }
        catch(ex){
            console.log(`error fetching blogs ${ex}`)
        }
    }


    handleView = async (id) => {
        console.log("Blog is clicked " ,id+ "This is in Blog list page");
    
        this.props.history.push({
          // eslint-disable-next-line no-useless-concat
          pathname: "/blog" + "/description" + "/" + id
        });
      };
    render() {
        if(!this.state.blogs.length){
            return(<div style={{textAlign:"center", marginTop:"30vh"}}>
              <MDSpinner size={sizeOfLoader} singleColor={loaderColor}/>
            </div>)  
        }
        return (
        <div>

            {this.state.blogs.map((blog) =>(
                <BlogCard 
                author={blog.author.username}
                createdDate={blog.createdAt}
                title={blog.title}
                likeCount={blog.likes}
                id={blog._id}
                key={blog._id}
                onBlogClick={this.handleView} />
            ))}
        </div> );
    }
}
 
export default BlogList;