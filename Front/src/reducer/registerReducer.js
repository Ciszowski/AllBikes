const initialState = {
  name: '',
  surname: '',
  email: '',
  privilege: false,
  token: '',
  isLogin: false,
  value: null
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      console.log('payload', action)
      let { name, surname, email, token, privilege } = action.payload
      return {
        ...state,
        name: name,
        surname: surname,
        email: email,
        token: token,
        privilege: privilege === 0 ? false : true,
        isLogin: true,
        value: null
      }
    case "SETVALUE":
      console.log('je fais un set value',action)
      return {
        ...state,
        value: action.value
      }
    case "DEFAULTVALUE":
      return {
        ...state,
        value: null
      }
    default:
      return state
  }
}
export default registerReducer;

