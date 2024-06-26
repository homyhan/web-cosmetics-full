import { cosmeticsServ } from "../../services/cosmeticsServ";

export const fetchProducts =(page, size)=> async (dispatch) => {
    try {
      
      const res = await cosmeticsServ.getProductsList(page, size);
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
      type: "SET_BANNER_USER",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}
//USER
// export const fetUsers = async (dispatch)=>{
//   try{
//     const res = await cosmeticsServ.getUsers();
//     dispatch({
//       type: "SET_USER",
//       payload: res.data
//     })
//   }catch(err){
//     console.log(err);
//   }
// }

export const addToCart = (data) => async(dispatch)=>{
  try {
    const res = await cosmeticsServ.addToCart(data);
    return res;
  } catch (error) {
    console.log(error);
    return error?.response;
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

export const changePassword =(idUser, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.changePass(idUser, data);
    return res.data
  }catch(err){
    console.log(err);
  }
}

//order
export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.getOrder(userId);
    dispatch({
      type: "SET_ORDERS",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const fetchDetailOrder = (orderId) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.getDetailOrder(orderId);
    dispatch({
      type: "SET_DETAIL",
      payload: res.data,
    });
    console.log(res?.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProdsByName = (name, page, size) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.searchProductsByName(name, page, size);
    dispatch({
      type: "SET_PRODUCTS",
      payload: res.data,
    });
    console.log(res?.data);
  } catch (error) {
    console.log(error);
  }
};
export const fetchCommentsProd = (id, page, size) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.getCommentsProd(id, page, size);
    dispatch({
      type: "SET_COMMENTS",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const commentsProd = (data)=>async (dispatch)=>{
  try {
    const res = await cosmeticsServ.commentsProd(data);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
export const updateCommentsProd = (id, data)=>async (dispatch)=>{
  try {
    const res = await cosmeticsServ.updateComment(id, data);
  } catch (error) {
    console.log(error);
  }
}

export const checkout = (data)=>async (dispatch)=>{
  try {
    const res = await cosmeticsServ.checkout(data);
  } catch (error) {
    console.log(error);
  }
}

export const updateStateOrder =(orderId, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateStatusOrder(orderId, data);      
    return res.data;
  }catch(err){
    console.log(err);
  }
}