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
};

export const fetBanners = async (dispatch)=>{
  try{
    const res = await cosmeticsServ.getBanners();
    dispatch({
      type: "SET_BANNER",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}
//USER
export const fetUsers = async (dispatch)=>{
  try{
    const res = await cosmeticsServ.getUsers();
    dispatch({
      type: "SET_USER",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}

export const addToCart = (data) => async(dispatch)=>{
  try {
    const res = await cosmeticsServ.addToCart(data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCartById = id => async (dispatch)=>{
  try {
    const res = await cosmeticsServ.getCartById(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const changeQuantityProdCart = (id, quantity)=>async(dispatch)=>{
  try {
    const res = await cosmeticsServ.updateQuantityProdCart(id, quantity);
  } catch (error) {
    console.log(error);
  }
}

export const removeProdInCart = (userId, idCart)=>async(dispatch)=>{
  try {
    const res = await cosmeticsServ.removeProdInCart(userId, idCart);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const clearCart = (userId)=>async(dispatch)=>{
  try {
    const res = await cosmeticsServ.clearCart(userId);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const getProduct =(id)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.getProduct(id);
    dispatch({
      type:"PRO_ITEM",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}

//EditInfor
export const updateInforUser =(id, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateUser(id, data);
    return res.data
  }catch(err){
    console.log(err);
  }
}