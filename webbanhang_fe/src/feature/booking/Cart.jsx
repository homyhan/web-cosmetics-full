import React from "react";
import '../../components/style.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
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
            <a className="navbar-brand" onClick={() => {
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
                  <a href="index.html" className="nav-link">
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
                <a onClick={() => {
                    navigate("/cart");
                  }} className="nav-link">
                  <i className="fa-solid fa-cart-shopping" />
                  [0]
                </a>
              </li>
              <li className="nav-item cta cta-colored tagLiIconUser">
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="nav-link"
                >
                  <i className="fa-solid fa-user"></i>
                </a>
              </li>
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
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="product-remove">
                          <a href="#">
                            <span className="ion-ios-close" />
                          </a>
                        </td>
                        <td className="image-prod">
                          <div
                            className="img"
                            style={{
                              backgroundImage: "url(images/product-3.jpg)",
                            }}
                          />
                        </td>
                        <td className="product-name">
                          <h3>Bell Pepper</h3>
                          <p>
                            Far far away, behind the word mountains, far from
                            the countries
                          </p>
                        </td>
                        <td className="price">$4.90</td>
                        <td className="quantity">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="quantity"
                              className="quantity form-control input-number"
                              defaultValue={1}
                              min={1}
                              max={100}
                            />
                          </div>
                        </td>
                        <td className="total">$4.90</td>
                      </tr>
                      {/* END TR*/}
                      <tr className="text-center">
                        <td className="product-remove">
                          <a href="#">
                            <span className="ion-ios-close" />
                          </a>
                        </td>
                        <td className="image-prod">
                          <div
                            className="img"
                            style={{
                              backgroundImage: "url(images/product-4.jpg)",
                            }}
                          />
                        </td>
                        <td className="product-name">
                          <h3>Bell Pepper</h3>
                          <p>
                            Far far away, behind the word mountains, far from
                            the countries
                          </p>
                        </td>
                        <td className="price">$15.70</td>
                        <td className="quantity">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="quantity"
                              className="quantity form-control input-number"
                              defaultValue={1}
                              min={1}
                              max={100}
                            />
                          </div>
                        </td>
                        <td className="total">$15.70</td>
                      </tr>
                      {/* END TR*/}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <div className="row justify-content-end">
              <div className="col-lg-4 mt-5 cart-wrap ">
                <div className="cart-total mb-3">
                  <h3>Coupon Code</h3>
                  <p>Enter your coupon code if you have one</p>
                  <form action="#" className="info">
                    <div className="form-group">
                      <label htmlFor>Coupon code</label>
                      <input
                        type="text"
                        className="form-control text-left px-3"
                        placeholder
                      />
                    </div>
                  </form>
                </div>
                <p>
                  <a href="checkout.html" className="btn btn-primary py-3 px-4">
                    Apply Coupon
                  </a>
                </p>
              </div>
              <div className="col-lg-4 mt-5 cart-wrap ">
                <div className="cart-total mb-3">
                  <h3>Estimate shipping and tax</h3>
                  <p>Enter your destination to get a shipping estimate</p>
                  <form action="#" className="info">
                    <div className="form-group">
                      <label htmlFor>Country</label>
                      <input
                        type="text"
                        className="form-control text-left px-3"
                        placeholder
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">State/Province</label>
                      <input
                        type="text"
                        className="form-control text-left px-3"
                        placeholder
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Zip/Postal Code</label>
                      <input
                        type="text"
                        className="form-control text-left px-3"
                        placeholder
                      />
                    </div>
                  </form>
                </div>
                <p>
                  <a href="checkout.html" className="btn btn-primary py-3 px-4">
                    Estimate
                  </a>
                </p>
              </div>
              <div className="col-lg-4 mt-5 cart-wrap ">
                <div className="cart-total mb-3">
                  <h3>Cart Totals</h3>
                  <p className="d-flex">
                    <span>Subtotal</span>
                    <span>$20.60</span>
                  </p>
                  <p className="d-flex">
                    <span>Delivery</span>
                    <span>$0.00</span>
                  </p>
                  <p className="d-flex">
                    <span>Discount</span>
                    <span>$3.00</span>
                  </p>
                  <hr />
                  <p className="d-flex total-price">
                    <span>Total</span>
                    <span>$17.60</span>
                  </p>
                </div>
                <p>
                  <a href="checkout.html" className="btn btn-primary py-3 px-4">
                    Proceed to Checkout
                  </a>
                </p>
              </div>
            </div> */}
          </div>
        </section>
    </div>
  );
};

export default Cart;
