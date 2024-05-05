
import { cosmeticsServ } from "../../services/cosmeticsServ";
export const register = (data)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.register(data);
        return res;
    } catch (error) {
        return error.response
    }
}