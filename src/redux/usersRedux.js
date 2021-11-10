/* selectors */
export const getAllUsers = ({user}) => user;
export const getAdmin = ({admin}) => admin;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const GET_USER_STATUS = createActionName('GET_USER_STATUS');
const GET_ADMIN_STATUS = createActionName('GET_ADMIN_STATUS');

/* action creators */
export const getUserStatus = payload => ({ payload, type: GET_USER_STATUS });
export const getAdminStatus = payload => ({ payload, type: GET_ADMIN_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case GET_USER_STATUS: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    case GET_ADMIN_STATUS: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    default:
      return statePart;
  }
};
