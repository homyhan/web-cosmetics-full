import React, { useCallback, useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addToCart,
  fetchCartById,
  fetchCategories,
  fetBanners,
  fetchProdsByName,
} from "./thunk";

import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import _ from "lodash";
import { Pagination, Tabs } from "antd";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, listCategory } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const [searchParam, setSearchParam] = useSearchParams();
  const [quantityProdCart, setQuantityProdCart] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = localStorage.getItem("emailCosmetics");

  const banners = useSelector((state) => state.booking.banners);

  useEffect(() => {
    const page = searchParam.get("page")
      ? parseInt(searchParam.get("page"), 10)
      : 1;
    dispatch(fetchProducts(page - 1, 8));
    dispatch(fetchCategories);
    dispatch(fetBanners);
    // dispatch(fetchProducts);
    getQuantityProdInCart();
  }, [dispatch, searchParam]);

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
      const res = await dispatch(addToCart({ userId, productId, quantity: 1 }));
      getQuantityProdInCart();
      if (res?.status == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res?.data,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res?.data,
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

  const onChange = (key) => {
    console.log(key);
  };

  // const handleInputChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };
  // const handleSearch = () => {
  //   dispatch(fetchProdsByName(searchTerm, 0, 10)); // Bắt đầu từ trang 0 và kích thước trang là 10
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

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

  let renderTabCate = () => {
    return listCategory?.map((item) => {
      return {
        label: item?.nameCategory,
        key: item?.id,
        children: (
          <>
            {item?.product?.length == 0 ? (
              <p style={{ padding: "12px", backgroundColor: "#82ae4663" }}>
                Sản phẩm sẽ sớm được cập nhật
              </p>
            ) : (
              <div className="listProductHome3">
                {item?.product?.map((item, key) => {
                  return (
                    <div key={item?.id} className="item">
                      <img
                        src={item?.img}
                        onClick={() => {
                          navigate("/product-detail/" + item?.id);
                        }}
                        alt=""
                      />
                      <h1>{item?.nameProd}</h1>
                      <p className="price">
                        {formatCurrencyVND(item?.price)} vnd
                      </p>
                      <button
                        onClick={() => {
                          handleAddToCart(item?.id);
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* {item?.listItemProduct?.length == 0 ? (
              <p
                style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                className="p-4 rounded-lg text-center"
              >
                Danh mục sản phẩm trống
              </p>
            ) : (
              <>
                <div className={`${styles.listItem } grid grid-cols-4 bg-white`}>
                  {item.listItemProduct.map((prod) => {
                    return (
                      <ItemProduct key={prod.uuid} prod={prod}></ItemProduct>
                    );
                  })}
                </div>
                {item?.listItemProduct?.length<8?"": (
                  <div className="text-center">
                  <Pagination defaultCurrent={1} total={50} />
                </div>
                )}
                
              </>
              
            )} */}
          </>
        ),
      };
    });
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
              <li className="nav-item active">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </a>
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
              {user?.role?.nameRole=="Admin"? '': <li className="nav-item cta cta-colored">
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
              </li>}
              
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

              {/* <li className="nav-item cta cta-colored tagLiIconUser"><a className="nav-link" onClick={handleLogout}><i class="fa-solid fa-power-off"></i></a></li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* BANNER  */}
      <section className="banner-section">
        <Carousel>
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={banner.img} />
              <Carousel.Caption>
                <h3>{banner.name_banner}</h3>
                <p>{banner.content}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* CATE  */}
      <section className="sectionProduct sectionProductCate py-5">
        <h2 className="text-center">OUR CATEGORY</h2>
        <div className="listProductCateHome1">
          <Tabs
            defaultActiveKey="1"
            items={renderTabCate()}
            onChange={onChange}
          />
        </div>
      </section>

      {/* PRODUCT  */}
      <section className="sectionProduct py-5">
        <h2 className="text-center">OUR PRODUCT</h2>
        <div className="container my-3">
          {/*   <input
        type="text"
        className="form-control"
        placeholder="search by name"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
       <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button> */}
          <input
            type="text"
            className="form-control"
            placeholder="search by name"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="listProductHome">
          {products?.content?.map((item, key) => {
            return (
              <div key={item?.id} className="item">
                <img
                  src={item?.img}
                  onClick={() => {
                    navigate("/product-detail/" + item?.id);
                  }}
                  alt=""
                />
                <h1>{item?.nameProd}</h1>
                <p className="price">{formatCurrencyVND(item?.price)} vnd</p>
                <button
                  onClick={() => {
                    handleAddToCart(item?.id);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <button onClick={() => {}}>
                  <i className="fa-solid fa-credit-card"></i>
                </button>
              </div>
            );
          })}
        </div>
        <Pagination
          className="text-center my-4"
          current={
            searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1
          }
          pageSize={8}
          total={products?.totalElements}
          onChange={(page) => {
            setSearchParam({ page: page.toString() });
          }}
        />
      </section>

      <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
        <div className="container py-4">
          <div className="row d-flex justify-content-center py-5">
            <div className="col-md-6">
              <h2 style={{ fontSize: 22 }} className="mb-0">
                Subcribe to our Newsletter
              </h2>
              <span>
                Get e-mail updates about our latest shops and special offers
              </span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <form action="#" className="subscribe-form">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email address"
                  />
                  <input
                    type="submit"
                    defaultValue="Subscribe"
                    className="submit px-3"
                  />
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
                <h2 className="ftco-heading-2">Vegefoods</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia.
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
                <h2 className="ftco-heading-2">Have a Questions?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker" />
                      <span className="text">
                        203 Fake St. Mountain View, San Francisco, California,
                        USA
                      </span>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-phone" />
                        <span className="text">+2 392 3929 210</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-envelope" />
                        <span className="text">info@yourdomain.com</span>
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

export default Home;
