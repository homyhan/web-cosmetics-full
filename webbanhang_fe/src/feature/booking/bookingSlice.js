import { produce } from "immer";

const initialState = {
    products:[],
    selectedPro: {},
    orders:[],
    details: []
  };

  export const bookingReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === "SET_PRODUCTS") {
            draft.products = payload;
        }
        if(type==="PRO_ITEM"){ 
          draft.selectedPro= payload;
        }
        if (type === "SET_ORDERS") {
          draft.orders = payload;
        }
        if (type === "SET_DETAIL") {
          draft.details = payload;
        }
        
    });
  };
