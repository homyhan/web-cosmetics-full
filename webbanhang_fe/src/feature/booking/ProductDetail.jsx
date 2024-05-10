
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/style.css";
import { useNavigate } from "react-router-dom";
import { getProduct } from "./thunk";
import { useParams } from 'react-router-dom';
import { fetchProducts, addToCart, fetchCartById } from "./thunk";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;
  const selectedPro = useSelector((state) => state.booking.selectedPro);
  const {user} = useSelector(state=>state.auth);
 // Lấy thông tin sản phẩm từ store

  useEffect(() => {
    dispatch(getProduct(productId)); // Dispatch action để lấy thông tin sản phẩm khi component được render
  }, [dispatch, productId]);

  // State để lưu trữ số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);

  // Hàm xử lý sự kiện khi nhấn nút tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm xử lý sự kiện khi nhấn nút giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
    const res = await dispatch(addToCart({userId, productId,}));
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
          <a className="navbar-brand">COSMETICS</a>
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
                <a className="nav-link">Home</a>
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

      <div className="product">
      <div className="container mt-4">
        <h2 className="title">Product Detail</h2>
        <div className="row">
          <div className="img col-md-6">
            <img
              src={selectedPro?.img}
              alt="Product"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2 className="namePro">{selectedPro.nameProd}</h2>
            <div className="rating mb-3">
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9734;</span>
            </div>
            <p className="price mb-3">{selectedPro.price} VNĐ</p>
            <p className="description mb-3">
              {selectedPro.description}
            </p>
            <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-minus"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
              </div>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-plus"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={()=>{handleAddToCart(selectedPro.id)}} className="btn btn-primary btn-lg">Add to Cart</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
