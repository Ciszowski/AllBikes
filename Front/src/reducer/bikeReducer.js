export const initialState = {
   data: []
};

export const bikeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "LOADBIKE":
         return {
            ...state,
            data: action.payload
         }
      default:
         return state
   }
}
