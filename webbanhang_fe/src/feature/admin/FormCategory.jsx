import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, postCategories, updateCategory } from "./thunk";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const FormCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await dispatch(postCategories({ nameCategory: categoryName }));
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
        <label className="form-label">Tên danh mục</label>
        <input
          type="text"
          className="form-control"
          value={categoryName}

          onChange={handleInputChange}
        />
      </div>
      
        <button className="add-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Add
        </button>
      
    </LayoutAdmin>
  );
};

export default FormCategory;
