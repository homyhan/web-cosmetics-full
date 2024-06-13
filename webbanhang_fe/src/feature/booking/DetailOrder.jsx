import React, { useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCartById, fetchOrders, fetchDetailOrder } from "./thunk";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const DetailOrder = () => {
    const navigate = useNavigate();
    const params = useParams();
    const idOrder = params?.id;
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const details = useSelector((state) => state.booking.details);
    const [quantityProdCart, setQuantityProdCart] = useState(0);

    const isLoggedIn = localStorage.getItem("emailCosmetics") && localStorage.getItem("passcosmetics");
  
    useEffect(() => {
      dispatch(fetchProducts);
      getQuantityProdInCart();
      dispatch(fetchOrders(user.id)); 
    }, [dispatch, user.id]);
  
    useEffect(() => {
        dispatch(fetchDetailOrder(idOrder));
      }, [dispatch, idOrder]);

    const getQuantityProdInCart = async () => {
      const idUser = user?.id;
      if (idUser) {
        const res = await dispatch(fetchCartById(idUser));   
        setQuantityProdCart(res?.data?.length);
      }
    };
  
    const handleToCartPage=async()=>{
      navigate("/cart");
    }
    
    const handleLogout = () => {
        localStorage.removeItem("emailCosmetics");
        localStorage.removeItem("passcosmetics");
        navigate('/login');
    };

    
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
                  <span className="text">cosmeticsvn@gmail.com</span>
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
              {isLoggedIn ? (
                <>
                  <li className="nav-item cta cta-colored tagLiIconUser">
                <a
                  onClick={() => {
                    navigate("/user/profile");
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-user"></i>
                  <span className="text-email">{isLoggedIn ? user.email : null}</span>
                </a>
              </li>
                  <li className="nav-item cta cta-colored tagLiIconUser">
                    <a className="nav-link" onClick={handleLogout}>
                      <i className="fa-solid fa-power-off"></i>
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item cta cta-colored tagLiIconUser">
                  <a onClick={() => { navigate("/login"); }} className="nav-link">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* BANNER  */}     

      {/* PRODUCT  */}
      <div className="profile-container">
      <div className="profile-main">
        <h2>Chi tiết đơn hàng</h2>
        <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID đơn hàng</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Giá sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                {details.map((detail, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{detail.orders?.id}</td>
              <td>{detail.product.nameProd}</td>
              <td>
                <img src={detail.product.img} alt={detail.product.nameProd} width={100} />
              </td>
              <td>{detail.price}</td>
              <td>{detail.quantity}</td>
              <td>{detail.orders.totalPrice}</td>
            </tr>
          ))}
            
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={()=>{navigate("/user/profile")}}>Quay lại</button>
      </div>
    </div>

    </div>
  );
};

export default DetailOrder;
