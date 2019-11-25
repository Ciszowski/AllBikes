export const initialState = {
   favori: [],
   quizz: [],
   step: 0,
   modele :'',
   price: []
};

export const bikeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "LOADFAVORI":
         return {
            ...state,
            favori: action.payload
         }
      case "LOADQUIZZ":
         return{
            ...state,
            modele:'',
            quizz: action.payload,
            step: 0
         }
      case "GETNEXT":
         return{
            ...state,
            quizz: state.quizz[action.payload].next,
            step: state.step + 1
         }
      case "GETPRICE":
         return{
            ...state,
            quizz: action.payload.quizzPrice,
            modele: action.payload.modele,
            step: 3
         }
      case "SETPRICE":
         return {
            ...state,
            price: action.payload
         }
      case "REINITQUIZZ":
         return {
            ...state,
            modele: initialState.modele,
            price: initialState.price
         }
      default:
         return state
   }
}
