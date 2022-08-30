export const DATA_TYPES = {
  AUTH: 'AUTH',
  HEADER: 'HEADER',
  MENU: 'MENU',
  TAB: 'TAB',
  COUNT: '',
  DATA_RESET: 'DATA_RESET'
}

const initialState = {
  header: false,
  menu: '',
  tab: 0,
  count: 0,
};

export const dataReducer = (state = initialState, action) => {
  let resultState = {...state};

  switch (action.type) {
    case DATA_TYPES.HEADER:
      resultState.header = action.data;
      break;
    case DATA_TYPES.MENU:
      resultState.menu = action.data;
      break;
    case DATA_TYPES.TAB:
      resultState.tab = action.data;
      break;
    case DATA_TYPES.DATA_RESET:
      resultState = initialState;
      break;
    default:
  }

  return resultState;
};
