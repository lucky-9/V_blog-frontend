import React,{Component} from 'react';
import ButtonAppBar from './components/Appbar'
import {Switch, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BlogList from './components/BlogList';
import BlogDescription from './components/BlogDescription';
import BlogForm from './components/BlogForm';
import Wys from './components/wys';
import './App.css';
import { isAuthenticated } from './services/auth';


class App extends Component {
  state = { user:'' }
  componentDidMount(){
      if(isAuthenticated()){
        const {user, _id} = isAuthenticated();
        console.log("user id ",_id);
        const username = user.username
        this.setState({user:username})
        console.log(username);
      }
  }

  render() { 
    return (  <>
      <ButtonAppBar user={this.state.user}/>
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/create/blog" component={BlogForm}/>
        <Route path="/blog/description/:blogId" component={BlogDescription}/>
        <Route path='/' component={BlogList}/>
      </Switch>
      </> );
  }
}
 
export default App;
