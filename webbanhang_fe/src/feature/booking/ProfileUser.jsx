import React, { useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, fetchCartById } from "./thunk";
import { useNavigate } from "react-router-dom";
import { updateInforUser } from './thunk';
import Swal from "sweetalert2";

const ProfileUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.booking.products);
    const {user} = useSelector(state=>state.auth);
    const [quantityProdCart, setQuantityProdCart] = useState(0);
    const [showChangePassword, setShowChangePassword] = useState(false); // State để xác định xem có hiển thị giao diện đổi mật khẩu hay không
  
    const [editProfile, setEditProfile] = useState(false);
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);

    const isLoggedIn = localStorage.getItem("emailCosmetics") && localStorage.getItem("passcosmetics");
  
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
  
    // const handleAddToCart=async(id)=>{
    //   const userId = user?.id;
    //   if(userId){
    //     const productId = id;
    //   const res = await dispatch(addToCart({userId, productId, quantity: 1}));
    //   getQuantityProdInCart();
    //   if(res.status=="200"){
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: res.data,
    //       showConfirmButton: false,
    //       timer: 1500
    //   });
    //   }else{
    //     Swal.fire({
    //       position: "center",
    //       icon: "error",
    //       title: res.data,
    //       showConfirmButton: false,
    //       timer: 1500
    //   });
    //   }
    //   }else{
    //     navigate("/login")
    //   }
      
    // }
  
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

    const handleSavePassword = () => {
      // Viết logic để lưu mật khẩu mới ở đây
      // Sau khi lưu, bạn có thể đặt lại trạng thái `showChangePassword` thành `false`
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
  
  // Định nghĩa trạng thái mới cho dữ liệu của các trường nhập liệu
  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      address: ""
  });
  
  // Xử lý sự kiện onChange để cập nhật trạng thái của các trường nhập liệu
  // Trong hàm handleInputChange
const handleInputChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
};

// Trong hàm handleSaveChanges
const handleSaveChanges = async () => {
  try {
      // Thu thập thông tin mới từ trạng thái formData
      const newData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
      };

      // Gọi action hoặc hàm dispatch để cập nhật thông tin người dùng
      const res = await dispatch(updateInforUser(user.id, newData));

      // Xử lý kết quả trả về từ action hoặc yêu cầu server
      if (res) {
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Thông tin đã được cập nhật",
              showConfirmButton: false,
              timer: 1500
          });
          // Cập nhật trạng thái của component
          setEditProfile(false); // Đóng chế độ chỉnh sửa sau khi cập nhật thành công
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
                  <span className="text">{isLoggedIn ? user.email : "youremail@email.com"}</span>
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
                    navigate("/");
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-user"></i>
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
              <input type="password" />
            </div>

            <div className="profile-section">
              <label>Mật khẩu mới:</label>
              <input type="password" />
            </div>

            <div className="profile-section">
              <label>Nhập lại mật khẩu mới:</label>
              <input type="password" />
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Nguyễn Văn Dẫn</td>
                        <td>nvd@gmail.com</td>
                        <td>0358896525</td>
                        <td>Bến Tre</td>
                        <td>850000</td>
                        <td>Đang chờ xác nhận</td>
                    </tr>
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

    </div>
  );
};

export default ProfileUser;
