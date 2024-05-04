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
          <div id="sidenav-header">
            <div id="profile-picture">
              <img
                src="http://www.gravatar.com/avatar/fa4df8540bab3cb38f7dfa60c6e0522c.png"
                alt="profile"
              />
            </div>
            <a href="#" id="profile-link">
              Admin
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
              <a href="#">
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
              <a href="#" >
                <i className="fa fa-solid fa-list"></i>
                Category
              </a>
            </li>
            <li  onClick={() => {
                navigate("/admin/banner");
                handleNavClick("activity");
              }}
              className={activeTab === "friends" ? "active" : ""}>
              <a href="#" onClick={() => handleNavClick("friends")}>
                <i className="fa fa-brands fa-medium"></i>
                Banner
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-calendar"></i>
                Calendar
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-life-ring"></i>
                FAQs
              </a>
            </li>
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
