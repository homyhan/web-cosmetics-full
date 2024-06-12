
import { cosmeticsServ } from "../../services/cosmeticsServ";
export const register = (data)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.register(data);
        return res;
    } catch (error) {
        return error.response
    }
}

export const generatePass = async(dispatch)=>{
    try {
        const res = await cosmeticsServ.generatePass();
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const forgotPass = (data)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.forgetPass(data)
        return res;
    } catch (error) {
        return error.response
    }
}
export const getUserByEmail = (email)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.getUserByEmail(email);
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const updatePass = (id, data)=>async(dispatch)=>{
    try {
        const res = await cosmeticsServ.updatePass(id, data);
    } catch (error) {
        console.log(error);
    }
}

//LOGIN
export const login = (data)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.login(data);
        const objPayload={
            id: res?.data?.id,
            email: res?.data?.email,
            role: res?.data?.role,
            phone: res?.data?.phone,
            fullName: res?.data?.fullName,
            address: res?.data?.address
        }
        dispatch({
            type: "USER_LOGIN",
            payload: objPayload
        })
        return res;
    } catch (error) {
        return error.response
    }
}
export const fetchProfile = (data)=>async (dispatch)=>{
    try {
        const res = await cosmeticsServ.fetchProfile(data);
        const objUser = {
            id: res?.data?.id,
            email: res?.data?.email,
            role: res?.data?.role,
            phone: res?.data?.phone,
            fullName: res?.data?.fullName,
            address: res?.data?.address
        }
        dispatch({
            type: "USER_LOGIN",
            payload: objUser
        })        
        return res;
    } catch (error) {
        return error.response
    }
}
