const INITIAL_STATE = {};

const applySetJars = (state, action) => ({
  ...state,
  jarList: action.payload
});

const applySetJarView = (state, action) => ({
  ...state,
  currentJar: action.payload,
});

function jarReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'JARS_SET': {
      return applySetJars(state, action);
    }
    case 'JAR_VIEW_SET': {
      return applySetJarView(state, action);
    }
    case 'JARS_RESET': {
      return INITIAL_STATE;
    }
    default: return state;
  }
}

export default jarReducer;