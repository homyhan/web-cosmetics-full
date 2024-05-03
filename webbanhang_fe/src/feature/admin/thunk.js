import { cosmeticsServ } from "../../services/cosmeticsServ";

export const postCategories =(data)=> async (dispatch)=>{
    try{
      const res = await cosmeticsServ.postCategory(data);
      // console.log("ressss", res);
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