import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllUsers, getUserStatus, getAdmin } from '../../../redux/usersRedux.js';
import { fetchPostById, getOne } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';
import { NotFound } from '../NotFound/NotFound';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Component extends React.Component {

  /* TODO: Finish editing post, add actual values of form fields to state */
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

  onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({ image: imageList });
  };

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
    const { editPost } = this.props;

    e.preventDefault();

    if(post.author && post.status && (post.title.length > 10) && (post.text.length > 20)){
      await editPost(post._id, post);
      alert('Post edited successfully!');

    } else {
      await this.setState({ isError: true });
      alert('Please fill all fields correctly');
    }
  }

  render(){
    const { updateTextField, updateNumberField, submitForm } = this;
    const { className, user, admin } = this.props;
    const { post } = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        {(user.logged === true || admin.logged === true) ?
          <>
            <h2>Edit post</h2>
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

            <form className={clsx(className, styles.form)} noValidate autoComplete="off" onSubmit={submitForm}>
              <TextField id="author" name="author" label="Email*" variant="outlined" onChange={updateTextField} />
              <TextField id="phone" name="phone" label="Phone number" variant="outlined" onChange={updateTextField} />
              <TextField id="title" name="title" label="Title*" variant="outlined" onChange={updateTextField} />
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
                  <MenuItem value={'closed'}>Closed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="text"
                label="Post description*"
                name="text"
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
              <Button variant="contained" color="secondary" type="submit" className={clsx(className, styles.submit)}>
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
  className: PropTypes.string,
  user: PropTypes.object,
  userStatus: PropTypes.func,
  admin: PropTypes.object,
  editPost: PropTypes.func,
  post: PropTypes.any,
};

const mapStateToProps = state => ({
  user: getAllUsers(state),
  admin: getAdmin(state),
  post: getOne(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  userStatus: status => dispatch(getUserStatus(status)),
  editPost: (id, post) => dispatch(fetchPostById(id, post)),
  fetchOnePost: () => dispatch(fetchPostById(props.match.params.id)),
  // adminStatus: status => dispatch(getAdminStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
