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
    },

     //USER
    getUsers: ()=>{
        return http.get("/users")
    }, 
    getUser: (id)=>{
        return http.get("/users/" + id)
    },
    updateStatusUser: (id, data)=> {
        return http.put("/user/" + id, data)
    },
    updateUser: (id, data)=> {
        return http.put("/edituser/" + id, data)
    },
    //END

    //LOGIN
    login: (data)=>{
        return http.post("/login", data);
    },

    addToCart: (data)=>{
        return http.post("/carts", data)
    },

    getCartById: (id)=>{
        return http.get("/carts/"+id);
    },
    updateQuantityProdCart: (id, quantity)=>{
        return http.put("/carts/"+id+"?quantity="+quantity)
    },

    removeProdInCart: (userId, idCart)=>{
        return http.delete("/carts?userId="+userId+"&id="+idCart);
    },

    clearCart: (idUser)=>{
        return http.delete("/allCarts?userId="+idUser);
    },
    //USER
    changePass: (idUser, data) => {
        return http.put("/users/" + idUser + "/password", data);
    },
    //ORDER
    getOrder: (userId) => {
        return http.get("/orders/" + userId);
    },
    getDetailOrder: (orderId)=>{
        return http.get("/order-details/" + orderId)
    },


    getRole: ()=>{
        return http.get("/roles");
    },
    addRole: (data)=>{
        return http.post("/roles", data);
    },
    getRoleById: (id)=>{
        return http.get("/roles/"+id);
    },
    deleteRoleById: (id)=>{
        return http.delete("/roles/"+id);
    },
    updateRoleById: (id, data)=>{
        return http.put("/roles/"+id, data);
    },

    getProductsList: (page, size)=>{
        return http.get("/productsPage",{
            params:{
                page,
                size
            }
        })
    }
    
}