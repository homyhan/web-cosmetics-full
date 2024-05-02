import { http } from "./config";

export const cosmeticsServ = {
    getProducts: ()=>{
        return http.get("/products");
    },
    getCategories: ()=>{
        return http.get("/category");
    },
    postCategory: (data)=>{
        return http.post("/category", data);
    },
    getCategory: (id)=>{
        return http.get("/category/"+id);
    },
    updateCategory: (id, data)=>{
        return http.put("/category/"+id, data);
    },
    deleteCategory: (id)=>{
        return http.delete("/category/"+id);
    }
}