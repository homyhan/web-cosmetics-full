import { produce } from "immer";

const initialState = {
    products:[],
    categories:[],
    selectedCate: {}
  };

  export const adminReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === "SET_PRODUCTS") {
         
            draft.products = payload;
        }
        if(type==="SET_CATEGORY"){
          
          draft.categories = payload
        }

        if(type==="CATE_ITEM"){
            
            draft.selectedCate= payload
        }
      
    });
  };