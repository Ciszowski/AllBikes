const initialState = {};

  const registerReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "PWD":
            return {
                ...state}
        default:
            return state
    }
  }
export default registerReducer;

