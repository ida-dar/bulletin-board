export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
    onePost: {},
  },
  user: {
    id: 1,
    userEmail: 'johndoe@examle.com',
    logged: false,
  },
  admin: {
    id: 1,
    userEmail: 'the.admin@examle.com',
    logged: false,
  },
};
