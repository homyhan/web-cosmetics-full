import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { getBanner, getUser, updateBanner, updateInforUser } from './thunk';
import Swal from 'sweetalert2'

const EditInfoUserAdmin = () => {
  const { selectedUser } = useSelector((state) => state.admin);
  const params = useParams();
  const idUser = params?.id;
  const dispatch = useDispatch();
  
  const [userData, setUserData] = useState({
    fullName: selectedUser.fullName||'',
    email: selectedUser.email||'',
    phone: selectedUser.phone||'',
    address: selectedUser.address||''
  });

  useEffect(()=>{
    dispatch(getUser(idUser));
  },[])

  useEffect(()=>{
    if(selectedUser){
      console.log(selectedUser);
      setUserData({
        fullName: selectedUser.fullName||'',
        email: selectedUser.email||'',
        phone: selectedUser.phone||'',
        address: selectedUser.address||''
      });
    }
  },[selectedUser])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    const res = await dispatch(updateInforUser(idUser, userData));
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
        <label className="form-label">Full name</label>
        <input
          type="text"
          className="form-control"
          name="fullName"
          value={userData?.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={userData?.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <textarea
          className="form-control"
          name="phone"
          value={userData?.phone}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="address"
          value={userData?.address}
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

export default EditInfoUserAdmin;
