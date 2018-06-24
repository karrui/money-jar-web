const INITIAL_STATE = {};

const applySetJars = (state, action) => ({
  ...state,
  ...action.payload
});

function jarReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'JARS_SET': {
      return applySetJars(state, action);
    }
    case 'JARS_RESET': {
      return INITIAL_STATE;
    }
    default: return state;
  }
}

export default jarReducer;