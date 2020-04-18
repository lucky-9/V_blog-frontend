import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { isAuthenticated, singout } from './../services/auth';





const useStyles = makeStyles(theme => ({

  bar:{
    fontFamily: 'Inconsolata',
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar=(props)=>{

  const classes = useStyles();

  const handleSignup = (props) =>{
    props.history.push('/signup')
  }

  const hadleLogin = (props) =>{
    props.history.push('/signin')  
  }

  const hadleSignOut = (props) =>{
    singout();
    props.history.push('/');
  }

  const hadleBlog = (props) =>{
    props.history.push('/create/blog')
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar} style={{background:'#3a3535', color:'#f4f4f4'}}>
        <Toolbar>
          <h3 variant="h6" className={classes.title} >
            <Link to="/" className="App-heading-font" style={{color:"inherit", textDecoration:"none"}}>V_Blog</Link>
          </h3>
          {!isAuthenticated() && <>
            <Button onClick={() => hadleLogin(props)} color="inherit">sign-in</Button>
            <Button onClick={() => handleSignup(props)} color="inherit">sign-up</Button>
          </>}
          {isAuthenticated() && <Button onClick={() => hadleBlog(props)} style={{backgroundColor:"#f4f4f4", color:"black"}} className="write-blog-btn" color="inherit">write a Blog</Button>}
          {isAuthenticated() && <Button onClick={() => hadleSignOut(props)} color="inherit">signout</Button>}
        </Toolbar>
      </AppBar>
    </div>
    
   
  )


};

export default withRouter(ButtonAppBar);