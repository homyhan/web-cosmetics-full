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

const Contact = () => {
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
      {/* HÃY THỰC HIỆN CODE TRANG CONTACT Ở ĐÂY */}
<section className="ftco-section contact-section">
  <div className="container">
    <div className="row block-9">
      <div className="col-md-6 order-md-last d-flex">
        <form className="bg-light p-5 contact-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên của bạn"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Chủ đề"
            />
          </div>
          <div className="form-group">
            <textarea
              name=""
              id=""
              cols="30"
              rows="7"
              className="form-control"
              placeholder="Nội dung"
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Gửi"
              className="btn btn-primary py-3 px-5"
            />
          </div>
        </form>
      </div>

      <div className="col-md-6 d-flex">
        <div className="info bg-white p-4">
          <h2 className="mb-4">Thông tin liên hệ</h2>
          <p>
            Địa chỉ: Khu phố 6, Linh Trung, Thủ Đức, TP.HCM
          </p>
          <p>
            Số điện thoại: <a href="tel:+23923929210">0384968576</a>
          </p>
          <p>
            Email: <a href="mailto:info@yourdomain.com">COSMETICSVN@GMAIL.COM</a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.214594705107!2d106.78918677485836!3d10.871276389283283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1719045474113!5m2!1svi!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
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

export default Contact;
