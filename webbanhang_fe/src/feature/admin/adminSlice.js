import { produce } from "immer";

const initialState = {
    products:[],
    categories:[],
    selectedCate: {},
    selectedProd: {},
    banners:[],
    selectedBanner: {},
    users: [],
    selectedUser: {}
  };

  export const adminReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === "SET_PRODUCTS") {
         
            draft.products = payload;
        }
        if(type==="SET_CATEGORY"){
          
          draft.categories = payload;
        }

        if(type==="CATE_ITEM"){
            
            draft.selectedCate= payload;
        }
        if(type==="SET_SELECTED_PROD"){
          draft.selectedProd = payload;
        }

        if(type==="SET_BANNER"){
          
          draft.banners = payload
        }
      
        if (type === "BANNER_ITEM") {          
          draft.selectedBanner = payload;
        }

        //USER
        if(type==="SET_USER"){
          draft.users = payload
        }
  
        if(type==="USER_ITEM"){
            
          draft.selectedUser= payload;
        }
    });
  };