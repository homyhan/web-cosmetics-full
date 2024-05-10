import React, { useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, fetchCartById } from "./thunk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.booking.products);
  const {user} = useSelector(state=>state.auth);
  const [quantityProdCart, setQuantityProdCart] = useState(0);
  useEffect(() => {
    dispatch(fetchProducts);
    getQuantityProdInCart();
  }, [dispatch]);


  const getQuantityProdInCart = async () => {
    const idUser = user?.id;
    if (idUser) {
      const res = await dispatch(fetchCartById(idUser));   
      setQuantityProdCart(res?.data?.length);
    }
  };

  const handleAddToCart=async(id)=>{
    const userId = user?.id;
    if(userId){
      const productId = id;
    const res = await dispatch(addToCart({userId, productId, quantity: 1}));
    getQuantityProdInCart();
    if(res.status=="200"){
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data,
        showConfirmButton: false,
        timer: 1500
    });
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.data,
        showConfirmButton: false,
        timer: 1500
    });
    }
    }else{
      navigate("/login")
    }
    
  }

  const handleToCartPage=async()=>{
    navigate("/cart");
  }

  return (
    <div>
      <div className="py-1 bg-primary">
        <div className="container">
          <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
            <div className="col-lg-12 d-block">
              <div className="row d-flex">
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-phone2" />
                  </div>
                  <span className="text">+ 1235 2355 98</span>
                </div>
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-paper-plane" />
                  </div>
                  <span className="text">youremail@email.com</span>
                </div>
                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                  <span className="text">
                    3-5 Business days delivery &amp; Free Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
        <a className="navbar-brand" style={{cursor:'pointer'}} onClick={() => {
                    navigate("/");
                  }}>
              COSMETICS
            </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" style={{cursor:'pointer'}} onClick={()=>{navigate("/")}}>Home</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="dropdown04"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                  <a className="dropdown-item">Shop</a>
                  <a className="dropdown-item">Wishlist</a>
                  <a className="dropdown-item">Single Product</a>
                  <a className="dropdown-item">Cart</a>
                  <a className="dropdown-item">Checkout</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Contact</a>
              </li>
              <li className="nav-item cta cta-colored">
                <a
                  style={{cursor:'pointer'}}
                onClick={() => {
                    handleToCartPage();
                  }} className="nav-link">
                  <i className="fa-solid fa-cart-shopping" />
                  [{quantityProdCart}]
                </a>
              </li>
              <li className="nav-item cta cta-colored tagLiIconUser">
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* BANNER  */}     

      {/* PRODUCT  */}
      <section className="sectionProduct py-5">
        <h2 className="text-center">OUR PRODUCT</h2>
        <div className="listProductHome">
          {products?.map((item, key) => {
            return (
              <div key={item?.id} className="item">
                <img src={item?.img} onClick={()=>{navigate("/product-detail/"+item?.id)}} alt="" />
                <h1>{item?.nameProd}</h1>
                <p className="price">{item?.price}</p>
                <button onClick={()=>{handleAddToCart(item?.id)}}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
