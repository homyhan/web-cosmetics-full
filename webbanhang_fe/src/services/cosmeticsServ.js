import { http } from "./config";

export const cosmeticsServ = {
    getProducts: ()=>{
        return http.get("/products");
    }
}