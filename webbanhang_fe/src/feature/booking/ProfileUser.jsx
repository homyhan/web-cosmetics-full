import React, { useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, fetchCartById, changePassword, fetchOrders } from "./thunk";
import { useNavigate } from "react-router-dom";
import { updateInforUser, updateStateOrder } from './thunk';
import { validationPass } from "../../services/validationPass";
import { validationInfor } from "../../services/validationInfor";
import Swal from "sweetalert2";

const ProfileUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.booking.products);
    const {user} = useSelector(state=>state.auth);
    const orders = useSelector((state) => state.booking.orders);
    const [quantityProdCart, setQuantityProdCart] = useState(0);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
    const [errors, setErrors] = useState({});
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const isLoggedIn = localStorage.getItem("emailCosmetics");
  
    useEffect(() => {
      dispatch(fetchProducts);
      getQuantityProdInCart();
      dispatch(fetchOrders(user.id)); // Gọi action fetchOrders khi component được render và user đăng nhập thành công
    }, [dispatch, user.id]);
  
  
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

    const handleViewPurchaseHistory = () => {
        setShowChangePassword(false);
        setEditProfile(false);
        setShowPurchaseHistory(true);
    };

    const handleEditProfileClick = () => {
        setShowChangePassword(false);
        setShowPurchaseHistory(false);
        setEditProfile(true);
    };

    const handleChangePasswordClick = () => {
        setShowChangePassword(true);
        setShowPurchaseHistory(false);
        setEditProfile(false);
    };

    //EDIT INFOR USER
    useEffect(() => {
      setFormData({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address
      });
  }, [user]);

  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      address: ""
  });
  //VALIDATION
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const newErrors = validationInfor(updatedFormData);
    setErrors(newErrors);
  };

  const handleSaveChanges = async () => {
    try {
      const newErrors = validationInfor(formData);
      if (Object.keys(newErrors).length !== 0) {
        setErrors(newErrors);
        return;
      }

      const newData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      const res = await dispatch(updateInforUser(user.id, newData));

      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thông tin đã được cập nhật",
          showConfirmButton: false,
          timer: 1500
        });

        setEditProfile(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đã xảy ra lỗi",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
//ChangePass
  const handleOldPasswordInputChange = (e) => {
    const oldPassword = e.target.value;
    // Kiểm tra và validate oldPassword
    const errors = validationPass({ password: oldPassword });
    setOldPasswordError(errors.password || "");
  };

  const handleNewPasswordInputChange = (e) => {
    const newPassword = e.target.value;
    // Kiểm tra và validate newPassword
    const errors = validationPass({ password: newPassword });
    setNewPasswordError(errors.password || "");
  };

  const handleConfirmPasswordInputChange = (e) => {
    const confirmPassword = e.target.value;
    // Kiểm tra và validate confirmPassword
    const errors = validationPass({ password: confirmPassword });
    setConfirmPasswordError(errors.password || "");
  };


  const handleSavePassword = async () => {
    try {
      const oldPassword = document.getElementById("oldPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const errors = validationPass({ password: newPassword });

      if (Object.keys(errors).length > 0) {
          Object.values(errors).forEach(error => {
              Swal.fire({
                  position: "center",
                  icon: "error",
                  title: error,
                  showConfirmButton: false,
                  timer: 1500
              });
          });
          return;
      }

      if (newPassword !== confirmPassword) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Mật khẩu mới không trùng khớp",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      const res = await dispatch(changePassword(user.id, { password: newPassword }));

      if (res) {
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Mật khẩu đã được thay đổi",
              showConfirmButton: false,
              timer: 1500
          });
          setShowChangePassword(false); 
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
          position: "center",
          icon: "error",
          title: "Đã xảy ra lỗi",
          showConfirmButton: false,
          timer: 1500
      });
   }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const data = { stateOrderId: 5 }; // Example: 2 represents the new state (e.g., approved)
      const result = await dispatch(updateStateOrder(orderId, data));
      if (result) {
        // Show success message if update is successful
        Swal.fire('Success', 'Order state updated successfully', 'success');
        dispatch(fetchOrders(user.id)); 
      } else {
        // Show error message if update fails
        Swal.fire('Error', 'Failed to update order state', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to update order state', 'error');
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
              
              {/* <li className="nav-item cta cta-colored tagLiIconUser"><a className="nav-link" onClick={handleLogout}><i class="fa-solid fa-power-off"></i></a></li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* BANNER  */}     

      {/* PRODUCT  */}
      <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src="https://th.bing.com/th/id/OIP.W7tcLavuptKze0rhsjRtoAAAAA?w=249&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Avatar" />
        </div>
        <div className="profile-actions">
          <a className="profile-action-link" onClick={handleChangePasswordClick}>Đổi mật khẩu</a>
          <a className="profile-action-link" onClick={handleViewPurchaseHistory}>Lịch sử mua hàng</a>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-header">
          <h2>Hồ Sơ Của Tôi</h2>
          <button className="btn btn-primary" onClick={handleEditProfileClick} >Sửa Hồ Sơ</button>
        </div>
        {showChangePassword ? (
            <div className="profile-info">
            <div className="profile-section">
              <label>Mật khẩu cũ:</label>
              <input id="oldPassword" type="password" onChange={handleOldPasswordInputChange} />
              <span className="text-danger">{oldPasswordError}</span>
            </div>

            <div className="profile-section">
              <label>Mật khẩu mới:</label>
              <input id="newPassword" type="password" onChange={handleNewPasswordInputChange} />
              <span className="text-danger">{newPasswordError}</span>
            </div>

            <div className="profile-section">
              <label>Nhập lại mật khẩu mới:</label>
              <input id="confirmPassword" type="password" onChange={handleConfirmPasswordInputChange} />
              <span className="text-danger">{confirmPasswordError}</span>
            </div>
            <button className="btn btn-primary" onClick={handleSavePassword}>Lưu mật khẩu</button>
          </div>
        ) : editProfile ? (
            <div className="profile-info">
            <div className="profile-section">
              <label>Tên người dùng:</label>
              <input 
              className="input-profile" 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              />
              <span className={`text-danger ${errors.fullName ? 'is-invalid' : ''}`}>{errors.fullName}</span>
            </div>

            <div className="profile-section">
              <label>Email:</label>
              <input 
              className="input-profile" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              />
              <span className={`text-danger ${errors.email ? 'is-invalid' : ''}`}>{errors.email}</span>
            </div>

            <div className="profile-section">
              <label>Số điện thoại:</label>
              <input 
              className="input-profile" 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              />
             <span className={`text-danger ${errors.phone ? 'is-invalid' : ''}`}>{errors.phone}</span>
            </div>

            <div className="profile-section">
              <label>Địa chỉ:</label>
              <input 
              className="input-profile" 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              />
              <span className={`text-danger ${errors.address ? 'is-invalid' : ''}`}>{errors.address}</span>
            </div>
            <div className="edit-infor">
              <button className="btn btn-primary" onClick={handleSaveChanges} >Lưu thay đổi</button>
            </div>
            
          </div>
        ) : showPurchaseHistory ? (
            <div className="profile-info">
              <h2 className="order">Đơn hàng</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.user.fullName}</td>
                    <td>{order.user.email}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.address}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.stateOrder.state_name}</td>
                    <td className="action-buttons">
                        <button className="eye-button" onClick={()=>{navigate("/user/detail-order/"+order?.id)}}>
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        {order.stateOrder.state === 1 && (
                          <button className="delete-button" onClick={() => handleCancelOrder(order.id)}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>
          </div>
        ) : (
            <div className="profile-info">
            <div className="profile-section">
              <label>Tên người dùng:</label>
              <span>{user.fullName}</span>
            </div>

            <div className="profile-section">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>

            <div className="profile-section">
              <label>Số điện thoại:</label>
              <span>{user.phone}</span>
            </div>

            <div className="profile-section">
              <label>Địa chỉ:</label>
              <span>{user.address}</span>
            </div>
          </div>
        )}
      </div>
    </div>

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

export default ProfileUser;
