import React, { useEffect, useState } from "react";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, fetchCartById, fetchCategories } from "./thunk";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Pagination, Tabs } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products, listCategory} = useSelector((state) => state.booking);
  const {user} = useSelector(state=>state.auth);
  const [searchParam, setSearchParam] = useSearchParams();
  const [quantityProdCart, setQuantityProdCart] = useState(0);

  const isLoggedIn = localStorage.getItem("emailCosmetics") && localStorage.getItem("passcosmetics");

  useEffect(() => {
    const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
    dispatch(fetchProducts(page-1, 8));
    dispatch(fetchCategories)
    getQuantityProdInCart();
  }, [dispatch, searchParam]);


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
    const res = await dispatch(addToCart({userId, productId, quantity: 1}));
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
  
  const handleLogout = () => {
      localStorage.removeItem("emailCosmetics");
      localStorage.removeItem("passcosmetics");
      navigate('/login');
  };

  const onChange = (key) => {
    console.log(key);
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
          {item?.product?.length==0? <p style={{padding:'12px', backgroundColor:'#82ae4663'}}>Sản phẩm sẽ sớm được cập nhật</p>: <div className="listProductHome3">
              {item?.product?.map((item, key)=>{
                return (
                  <div key={item?.id} className="item">
                    <img src={item?.img} onClick={()=>{navigate("/product-detail/"+item?.id)}} alt="" />
                    <h1>{item?.nameProd}</h1>
                    <p className="price">{formatCurrencyVND(item?.price)} vnd</p>
                    <button onClick={()=>{handleAddToCart(item?.id)}}>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                    )
                  })}
                </div>}
            
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
              
              {/* <li className="nav-item cta cta-colored tagLiIconUser"><a className="nav-link" onClick={handleLogout}><i class="fa-solid fa-power-off"></i></a></li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* BANNER  */}     

      {/* CATE  */}
      <section className="sectionProduct sectionProductCate py-5">
        <h2 className="text-center">OUR CATEGORY</h2>
        <div className="listProductCateHome1">
          <Tabs defaultActiveKey="1" items={renderTabCate()} onChange={onChange} />
        </div>
        
      </section>

      {/* PRODUCT  */}
      <section className="sectionProduct py-5">
        <h2 className="text-center">OUR PRODUCT</h2>
        <div className="listProductHome">
          {products?.content?.map((item, key) => {
            return (
              <div key={item?.id} className="item">
                <img src={item?.img} onClick={()=>{navigate("/product-detail/"+item?.id)}} alt="" />
                <h1>{item?.nameProd}</h1>
                <p className="price">{formatCurrencyVND(item?.price)} vnd</p>
                <button onClick={()=>{handleAddToCart(item?.id)}}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <button onClick={()=>{}}>
                  <i className="fa-solid fa-credit-card"></i>
                </button>
              </div>
            );
          })}
        </div>
        <Pagination
        className="text-center my-4"
        current={searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1}
        pageSize={8}
        total={products?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />
      </section>
    </div>
  );
};

export default Home;
