import { produce } from "immer";

const initialState = {
    products:[]
  };

  export const bookingReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === "SET_PRODUCTS") {
            draft.products = payload;
          }
      
    });
  };