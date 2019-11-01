export const initialState = {
   favori: []
};

export const bikeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "LOADFAVORI":
         return {
            ...state,
            favori: action.payload
         }
      default:
         return state
   }
}
