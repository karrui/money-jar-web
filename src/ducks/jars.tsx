const INITIAL_STATE = {};

const applySetJars = (state, action) => ({
  ...state,
  jarList: { ...state.JarList, ...action.payload }
});

function jarReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'JARS_SET': {
      if (action.payload) {
        return applySetJars(state, action);
      }
      return state;
    }
    case 'JARS_RESET': {
      return INITIAL_STATE;
    }
    default: return state;
  }
}

export default jarReducer;