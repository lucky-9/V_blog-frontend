import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BlogCard(props) {
  const classes = useStyles();

  return (
    <div className="container my-2" onClick={()=>
      {
        props.onBlogClick(props.id)
      }}>
        <Card className={classes.root}>
          <CardContent>
            <h5 className="blog-description" color="textSecondary">
              posted on {props.createdDate.substring(0,10)}
            </h5>
            <p className="blog-card-heading">
              {props.title}
            </p>
            <h5 className="blog-description">
              By <span>{props.author}</span>
            </h5>
        </CardContent>
        <CardActions>
        <ThumbUpAltIcon onClick={() => console.log("clicked")}/>
        <span className="text-secondary">{props.likeCount}</span>
      </CardActions>
    </Card>
    </div>
  );
}