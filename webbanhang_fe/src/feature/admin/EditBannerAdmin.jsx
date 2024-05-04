import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { getBanner, updateBanner } from './thunk';
import Swal from 'sweetalert2'

const EditBannerAdmin = () => {
  const { selectedBanner } = useSelector((state) => state.admin);
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

  const handleSubmit = async() => {
    const res = await dispatch(updateBanner(idBanner, bannerData));
    Swal.fire({
      position: "center",
      icon: "success",
      title: res,
      showConfirmButton: false,
      timer: 1500
    });
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
          type="text"
          className="form-control"
          name="img"
          value={bannerData?.img}
          onChange={handleInputChange}
        />
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
