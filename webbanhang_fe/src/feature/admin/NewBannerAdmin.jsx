import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch } from "react-redux";
import { postBanners } from "./thunk";
import Swal from 'sweetalert2'

const NewBannerAdmin = () => {
    const dispatch = useDispatch();
    const [bannerData, setBannerData] = useState({
      name_banner: "",
      img: "",
      content: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBannerData({ ...bannerData, [name]: value });
    };
  
    const handleSave = async() => {
      await dispatch(postBanners(bannerData))
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
          console.log("Error creating banner:", error);
        });
    };
  
    return (
      <LayoutAdmin>
        <h3 className="new-banner">Add New Banner</h3>
        <div className="mb-3">
          <label className="form-label">Banner Name</label>
          <input
            type="text"
            className="form-control"
            name="name_banner"
            value={bannerData.name_banner}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="img"
            value={bannerData.img}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={bannerData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save
        </button>
      </LayoutAdmin>
    );
  };
  
export default NewBannerAdmin;
