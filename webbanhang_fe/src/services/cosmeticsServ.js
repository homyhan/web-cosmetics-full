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
    },
    getProduct:(id)=>{
        return http.get("/product/"+id);
    },
    addProduct: (data)=>{
        return http.post("/products", data);
    },
    deleteProduct: (id)=>{
        return http.delete("/products/"+id)
    },
    updateProduct: (id, data)=>{
        return http.put("/products/"+id, data)
    },
    getBanners: ()=>{
        return http.get("/banners");
    },
    getBanner: (id)=>{
        return http.get("/banner/"+id);
    },
    updateBanner: (id, data)=>{
        return http.put("/banners/"+id, data);
    },
    deleteBanner: (id)=>{
        return http.delete("/banners/"+id);
    },
    postBanner: (data)=>{
        return http.post("/banner", data);
    },

    register: (data)=>{
        return http.post("/users", data);
    },
    generatePass: ()=>{
        return http.get("/generatePass");
    },
    forgetPass: (data)=>{
        return http.post("/users/forgot-password", data);
    },
    getUserByEmail: (email)=>{
        return http.get("/user/"+email)
    },
    updatePass: (id, data)=>{
        return http.put("/users/"+id+"/password", data);
    }

}