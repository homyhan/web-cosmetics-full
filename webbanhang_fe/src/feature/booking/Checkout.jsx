import React, { useCallback, useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, fetchCartById, fetchCategories, fetBanners, fetchProdsByName } from "./thunk";

import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import _ from 'lodash';
import { checkout } from "./thunk";


const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {products, listCategory} = useSelector((state) => state.booking);
    const {user} = useSelector(state=>state.auth);
    const [searchParam, setSearchParam] = useSearchParams();
    const [quantityProdCart, setQuantityProdCart] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const isLoggedIn = localStorage.getItem("emailCosmetics");
    const [payOnDeliveryChecked, setPayOnDeliveryChecked] = useState(false);
    useEffect(() => {
      const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
      dispatch(fetchProducts(page-1, 8));
      dispatch(fetchCategories)
      dispatch(fetBanners);
      // dispatch(fetchProducts);
      getQuantityProdInCart();
    }, [dispatch, searchParam]);
  
  
    useEffect(() => {
        const getCartItems = async () => {
          const userId = user?.id;
          if (userId) {
            const res = await dispatch(fetchCartById(userId));
            setCartItems(res?.data || []);
          }
        };
        getCartItems();
      }, [dispatch, user]);

      const sumTotalPay = () => {
        return cartItems?.reduce((prev, item) => {
          if (item?.product && item?.quantity) {
            return prev + item.product.price * item.quantity;
          }
          return prev;
        }, 0);
      };

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
  
    const onChange = (key) => {
      console.log(key);
    };  
  
    const debouncedSearch = useCallback(
      _.debounce((term) => {
        dispatch(fetchProdsByName(term, 0, 8));
      }, 500), // 500ms debounce time
      [dispatch]
    );
  
    const handleChange = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    };
  
    const formatCurrencyVND = (number) => {
      var formattedAmount = number?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      formattedAmount = formattedAmount?.replace("₫", "");
      return formattedAmount;
    };
    const handleCheckout = async (event) => {
        event.preventDefault();
      
        try {
          // Tạo đối tượng checkoutRequest từ dữ liệu trong form
          const checkoutRequest = {
            userId: user.id,
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value,
            statusCheckout: document.getElementById("payOnDelivery").checked ? 0 : 1,
          };
      
          // Gọi action checkout với đối số là checkoutRequest
          await dispatch(checkout(checkoutRequest));
      
          // Hiển thị thông báo thành công
          Swal.fire({
            icon: 'success',
            title: 'Đã thanh toán thành công!',
            showConfirmButton: false,
            timer: 1500
          });
      
          // Chuyển hướng về trang chủ sau khi thanh toán thành công
          navigate("/");
        } catch (error) {
          console.log(error);
          // Hiển thị thông báo lỗi nếu có lỗi xảy ra trong quá trình thanh toán
          Swal.fire({
            icon: 'error',
            title: 'Có lỗi xảy ra khi thanh toán',
            text: 'Vui lòng thử lại sau!',
          });
        }
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
        {/* HÃY VIẾT TRANG THANH TOÁN CHO NGƯỜI DÙNG Ở ĐÂY */}
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h4>Your Cart</h4>
            <ul className="list-group mb-3">
            {/* {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <img src={item.product.img} alt={item.product.nameProd} />
              <div>
                <h3>{item.product.nameProd}</h3>
                <p>Price: {formatCurrencyVND(item.product.price)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {formatCurrencyVND(item.product.price * item.quantity)}</p>
              </div>
            </div>
          </li>
        ))} */}
        {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                <div className="d-flex">
                  <img src={item.product.img} alt={item.product.nameProd} className="img-thumbnail mr-2" />
                  <div>
                    <h6 className="my-0">{item.product.nameProd}</h6>
                    <small className="text-muted">{item.quantity}</small>
                  </div>
                </div>
                <span className="text-muted">{formatCurrencyVND(item.product.price * item.quantity)}</span>
              </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Tổng tiền</span>
                <strong>{formatCurrencyVND(sumTotalPay())}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h4>Checkout</h4>
            <form onSubmit={handleCheckout}>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="123-456-7890"
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="payOnDelivery"
                />
                <label className="form-check-label" htmlFor="payOnDelivery">
                  Thanh toán trực tiếp
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Thanh toán
              </button>
            </form>
          </div>
        </div>
      </div>
      <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
  <div className="container py-4">
    <div className="row d-flex justify-content-center py-5">
      <div className="col-md-6">
        <h2 style={{fontSize: 22}} className="mb-0">Subcribe to our Newsletter</h2>
        <span>Get e-mail updates about our latest shops and special offers</span>
      </div>
      <div className="col-md-6 d-flex align-items-center">
        <form action="#" className="subscribe-form">
          <div className="form-group d-flex">
            <input type="text" className="form-control" placeholder="Enter email address" />
            <input type="submit" defaultValue="Subscribe" className="submit px-3" />
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

     <footer className="ftco-footer ftco-section">
  <div className="container">
    <div className="row">
      <div className="mouse">
        <a href="#" className="mouse-icon">
          <div className="mouse-wheel"><i className="fa-solid fa-chevron-up"></i></div>
        </a>
      </div>
    </div>
    <div className="row mb-5">
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Vegefoods</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
          <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
            <li className="ftco-animate"><a href="#"><span className="icon-twitter" /></a></li>
            <li className="ftco-animate"><a href="#"><span className="icon-facebook" /></a></li>
            <li className="ftco-animate"><a href="#"><span className="icon-instagram" /></a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4 ml-md-5">
          <h2 className="ftco-heading-2">Menu</h2>
          <ul className="list-unstyled">
            <li><a href="#" className="py-2 d-block">Shop</a></li>
            <li><a href="#" className="py-2 d-block">About</a></li>
            <li><a href="#" className="py-2 d-block">Journal</a></li>
            <li><a href="#" className="py-2 d-block">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md-4">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Help</h2>
          <div className="d-flex">
            <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
              <li><a href="#" className="py-2 d-block">Shipping Information</a></li>
              <li><a href="#" className="py-2 d-block">Returns &amp; Exchange</a></li>
              <li><a href="#" className="py-2 d-block">Terms &amp; Conditions</a></li>
              <li><a href="#" className="py-2 d-block">Privacy Policy</a></li>
            </ul>
            <ul className="list-unstyled">
              <li><a href="#" className="py-2 d-block">FAQs</a></li>
              <li><a href="#" className="py-2 d-block">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Have a Questions?</h2>
          <div className="block-23 mb-3">
            <ul>
              <li><span className="icon icon-map-marker" /><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
              <li><a href="#"><span className="icon icon-phone" /><span className="text">+2 392 3929 210</span></a></li>
              <li><a href="#"><span className="icon icon-envelope" /><span className="text">info@yourdomain.com</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center">
        <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          Copyright © All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </p>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Checkout;
