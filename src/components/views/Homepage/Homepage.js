import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux.js';
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
import Link from '@material-ui/core/Link';

const Component = ({className, posts, user, fetchPublishedPosts}) => {

  React.useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);

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
        {posts.map((post, index) => {
          const [date, time] = post.created.split('T');

          return(
            <Card key={index} className={clsx(className, styles.card)}>
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
                    Created: {`${date} ${time.slice(0, 8)}`}
                  </Typography>
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
              {user.logged === true &&
                <CardActions>
                  <Button size="small" color="primary" component={Link} href={`post/${post._id}`}>
                    See more
                  </Button>
                  <Button size="small" color="primary" component={Link} href={`post/${post._id}/edit`}>
                    Edit
                  </Button>
                </CardActions>
              }
            </Card>
          );
        })}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  user: PropTypes.object,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
