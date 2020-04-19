import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Wys extends Component {
    state = { value:''}
    handleChange = (event, editor) =>{
        const data = editor.getData();
        console.log( { data } );
        this.setState({value:data})
    }
    render() { 
        return (
        <> 
        <h1>
            EDITOR
        </h1>
        <CKEditor
        editor={ClassicEditor}
        onChange={this.handleChange}
        />
        <div>{ReactHtmlParser(this.state.value)}</div>
        </>);
    }
}
 
export default Wys;