import React, { Component } from 'react';
import Joi from 'joi-browser';
import ReactHtmlParser from 'react-html-parser'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { submitBlog } from './../services/blog';

class BlogForm extends Component {
    state = { 
        blog:{title:'', description:''},
        errors:{},
        blogSubmitted:false,
        submitting:false
     }


    schema = {
        title:Joi.string().required().min(5).label("Title"),
        description:Joi.string().required().min(25).label("Description")
    } 
    validate = () =>{
        const options = {abortEarly:false};
        const res = Joi.validate(this.state.blog, this.schema, options);
        console.log(res)
        if(!res.error) return null;
        const errors = {};
        for(let item of res.error.details){
            errors[item.path[0]] = item.message
        }
        return errors;
    }

    handleSubmit=(e) =>{
        e.preventDefault();
       
        const errors = this.validate();
        console.log(errors);
        this.setState({errors:errors || {}}) 
        if(errors){
            return;
        }
        console.log("blog submitted");
        this.doSubmit();
    }
    handleChange = (e) =>{
       
        console.log(e.target.value);
        console.log(e.target.name);
        let blog = {...this.state.blog};
        blog[e.target.name] = e.target.value;
        this.setState({blog});
    }


    handleOnchange = (event, editor) =>{
        const data = editor.getData();
        console.log(data);
        let blog = {...this.state.blog};
        blog['description'] = data;
        this.setState({blog})
    }

    doSubmit=() =>{
        const {blog} = this.state;
        console.log("when submitted ", blog.title);
        this.setState({submitting:true});
        submitBlog({title:blog.title, description: blog.description})
        .then(data =>{ 
        console.log(data)
        if(data.error){
            console.log("inside data.error if block ", data.error);
            const errors = {...this.state.errors};
            errors.title = data.error;
            this.setState({errors});
        }
        else{
            let blog={title:'', description:''}
            console.log("inside else block ");
            this.setState({blogSubmitted:true});
            this.setState({submitting:false});
            this.setState({blog});
        }});
    }
   
    render() { 
        const {blog, errors} = this.state;
        return ( 
        <div className="container my-5">
            <h1 className="form-headings">Blog Form</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={blog.title} onChange={this.handleChange} className="form-control input-field" id="title" name="title" type="text"/>
                    {errors.title &&<p className="text-danger">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    {/* <textarea value={blog.description} className="form-control blog-description rounded-2" onChange={this.handleChange} rows="10" id="description" name="description" type="text"/> */}
                    <CKEditor
                    editor={ClassicEditor}
                    onChange={this.handleOnchange}
                    data={blog.description}
                    />
                    {errors.description &&<p className="text-danger">{errors.description}</p>}
                </div>
                <button className="btn btn-dark mr-5" type="submit">{this.state.submitting ? 'POSTING...' : 'POST'}</button>
                {this.state.blogSubmitted && <span className="text-success">Blog Submitted Succesfully!</span>}
            </form>
        </div> );
    }
}
 
export default BlogForm;