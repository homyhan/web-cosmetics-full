import React, { useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { registerForAdmin } from "./thunk";
import Swal from 'sweetalert2'

const NewUserForAdmin = () => {
    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        address:'',
        phone:'',
        password:'',
        status:1,
        role:{
            role:0,
            nameRole: "Customer"
        }
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const preventDefault = (e) => {
        e.preventDefault();
    };
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handleNewUser = async()=>{        
        const res = await dispatch(registerForAdmin(formData));        
        Swal.fire({
            position: "center",
            icon: res?.status === 200 ? "success" : "error",
            title: res.data,
            showConfirmButton: false,
            timer: 1500
        });
    }
    
  return (
    <LayoutAdmin>
      <h3 className="new-banner">Add New User</h3>
      <form action="#" className="form" id="form1" onSubmit={preventDefault}>
      <div>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input type="text" name="fullName" className="form-control"  onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={()=>{handleNewUser()}}>Add</button>
        </div>
      </div>
      </form>
    </LayoutAdmin>
  );
};

export default NewUserForAdmin;
