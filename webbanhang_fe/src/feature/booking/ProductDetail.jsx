import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/style.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  commentsProd,
  fetchCommentsProd,
  getProduct,
  updateCommentsProd,
} from "./thunk";
import { useParams } from "react-router-dom";
import { fetchProducts, addToCart, fetchCartById } from "./thunk";
import Swal from "sweetalert2";
import { Pagination } from "antd";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;
  const [searchParam, setSearchParam] = useSearchParams();
  const selectedPro = useSelector((state) => state.booking.selectedPro);
  const { comments } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn =
    localStorage.getItem("emailCosmetics");

  useEffect(() => {
    const page = searchParam.get("page")
      ? parseInt(searchParam.get("page"), 10)
      : 1;
    dispatch(getProduct(productId));
    dispatch(fetchCommentsProd(productId, page - 1, 8));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, productId, searchParam]);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [contentComment, setContentComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [idCmt, setIdCmt] = useState(0);
  const [updateButtonText, setUpdateButtonText] = useState("Comment");

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

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

  const handleAddToCart = async (id) => {
    const userId = user?.id;
    if (userId) {
      const productId = id;
      const res = await dispatch(addToCart({ userId, productId, quantity }));
      getQuantityProdInCart();
      if (res.status == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      navigate("/login");
    }
  };

  const handleToCartPage = async () => {
    navigate("/cart");
  };
  const handleLogout = () => {
    localStorage.removeItem("emailCosmetics");
    localStorage.removeItem("passcosmetics");
    navigate("/login");
  };

  const handleStarClick = (index) => {
    setRating(index);
    setEditRating(index);
  };
  const handleChangeContent = (evt) => {
    setContentComment(evt.target.value);
    setEditComment(evt.target.value);
  };

  const handleSubmitComment = async () => {
    const userId = user?.id;
    const dateTime = new Date().toISOString();

    // if (editButtonClicked) {
    //   const updatedComment = {
    //     ...editComment,
    //     contentComment: editComment,
    //     quantityStart: editRating,
    //   };
    //   setEditButtonClicked(true);
    //   await dispatch(updateCommentsProd(idCmt, updatedComment));
    //   const page = searchParam.get("page")
    //     ? parseInt(searchParam.get("page"), 10)
    //     : 1;
    //   await dispatch(fetchCommentsProd(productId, page - 1, 8));
    //   setEditRating(0);
    //   setEditComment('');
    //   setRating(0);
    // setContentComment("");
    // setUpdateButtonText("Comment");
    // } else {
    const data = {
      userId,
      productId,
      contentComment,
      quantityStart: rating,
      dateTime,
    };
    try {
      const res = await dispatch(commentsProd(data));
      console.log("handleSubmitComment response:", res);
      if (res?.status == 500) {
        return Swal.fire({
          icon: "error",
          text: res?.data,
        });
        
      }
      const page = searchParam.get("page")
          ? parseInt(searchParam.get("page"), 10)
          : 1;
        await dispatch(fetchCommentsProd(productId, page - 1, 8));

        setRating(0);
        setContentComment("");
        setEditRating(0);
        setEditComment("");
    } catch (error) {
      console.log("handleSubmitComment error:", error);
    }
    // if(res?.status==500){
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: res?.data,
    //     timer: 1500,
    //     showConfirmButton:false
    //   });
    // }
    // const page = searchParam.get("page")
    //   ? parseInt(searchParam.get("page"), 10)
    //   : 1;
    // await dispatch(fetchCommentsProd(productId, page - 1, 8));

    // setRating(0);
    // setContentComment("");
    // setEditRating(0);
    // setEditComment('');
    // setEditButtonClicked(false);
    // }
  };

  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const handleEdit = (comment) => {
    setEditComment(comment.contentComment);
    setEditRating(comment.quantityStart);
    setIdCmt(comment?.id);
    setEditButtonClicked(true);
    setUpdateButtonText("Update");
  };

  const commentsRef = useRef(null);

  useEffect(() => {
    if (editButtonClicked && commentsRef.current) {
      const yOffset = commentsRef.current.offsetTop;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  }, [editButtonClicked]);

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
            className="navbar-brand"
            style={{ cursor: "pointer" }}
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
                    handleToCartPage();
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-cart-shopping" />[{quantityProdCart}
                  ]
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

      <div className="product">
        <div className="container mt-4">
          <h2 className="title">Chi tiết sản phẩm</h2>
          <div className="row">
            <div className="img col-md-6">
              <img src={selectedPro?.img} alt="Product" className="img-fluid" />
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
              <p
                className="description mb-3"
                dangerouslySetInnerHTML={{ __html: selectedPro?.description }}
              >
                {/* {selectedPro.description} */}
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
                  readOnly
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
              <button
                onClick={() => {
                  handleAddToCart(selectedPro.id);
                }}
                className="btn btn-primary btn-lg"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={commentsRef} className="page-width container pt-3">
        <div>
          <h3>Bình luận</h3>
          <hr />
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Hãy để lại bình luận.</h5>
              <hr />
              <div className="form-group">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <i
                    key={index}
                    className={
                      index < rating ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                    onClick={() => handleStarClick(index + 1)}
                  ></i>
                ))}
                <textarea
                  rows={3}
                  className="form-control bg-light"
                  placeholder="Nhập bình luận"
                  style={{ resize: "none" }}
                  defaultValue={contentComment || editComment || ""}
                  onChange={handleChangeContent}
                />
              </div>
              <button
                className="btn btn-block btnCmt"
                onClick={() => {
                  handleSubmitComment();
                }}
              >
                {updateButtonText}
              </button>
            </div>
          </div>
          {comments?.content &&
            [...comments.content].reverse().map((item, key) => {
              const stars = [];
              for (let i = 0; i < 5; i++) {
                if (i < item?.quantityStart) {
                  stars.push(
                    <i
                      key={i}
                      style={{ color: "#82ae46" }}
                      className="fa-solid fa-star"
                    ></i>
                  );
                } else {
                  stars.push(<i key={i} className="fa-regular fa-star"></i>);
                }
              }
              return (
                <div key={key} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{item?.user?.fullName}</h5>
                    <p className="card-text">{item?.contentComment}</p>
                    <hr />
                    <ul className="card-text list-inline">
                      <li className="list-inline-item">
                        {stars} - {item?.dateTime?.replace("T", " ")}
                      </li>
                      {item?.user?.id == user?.id ? (
                        <li
                          id="editButton"
                          onClick={() => {
                            handleEdit(item);
                          }}
                          style={{ cursor: "pointer" }}
                          className="list-inline-item"
                        >
                          Chỉnh sửa
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>

        {comments?.totalElements > 8 ? (
          <Pagination
            className="text-center my-4"
            current={
              searchParam.get("page")
                ? parseInt(searchParam.get("page"), 10)
                : 1
            }
            pageSize={8}
            total={comments?.totalElements}
            onChange={(page) => {
              setSearchParam({ page: page.toString() });
            }}
          />
        ) : (
          ""
        )}
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

export default ProductDetail;
