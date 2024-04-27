import { cosmeticsServ } from "../../services/cosmeticsServ";

export const fetchProducts = async (dispatch) => {
    try {
      
      const res = await cosmeticsServ.getProducts();
      dispatch({
        type: "SET_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };