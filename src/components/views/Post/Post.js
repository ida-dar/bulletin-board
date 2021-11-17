import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchPostById, getOne } from '../../../redux/postsRedux.js';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux.js';

import styles from './Post.module.scss';
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

const Component = ({className, user, post, fetchOnePost}) => {

  React.useEffect(() => {
    fetchOnePost();
  }, [fetchOnePost]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      <Card className={clsx(className, styles.card)}>
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
              {post.price && `Price: ${post.price}`}
            </Typography>
            <Typography>
              {post.phone && `Phone: ${post.phone}`}
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
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className={clsx(className, styles.text)}>
              {post.text}
            </Typography>
          </CardContent>
        </Collapse>
        {user.logged === true &&
          <CardActions>
            <Button size="small" color="primary" component={Link} href={`/post/${post._id}/edit`}>
              Edit
            </Button>
          </CardActions>
        }
      </Card>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  userStatus: PropTypes.func,
  fetchOnePost: PropTypes.func,
  post: PropTypes.object,
};

const mapStateToProps = state => ({
  post: getOne(state),
  user: getAllUsers(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  userStatus: status => dispatch(getUserStatus(status)),
  fetchOnePost: () => dispatch(fetchPostById(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
