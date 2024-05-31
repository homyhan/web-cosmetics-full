import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { getBanner, updateBanner } from './thunk';
import Swal from 'sweetalert2';
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditBannerAdmin = () => {
  const { selectedBanner } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const params = useParams();
  const idBanner = params?.id;
  const dispatch = useDispatch();
  
  const [bannerData, setBannerData] = useState({
    name_banner: selectedBanner.name_banner||'',
    img: selectedBanner.img||'',
    content: selectedBanner.content||''
  });

  useEffect(()=>{
    dispatch(getBanner(idBanner));
  },[])

  useEffect(()=>{
    if(selectedBanner){
      console.log(selectedBanner);
      setBannerData({
        name_banner: selectedBanner.name_banner||'',
    img: selectedBanner.img||'',
    content: selectedBanner.content||''
      });
    }
  },[selectedBanner])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeFile = (e) => {
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `imagesBanner/${imageFile.name}`);

    uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setBannerData({...bannerData, img: url});
          })
          .catch((error) => {
            console.error("Error URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error upload img:", error);
      });
  };

  const handleSubmit = async() => {
    const res = await dispatch(updateBanner(idBanner, bannerData));
    await Swal.fire({
      position: "center",
      icon: "success",
      title: res,
      showConfirmButton: false,
      timer: 1500
    });

    navigate(-1);
    
  };

  return (
    <LayoutAdmin>
      <div className="mb-3">
        <label className="form-label">Banner Name</label>
        <input
          type="text"
          className="form-control"
          name="name_banner"
          value={bannerData?.name_banner}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
            type="file"
            className="form-control"
            name="img"
            onChange={handleChangeFile}
          />
          <img src={bannerData?.img} alt="" />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          name="content"
          value={bannerData?.content}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Save
      </button>
    </LayoutAdmin>
  );
};

export default EditBannerAdmin;
