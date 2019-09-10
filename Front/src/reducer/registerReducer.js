const initialState = {
  name: '',
  surname: '',
  privilege: false,
  token : '',
  isLogin: false,
};

  const registerReducer = (state = initialState, action)=>{
    switch (action.type) {
      case "REGISTER":
        console.log('payload', action.payload)
        const { name, surname, token, privilege } = action.payload
            return {
              ...state,
              name: name,
              surname: surname,
              token: token,
              privilege: privilege === 0 ? false : true,
              isLogin: true
              }
        default:
            return state
    }
  }
export default registerReducer;

