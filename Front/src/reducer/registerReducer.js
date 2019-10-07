const initialState = {
  name: '',
  surname: '',
  email: '',
  privilege: false,
  token: '',
  isLogin: false,
  value: null,
  link: ''
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
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
      return {
        ...state,
        value: action.value
      }
    case "VALUE&LINK":
      return {
        ...state,
        link: action.payload,
        value: null
      }
    default:
      return state
  }
}
export default registerReducer;

