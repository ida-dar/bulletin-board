import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getOne = ({ posts }) => posts.onePost;
// export const getPostById = ({ posts }, id) => {
//   const postId = posts.data.filter((post) => post._id === id);
//   return postId;
// };

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
// const EDIT_POST = createActionName('EDIT_POST');
const GET_ONE_POST = createActionName('GET_ONE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
// export const editPost = payload => ({ payload, type: EDIT_POST });
export const fetchOnePost = payload => ({ payload, type: GET_ONE_POST });

/* thunk creators */
export const fetchPublished = () => {

  return (dispatch, getState) => {
    const { posts } = getState();

    if(posts.data.length === 0 && posts.loading.active === false){
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchPostById = (id) => {

  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchOnePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => {

  const newPost = {...post, created: new Date().toISOString(), updated: new Date().toISOString()};

  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post(`http://localhost:8000/api/posts/add`, newPost)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

// export const fetchPostEdit = (id, post) => {
//   console.log(id, post);

//   return (dispatch, getState) => {
//     dispatch(fetchStarted());

//     Axios
//       .put(`http://localhost:8000/api/posts/${id}/edit`, post)
//       .then((res) => {
//         dispatch(editPost(post));
//         console.log(post, res.data);
//       })
//       .catch((err) => {
//         dispatch(fetchError(err.message || true));
//       });
//   };
// };

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  // console.log(action.payload);
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...action.payload],
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case GET_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    // case EDIT_POST: {
    //   console.log(action.payload);
    //   return {
    //     ...statePart,
    //     data: [...statePart.data.map(post => post._id === action.payload._id ? action.payload : post)],
    //   };
    // }
    default:
      return statePart;
  }
};
