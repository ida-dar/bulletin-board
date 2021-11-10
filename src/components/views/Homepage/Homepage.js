import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { getAllUsers } from '../../../redux/usersRedux.js';

import styles from './Homepage.module.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const Component = ({className, allPosts, user, children}) => {

  const [expanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return(
    <div className={clsx(className, styles.root)}>
      {user.logged === true ?
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Button variant="contained" color="primary" component={Link} href="post/add">
              Add post
            </Button>
          </Grid>
        </Grid>
        : ''
      }
      <Typography variant="h6">
        Posts:
      </Typography>
      <div className={clsx(className, styles.postsContainer)}>
        {allPosts.map((post, index) => (
          <Card key={post.id} className={clsx(className, styles.card)}>
            {post.photo &&
              <CardMedia
                component="img"
                height="250"
                image={post.photo}
                alt="post-image"
              />
            }
            <CardContent>
              <List>
                <ListItem>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              <div className={clsx(className, styles.author)}>
                <Typography>
                  Author: {post.author}
                </Typography>
                <Typography>
                  Created: {post.created}
                </Typography>
                {(post.updated !== post.created) &&
                  <Typography>
                    Updated: {post.updated}
                  </Typography>
                }
                <Typography>
                  {post.price && `Price: ${post.price}$`}
                </Typography>
                <Typography>
                  {post.phone && `Phone number: ${post.phone}`}
                </Typography>
                <Typography>
                  {post.location && `Location: ${post.location}`}
                </Typography>
              </div>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
              <Typography gutterBottom component="div">
                See description
              </Typography>
              <IconButton
                className={clsx(styles.expand, {
                  [styles.expandOpen]: expanded,
                })}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedId === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph className={clsx(className, styles.text)}>
                  {post.text}
                </Typography>
              </CardContent>
            </Collapse>
            {user.logged === true &&
              <CardActions>
                <Button size="small" color="primary" component={Link} href="post/:id">
                  See more
                </Button>
                <Button size="small" color="primary" component={Link} href="post/:id/edit">
                  Edit
                </Button>
              </CardActions>
            }
          </Card>
        ))}
      </div>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  allPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      created: PropTypes.string,
      updated: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      photo: PropTypes.string,
      price: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  allPosts: getAll(state),
  user: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
