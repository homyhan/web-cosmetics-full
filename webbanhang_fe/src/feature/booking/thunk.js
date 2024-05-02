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

export const fetchCategories = async (dispatch)=>{
  try{
    const res = await cosmeticsServ.getCategories();
    dispatch({
      type: "SET_CATEGORY",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}