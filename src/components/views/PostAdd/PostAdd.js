import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux.js';
import { addPostRequest } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';
import { NotFound } from '../NotFound/NotFound';

class Component extends React.Component {

  state = {
    post: {
      author: '',
      created: '',
      updated: '',
      status: 'published',
      title: '',
      text: '',
      photo: '',
      price: '',
      phone: '',
      location: '',
    },
    isError: false,
  }

  updateTextField = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value }});
  }

  updateNumberField = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) }});
  }

  submitForm = async (e) => {
    const { post } = this.state;
    const { addPost } = this.props;

    e.preventDefault();

    if(post.author && post.status && (post.title.length > 10) && (post.text.length > 20)){
      await addPost(post);
      alert('Post added successfully!');

      this.setState({
        post: {
          author: '',
          created: '',
          updated: '',
          status: '',
          title: '',
          text: '',
          photo: '',
          price: '',
          phone: '',
          location: '',
        },
      });
    } else {
      await this.setState({ isError: true });
      alert('Please fill all fields correctly');
    }
  }

  render(){
    const { updateTextField, updateNumberField, submitForm } = this;
    const { className, user } = this.props;
    const { post } = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        {user.logged === true ?
          <>
            <h2>Add post</h2>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item>
                <Button variant="contained" color="primary" component={Link} href="/">
                  Homepage
                </Button>
              </Grid>
            </Grid>
            <form className={clsx(className, styles.form)} noValidate autoComplete="off" action="/posts/add" method="POST" encType="multipart/form-data" onSubmit={submitForm}>
              <TextField id="author" name="author" label="Email*" variant="outlined" onChange={updateTextField} />
              <TextField id="phone" name="phone" label="Phone number" variant="outlined" onChange={updateTextField} />
              <TextField id="title" name="title" label="Title*" helperText="min. 10 characters" variant="outlined" onChange={updateTextField} />
              <FormControl>
                <InputLabel id="statusLabel">Status of the post*</InputLabel>
                <Select
                  labelId="statusLabelSelect"
                  id="status"
                  name="status"
                  value={post.status}
                  onChange={updateTextField}
                >
                  <MenuItem value={'draft'}>Draft</MenuItem>
                  <MenuItem value={'published'}>Published</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="text"
                label="Post description*"
                name="text"
                helperText="Min. 20 characters"
                multiline
                rows={12}
                variant="outlined"
                onChange={updateTextField}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                <OutlinedInput
                  id="price"
                  name="price"
                  onChange={updateNumberField}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  labelWidth={60}
                />
              </FormControl>
              <TextField id="location" name="location" label="Location" variant="outlined" onChange={updateTextField} />
              <div>
                <input
                  name="photo"
                  accept=".jpg, .jpeg, .png, .gif"
                  className={clsx(className, styles.input)}
                  id="contained-button-file"
                  onChange={updateTextField}
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload image
                  </Button>
                </label>
              </div>
              <Button variant="contained" type="submit" color="secondary" className={clsx(className, styles.submit)}>
                Submit
              </Button>
            </form>
          </>
          : <NotFound />
        }
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  userStatus: PropTypes.func,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
  addPost: (post) => dispatch(addPostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
