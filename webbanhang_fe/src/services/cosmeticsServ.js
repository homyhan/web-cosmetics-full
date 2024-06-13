import { http } from "./config";

export const cosmeticsServ = {
  getProducts: () => {
    return http.get("/products");
  },
  getCategories: () => {
    return http.get("/category");
  },
  postCategory: (data) => {
    return http.post("/category", data);
  },
  getCategory: (id) => {
    return http.get("/category/" + id);
  },
  updateCategory: (id, data) => {
    return http.put("/category/" + id, data);
  },
  deleteCategory: (id) => {
    return http.delete("/category/" + id);
  },
  getProduct: (id) => {
    return http.get("/product/" + id);
  },
  addProduct: (data) => {
    return http.post("/products", data);
  },
  deleteProduct: (id) => {
    return http.delete("/products/" + id);
  },
  updateProduct: (id, data) => {
    return http.put("/products/" + id, data);
  },
  getBanners: () => {
    return http.get("/banners");
  },
  getBannersAdmin: () => {
    return http.get("/bannersPage");
  },
  getBanner: (id) => {
    return http.get("/banner/" + id);
  },
  updateBanner: (id, data) => {
    return http.put("/banners/" + id, data);
  },
  deleteBanner: (id) => {
    return http.delete("/banners/" + id);
  },
  postBanner: (data) => {
    return http.post("/banner", data);
  },

  register: (data) => {
    return http.post("/users", data);
  },
  generatePass: () => {
    return http.get("/generatePass");
  },
  forgetPass: (data) => {
    return http.post("/users/forgot-password", data);
  },
  getUserByEmail: (email) => {
    return http.get("/user/" + email);
  },
  updatePass: (id, data) => {
    return http.put("/users/" + id + "/password", data);
  },

  //USER
  getUsers: (page, size) => {
    return http.get("/usersPage",{
      params: {
        page,
        size,
      }
    });
  },
  getUser: (id) => {
    return http.get("/users/" + id);
  },
  updateStatusUser: (id, data) => {
    return http.put("/user/" + id, data);
  },
  updateUser: (id, data) => {
    return http.put("/edituser/" + id, data);
  },
  //END

  //LOGIN
  login: (data) => {
    return http.post("/login", data);
  },

  addToCart: (data) => {
    return http.post("/carts", data);
  },

  getCartById: (id) => {
    return http.get("/carts/" + id);
  },
  updateQuantityProdCart: (id, quantity) => {
    return http.put("/carts/" + id + "?quantity=" + quantity);
  },

  removeProdInCart: (userId, idCart) => {
    return http.delete("/carts?userId=" + userId + "&id=" + idCart);
  },

  clearCart: (idUser) => {
    return http.delete("/allCarts?userId=" + idUser);
  },
  //USER
  changePass: (idUser, data) => {
    return http.put("/users/" + idUser + "/password", data);
  },
  //ORDER
  getOrder: (userId) => {
    return http.get("/orders/" + userId);
  },
  

  getRole: () => {
    return http.get("/roles");
  },
  addRole: (data) => {
    return http.post("/roles", data);
  },
  getRoleById: (id) => {
    return http.get("/roles/" + id);
  },
  deleteRoleById: (id) => {
    return http.delete("/roles/" + id);
  },
  updateRoleById: (id, data) => {
    return http.put("/roles/" + id, data);
  },

  getProductsList: (page, size) => {
    return http.get("/productsPage", {
      params: {
        page,
        size,
      },
    });
  },

  searchProductsByName: (name, page, size) =>
    http.get(`/searchProducts`, { params: { name, page, size } }),

  getCommentsProd: (productId, page, size) => {
    return http.get("/commentsByProduct", {
      params: {
        productId,
        page,
        size,
      },
    });
  },

  commentsProd: (data)=>{
    return http.post("/comments", data);
  },
  updateComment: (id, data)=>{
    return http.put("/comments/"+id, data);
  },
  searchCateByName: (name, page, size)=>{
    return http.get("/searchCate",{params:{name, page, size}})
  },

  fetchCategoryPagi: (page, size)=>{
    return http.get("/categoriesPage", {
      params: {
        page,
        size,
      }
    })
  },

  fetchProfile: (data)=>{
    return http.post("/profile", data);
  },
  checkout: (data)=>{
    return http.post("/carts/checkout", data);
  },

  searchBannerByName: (name, page, size)=>{
    return http.get("/searchBanner",{params:{name, page, size}})
  },
  searchUserByName: (name, page, size)=>{
    return http.get("/searchUsers",{params:{name, page, size}})
  },
  //ORDER FOR ADMIN
  getOrderForAdmin: () => {
    return http.get("/orders");
  },
  getDetailOrder: (orderId) => {
    return http.get("/order-details/" + orderId);
  },

};
