const initialState = {
  id_user: 0,
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
      const {id_user, name, surname, email, token, privilege } = action.payload
      return {
        ...state,
        id_user: id_user,
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
    case "LINK": //only for Favori.js && RestQuizz.js to get bikeSingleView and get back in.
      return{
        ...state,
        link: action.payload
      }
    default:
      return state
  }
}
export default registerReducer;

