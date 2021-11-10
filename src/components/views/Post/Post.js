import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
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

const Component = ({className, user, children}) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const mockData = {
    id: 1,
    author:'the.admin@example.com',
    created: '2019-01-01',
    updated: '2019-01-01',
    status: 'published',
    title: 'Welcome to our bulletin board!',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias omnis officiis illo repellendus consequuntur eligendi accusamus tempore ex maxime voluptatibus dolorum inventore officia eius iusto optio quisquam.',
    photo: 'https://images.pexels.com/photos/128299/pexels-photo-128299.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: null,
    phone: null,
    location: null,
  };

  return(
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      <Card className={clsx(className, styles.card)}>
        {mockData.photo &&
          <CardMedia
            component="img"
            height="250"
            image={mockData.photo}
            alt="post-image"
          />
        }
        <CardContent>
          <List>
            <ListItem>
              <Typography gutterBottom variant="h5" component="div">
                {mockData.title}
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <div className={clsx(className, styles.author)}>
            <Typography>
              Author: {mockData.author}
            </Typography>
            <Typography>
              Created: {mockData.created}
            </Typography>
            {(mockData.updated !== mockData.created) &&
              <Typography>
                Updated: {mockData.updated}
              </Typography>
            }
            <Typography>
              {mockData.price}
            </Typography>
            <Typography>
              {mockData.phone}
            </Typography>
            <Typography>
              {mockData.location}
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
              {mockData.text}
            </Typography>
          </CardContent>
        </Collapse>

        {
          user.logged === true &&
          <CardActions>
            <Button size="small" color="primary" component={Link} href="post/:id/edit">
              Edit
            </Button>
          </CardActions>
        }

      </Card>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  userStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  allPosts: getAll(state),
  user: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
