import { produce } from "immer";

const initialState = {
    user: {}
  };

  export const authReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if(type=="USER_LOGIN"){
          draft.user=payload
        }
    });
  };