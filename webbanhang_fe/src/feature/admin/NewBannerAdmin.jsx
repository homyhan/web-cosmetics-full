import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch } from "react-redux";
import { postBanners } from "./thunk";
import Swal from 'sweetalert2';
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewBannerAdmin = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState('');
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
      const newBannerData = {...bannerData, img: imgUrl};
      await dispatch(postBanners(newBannerData))
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

    const handleChangeFile = (e) => {
      const imageFile = e.target.files[0];
    
      const storageRef = ref(storage, `imagesBanner/${imageFile.name}`);

      uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImgUrl(url);
            })
            .catch((error) => {
              console.error("Error URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error upload img:", error);
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
          {/* <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="img"
            value={bannerData.img}
            onChange={handleChange}
          /> */}
          <input type="file" className="form-control" onChange={(e)=>{handleChangeFile(e)}}/>
          <img src={imgUrl} alt="" />
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
        <button className="add-button"
          onClick={handleSave}
        >
          Save
        </button>
      </LayoutAdmin>
    );
  };
  
export default NewBannerAdmin;
