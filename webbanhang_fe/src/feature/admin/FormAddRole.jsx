import React, { useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRoles } from "./thunk";
import Swal from "sweetalert2";

const FormAddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameRole: "",
    role: 0,
  });
  const handleAddRole = async() => {
    console.log(formData);
    const res = await dispatch(addRoles(formData));
    await Swal.fire({
      position: "center",
      icon:  res?.status==200?"success":"error",
      title: res.data,
      showConfirmButton: false,
      timer: 1500
    });   
    navigate("/admin/role");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;    
    let nameRole;
    let role;
    if (name === "nameRole") {        
        nameRole = value;
    } else if (name === "role") {
        role = value*1;
    }
    if (name === "nameRole") {
        setFormData({ ...formData, nameRole: value });
    } else if (name === "role") {
        setFormData({ ...formData, role: value * 1 });
    }
  };
  return (
    <LayoutAdmin>
      <input
        type="text"
        placeholder="Tên role"
        name="nameRole"
        onChange={handleChangeInput}
        className="form-control mb-3"
      />
      <input
        type="number"
        placeholder="Số role"
        name="role"
        onChange={handleChangeInput}
        className="form-control mb-3"
      />

      <button
        onClick={() => {
          handleAddRole()
        }}
      >
        Add
      </button>
    </LayoutAdmin>
  );
};

export default FormAddRole;
