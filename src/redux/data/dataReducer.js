export const DATA_TYPES = {
  AUTH: 'AUTH',
  MENU: 'MENU',
  HEADER: 'HEADER',
  TAB: 'TAB',
  RESET: 'RESET'
}

const initialState = {
  auth: false,
  menu: 'short',
  header: false,
  tab: 0,
};

export const dataReducer = (state = initialState, action) => {
  let resultState = {...state};

  switch (action.type) {
    case DATA_TYPES.AUTH:
      resultState.auth = action.data;
      break;
    case DATA_TYPES.HEADER:
      resultState.header = action.data;
      break;
    case DATA_TYPES.MENU:
      resultState.menu = action.data;
      break;
    case DATA_TYPES.TAB:
      resultState.tab = action.data;
      break;
    case DATA_TYPES.RESET:
      resultState = {...initialState};
      break;
    default:
  }

  return resultState;
};
