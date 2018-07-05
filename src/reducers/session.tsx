const INITIAL_STATE = {
  currentUser: null,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  currentUser: action.payload
});

function sessionReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'AUTH_USER_SET' : {
      return applySetAuthUser(state, action);
    }
    default : return state;
  }
}

export default sessionReducer;