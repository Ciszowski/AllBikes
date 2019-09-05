const initialState = {
  isLogin: false,
  token : ''
};

  const registerReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "TOKEN":
            return {
                ...state}
        default:
            return state
    }
  }
export default registerReducer;

