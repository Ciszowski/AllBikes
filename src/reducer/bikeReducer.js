export const initialState = {
    type: '',
    navigate : false
};

 export const bikeReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "TYPE":
            return {
                ...state,
                type: action.payload,
                navigate: true
            }
        case "STOP_NAVIG":
            return {
                ...state,
                navigate: false}
        default:
           return state
    }
  }
