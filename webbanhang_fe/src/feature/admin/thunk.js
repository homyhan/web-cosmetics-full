import { cosmeticsServ } from "../../services/cosmeticsServ";

export const postCategories =(data)=> async (dispatch)=>{
    try{
      const res = await cosmeticsServ.postCategory(data);
      
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
      
    }catch(err){
      console.log(err);
    }
  }