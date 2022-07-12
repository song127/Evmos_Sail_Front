// export const MESSAGE_ACTION_TYPES = {
//     SHOW_MESSAGE: 'SHOW_MESSAGE',
//     HIDDEN_MESSAGE: 'HIDDEN_MESSAGE',
// }
//
// const initialState = {
//     show: true,
//     modalType: MESSAGE_TYPES.COMPLETE,
//     content: null,
// };
//
// export const messageReducer = (state = initialState, action) => {
//     let currentState = {...state};
//
//     switch (action.type) {
//         case MESSAGE_ACTION_TYPES.SHOW_MESSAGE:
//             currentState.show = true;
//             currentState.modalType = action.type;
//             currentState.content = action.content;
//             break;
//         case MESSAGE_ACTION_TYPES.HIDDEN_MESSAGE:
//             currentState.show = false;
//             currentState.content = null;
//             break;
//         default:
//             break;
//     }
//     return currentState;
// };
