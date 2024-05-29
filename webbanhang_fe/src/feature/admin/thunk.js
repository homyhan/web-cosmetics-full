import { cosmeticsServ } from "../../services/cosmeticsServ";

export const postCategories =(data)=> async (dispatch)=>{
    try{
      const res = await cosmeticsServ.postCategory(data);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

  
export const getCategory =(id)=> async (dispatch)=>{
    try{
      const res = await cosmeticsServ.getCategory(id);
      dispatch({
        type:"CATE_ITEM",
        payload: res.data
      })
    }catch(err){
      console.log(err);
    }
  }
export const updateCategory =(id, data)=> async (dispatch)=>{
    try{
      const res = await cosmeticsServ.updateCategory(id, data);      
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

export const deleteCategory =(id)=>async(dispatch)=>{
  try{
    const res = await cosmeticsServ.deleteCategory(id);
  }catch(err){
    console.log(err);
  }
}

export const getProduct =(id)=>async(dispatch)=>{
  try{
    const res = await cosmeticsServ.getProduct(id);
    dispatch({
      type: "SET_SELECTED_PROD",
      payload: res.data
    })
  }catch(err){
    console.log(err);
  }
}

export const addProduct= (data)=>async(dispatch)=>{
  try{
    const res = await cosmeticsServ.addProduct(data);
    return res.data;
  }catch(err){
    console.log(err);
  }
}

export const deleteProduct = (id)=>async (dispatch)=>{
  try{
    const res = await cosmeticsServ.deleteProduct(id);
  }catch(err){
    console.log(err);
  }
}

export const updateProduct = (id, data)=>async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateProduct(id, data);
    return res.data;
  }catch(err){
    console.log(err);
  }
}

export const getBanner = (id) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.getBanner(id);
    dispatch({
      type: "BANNER_ITEM",
      payload: res.data
    })
  } catch (err) {
    console.log(err);
  }
};

export const updateBanner =(id, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateBanner(id, data);
    return res.data
  }catch(err){
    console.log(err);
  }
}

export const deleteBanner =(id)=>async(dispatch)=>{
  try{
    const res = await cosmeticsServ.deleteBanner(id);
  }catch(err){
    console.log(err);
  }
}

export const postBanners =(data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.postBanner(data);
    return res.data
  }catch(err){
    console.log(err);
  }
}

//USER
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await cosmeticsServ.getUser(id);
    dispatch({
      type: "USER_ITEM",
      payload: res.data
    })
  } catch (err) {
    console.log(err);
  }
}

export const updateStatus =(id, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateStatusUser(id, data);
    return res.data
  }catch(err){
    console.log(err);
  }
}

export const updateInforUser =(id, data)=> async (dispatch)=>{
  try{
    const res = await cosmeticsServ.updateUser(id, data);
    return res.data
  }catch(err){
    console.log(err);
  }
}

export const registerForAdmin = (data)=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.register(data);
      return res;
  } catch (error) {
      return error.response
  }
}
//END


export const getRoles = ()=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.getRole();
      dispatch({
        type: "SET_ROLES",
        payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}
export const addRoles = (data)=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.addRole(data);
      return res;
  } catch (error) {
      return error?.response;
  }
}
export const getRoleById = (id)=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.getRoleById(id);
      dispatch({
        type:"SELECTED_ROLE",
        payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}
export const deleteRoleById = (id)=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.deleteRoleById(id);
      return res;
  } catch (error) {
      return error.response;
  }
}
export const updateRoleById = (id, data)=>async (dispatch)=>{
  try {
      const res = await cosmeticsServ.updateRoleById(id, data);
      return res;
  } catch (error) {
      return error.response;
  }
}


export const fetchProdsList =(page, size)=> async (dispatch) => {
  try {
    
    const res = await cosmeticsServ.getProductsList(page, size);
    dispatch({
        type: "SET_PRODS_ADMIN",
        payload: res.data,
      });
  } catch (error) {
    console.log(error);
  }
};  