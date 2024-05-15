import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addRoles, getRoleById, updateRoleById } from "./thunk";
import Swal from "sweetalert2";

const FormEditRole = () => {
    const {selectedRole} = useSelector(state=>state.admin);
    const params = useParams();
    const idRole = params?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameRole: selectedRole?.nameRole,
    role: selectedRole?.role,
  });

  useEffect(()=>{
     dispatch(getRoleById(idRole));
  },[])

  useEffect(()=>{
    setFormData({
        ...formData,
        nameRole: selectedRole?.nameRole,
        role: selectedRole?.role
    })
  },[selectedRole])
  const handleUpdateRole = async() => {
    const res = await dispatch(updateRoleById(idRole, formData));
    console.log(idRole);
    await Swal.fire({
      position: "center",
      icon:  res?.status==200?"success":"error",
      title: res?.data,
      showConfirmButton: false,
      timer: 1000
    });       
    navigate("/admin/role");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;    
    setFormData({
        ...formData,
        [name]: value
    })
    // let nameRole;
    // let role;
    // if (name === "nameRole") {        
    //     nameRole = value;
    // } else if (name === "role") {
    //     role = value*1;
    // }
    // if (name === "nameRole") {
    //     setFormData({ ...formData, nameRole: value });
    // } else if (name === "role") {
    //     setFormData({ ...formData, role: value * 1 });
    // }
  };
  return (
    <LayoutAdmin>
      <input
        type="text"
        placeholder="Tên role"
        name="nameRole"
        onChange={handleChangeInput}
        className="form-control mb-3"
        value={formData.nameRole}
      />
      <input
        type="number"
        placeholder="Số role"
        name="role"
        onChange={handleChangeInput}
        className="form-control mb-3"
        value={formData.role}
      />

      <button
        onClick={() => {
          handleUpdateRole()
        }}
      >
        Save
      </button>
    </LayoutAdmin>
  );
};

export default FormEditRole;
