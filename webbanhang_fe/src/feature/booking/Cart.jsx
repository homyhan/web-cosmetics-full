import React, { useEffect, useReducer, useState } from "react";
import "../../components/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityProdCart,
  clearCart,
  fetchCartById,
  removeProdInCart,
} from "./thunk";
import Swal from "sweetalert2";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [listItemProd, setListItemProd] = useState([]);
  const isLoggedIn = localStorage.getItem("emailCosmetics") && localStorage.getItem("passcosmetics");

  const formatCurrencyVND = (number) => {
    var formattedAmount = number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    formattedAmount = formattedAmount?.replace("₫", "");
    return formattedAmount;
  };

  const getListProdInCart = async () => {
    const idUser = user?.id;
    if (idUser) {
      const res = await dispatch(fetchCartById(idUser));
      setListItemProd([...res?.data]);
    }
  };

  useEffect(() => {
    getListProdInCart();
  }, [user]);

  const changeQuantity = async (type, item) => {
    const idUser = user?.id;
    if (type == "decrease") {
      if (item?.quantity > 1) {
        await dispatch(changeQuantityProdCart(item?.id, item?.quantity - 1));
      } else {
        await dispatch(removeProdInCart(idUser, item?.id));
      }
    } else {
      await dispatch(changeQuantityProdCart(item?.id, item?.quantity + 1));
    }
    getListProdInCart();
  };

  const sumTotalPay = () => {
    return listItemProd?.reduce((prev, item) => {
      if (item?.product && item?.quantity) {
        return prev + item.product.price * item.quantity;
      }
      return prev;
    }, 0);
  };

  const handleRemoveProdInCart = async (id) => {
    const idUser = user?.id;
    Swal.fire({
      title: "Remove it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(removeProdInCart(idUser, id));
        Swal.fire({
          title: res?.data,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        getListProdInCart();
      }
    });
  };

  const handleClearCart = ()=>{
    const userId = user?.id;
    Swal.fire({
      title: "Clear all?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await dispatch(clearCart(userId));
        Swal.fire({
          title: res?.data,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        getListProdInCart();
      }
    });
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
          <a
            style={{ cursor: "pointer" }}
            className="navbar-brand"
            onClick={() => {
              navigate("/");
            }}
          >
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
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                  className="nav-link"
                >
                  Home
                </a>
              </li>
              <li className="nav-item active dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown04"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                  <a className="dropdown-item" href="shop.html">
                    Shop
                  </a>
                  <a className="dropdown-item" href="wishlist.html">
                    Wishlist
                  </a>
                  <a className="dropdown-item" href="product-single.html">
                    Single Product
                  </a>
                  <a className="dropdown-item" href="cart.html">
                    Cart
                  </a>
                  <a className="dropdown-item" href="checkout.html">
                    Checkout
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a href="about.html" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="blog.html" className="nav-link">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="contact.html" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item cta cta-colored">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-cart-shopping" />[
                  {listItemProd?.length}]
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
      {/* END nav */}
      <section className=" ftco-cart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="cart-list">
                <table className="table">
                  <thead className="thead-primary">
                    <tr className="text-center">
                      <th>
                        {listItemProd?.length==0?'': <span
                          onClick={()=>{handleClearCart()}}
                          style={{
                            padding: "5px 20px",
                            border: "1px solid white",
                            cursor: "pointer",
                          }}
                        >
                          Clear All
                        </span>}
                        
                      </th>
                      <th></th>
                      <th>Product name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItemProd?.length == 0 ? (
                      <tr
                        style={{ textAlign: "center", width: "100%" }}
                        className="my-3"
                      >
                        <td
                          style={{ textAlign: "center !important" }}
                          colSpan="6"
                          className="titleProdInCart"
                        >
                          Chưa có sản phẩm nào trong giỏ hàng
                        </td>
                      </tr>
                    ) : (
                      listItemProd?.map((item, key) => {
                        return (
                          <tr key={key} className="text-center">
                            <td className="product-remove">
                              <a
                                onClick={() => {
                                  handleRemoveProdInCart(item?.id);
                                }}
                              >
                                <i className="fa-solid fa-minus"></i>
                              </a>
                            </td>
                            <td className="image-prod">
                              <div
                                className="img"
                                style={{
                                  backgroundImage: `url(${item?.product?.img})`,
                                }}
                              />
                            </td>
                            <td className="product-name">
                              <h3>{item?.product?.nameProd}</h3>
                            </td>
                            <td className="price">
                              {formatCurrencyVND(item?.product?.price)} vnd
                            </td>
                            <td className="quantity">
                              <div
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                className="input-group mb-3 d-flex"
                              >
                                <button
                                  onClick={() => {
                                    changeQuantity("decrease", item);
                                  }}
                                  style={{ padding: "8px 20px" }}
                                >
                                  -
                                </button>
                                <span style={{ margin: "0 10px" }}>
                                  {item?.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    changeQuantity("increase", item);
                                  }}
                                  style={{ padding: "8px 20px" }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="total">
                              {formatCurrencyVND(
                                item?.product?.price * item?.quantity
                              )}{" "}
                              vnd
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {listItemProd?.length == 0 ? (
            ""
          ) : (
            <div className="row justify-content-end">
              <h3 className="my-3">
                Tổng thanh toán: {formatCurrencyVND(sumTotalPay())} vnd
              </h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
