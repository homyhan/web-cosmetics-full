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
  const isLoggedIn = localStorage.getItem("emailCosmetics");

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
                  <span className="text">0384968576</span>
                </div>
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-paper-plane" />
                  </div>
                  <span className="text">cosmeticsvn@gmail.com</span>
                </div>
                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                  <span className="text">
                    Giao hàng từ 3 đến 5 ngày &amp; Đổi/Trả hàng miễn phí
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
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Liên hệ
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
                      <span className="text-email">
                        {isLoggedIn ? user.email : null}
                      </span>
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
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="nav-link"
                  >
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
        <div className="container"><br></br>
          <h2 className="title-checkout">Giỏ hàng</h2>
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
                          Xóa tất cả
                        </span>}
                        
                      </th>
                      <th></th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
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
            <div >
              <h3 className="row justify-content-end my-3">
                Tổng thanh toán: {formatCurrencyVND(sumTotalPay())} vnd
              </h3>
              <div>
                <a
                  onClick={() => {
                    navigate("/user/checkout/" + user?.id);
                  }}
                  className="nav-link"
                ><button className="btn btn-primary btn-block">Thanh toán</button></a><br></br>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
  <div className="container py-4">
    <div className="row d-flex justify-content-center py-5">
      <div className="col-md-6">
        <h2 style={{fontSize: 22}} className="mb-0">Đăng ký nhận bản tin của chúng tôi</h2>
        <span>Nhận cập nhật qua email về các cửa hàng mới nhất và các ưu đãi đặc biệt của chúng tôi</span>
      </div>
      <div className="col-md-6 d-flex align-items-center">
        <form action="#" className="subscribe-form">
          <div className="form-group d-flex">
            <input type="text" className="form-control" placeholder="Nhập địa chỉ email" />
            <input type="submit" value="Đăng ký" className="submit px-3" />
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
                <div className="mouse-wheel">
                  <i className="fa-solid fa-chevron-up"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Cosmetics</h2>
                <p>
                COSMETICS cam kết mang đến cho bạn những sản phẩm chăm sóc da và làm đẹp tốt nhất. Sứ mệnh của chúng tôi là nâng cao vẻ đẹp tự nhiên của bạn và tăng cường sự tự tin với những sản phẩm mỹ phẩm cao cấp, hiệu quả và an toàn.
                </p>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 ml-md-5">
                <h2 className="ftco-heading-2">Menu</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="py-2 d-block">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Journal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Help</h2>
                <div className="d-flex">
                  <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                    <li>
                      <a href="#" className="py-2 d-block">
                        Shipping Information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Returns &amp; Exchange
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-2 d-block">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Bạn muốn biết thêm thông tin vui lòng liên hệ!</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker" />
                      <span className="text">
                        Khu phố 6, Linh Trung, Thủ Đức, TP.HCM
                      </span>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-phone" />
                        <span className="text">0384968576</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-envelope" />
                        <span className="text">COSMETICSVN@GMAIL.COM</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart color-danger" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
