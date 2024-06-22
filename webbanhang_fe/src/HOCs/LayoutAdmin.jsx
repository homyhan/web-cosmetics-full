import React, { useState } from "react";

import "../components/style.css";
import { useNavigate } from "react-router-dom";

const LayoutAdmin = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("knowledge");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (target) => {
    setActiveTab(target);
  };

  const handleSearchFocus = () => {
    document.getElementById("header_logo").classList.add("hidden");
  };

  const handleSearchBlur = () => {
    document.getElementById("header_logo").classList.remove("hidden");
  };

  return (
    <div>
      <div id="menu-overlay" onClick={toggleMenu}></div>
      <div
        id="menu-toggle"
        className={menuOpen ? "open" : "closed"}
        data-title="Menu"
        onClick={toggleMenu}
      >
        <i className="fa fa-bars"></i>
        <i className="fa fa-times"></i>
      </div>
      <header id="main-header">
        <nav id="sidenav">
          <div style={{cursor:'pointer'}} onClick={()=>{navigate("/")}} id="sidenav-header">
            <div id="profile-picture">
              <img
                // src="http://www.gravatar.com/avatar/fa4df8540bab3cb38f7dfa60c6e0522c.png"
                src="https://cdn.dribbble.com/users/2978235/screenshots/16124112/media/414dc110d9bb00e814fb966c6d7d3027.jpg?resize=400x0"
                alt="profile"
              />
            </div>
            <a id="profile-link">
              Cosmetics
            </a>
          </div>
          <div id="account-actions">
            <a href="#" data-title="Home">
              <i className="fa fa-home"></i>
            </a>
            <a
              href="#"
              id="messages"
              data-title="Messages"
              data-newmessages="1"
            >
              <i className="fa fa-inbox"></i>
            </a>
            <a href="#" data-title="Settings">
              <i className="fa fa-cog"></i>
            </a>
          </div>
          <ul id="main-nav">
            <li
              onClick={() => {
                navigate("/admin");
                handleNavClick("knowledge")
              }}
              className={activeTab === "knowledge" ? "active" : ""}
            >
              <a>
                <i className="fa fa-tachometer"></i>
                Products
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/admin/category");
                handleNavClick("activity");
              }}
              className={activeTab === "activity" ? "active" : ""}
            >
              <a>
                <i className="fa fa-solid fa-list"></i>
                Category
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/admin/banner");
                handleNavClick("banner");
              }}
              className={activeTab === "banner" ? "active" : ""}
            >
              <a>
                <i className="fa fa-brands fa-medium"></i>
                Banner
              </a>
            </li>
            <li  onClick={() => {
                navigate("/admin/user");
                handleNavClick("user");
              }}
              className={activeTab === "user" ? "active" : ""}>
              <a>
                <i className="fa fa-solid fa-user"></i>
                User
              </a>
            </li>
            <li onClick={() => navigate("/admin/role")}
              className={activeTab === "role" ? "active" : ""}>
              <a >
                <i className="fa fa-calendar"></i>
                Role
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/admin/orders");
                handleNavClick("orders");
              }}
              className={activeTab === "orders" ? "active" : ""}
            >
              <a>
                <i className="fa fa-solid fa-bag-shopping"></i>
                Orders
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/admin/statistics");
                handleNavClick("statistics");
              }}
              className={activeTab === "statistics" ? "active" : ""}
            >
              <a>
                <i className="fa fa-life-ring"></i>
                Statistics
              </a>
            </li>
            {/* <li>
              <a href="">
                <i className="fa fa-life-ring"></i>
                FAQs
              </a>
            </li> */}
          </ul>
        </nav>
        <form id="admin-search">
          <input
            type="text"
            id="search-field"
            placeholder="Search"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <label htmlFor="search-field" id="search-label" title="Search">
            <i className="fa fa-search"></i>
          </label>
        </form>
        <div id="header_logo">
          <a href="#">Logo</a>
        </div>
      </header>
      <section id="content">{props.children}</section>
      <footer></footer>
    </div>
  );
};

export default LayoutAdmin;
