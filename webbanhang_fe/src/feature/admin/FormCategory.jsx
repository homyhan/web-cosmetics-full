import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, postCategories, updateCategory } from "./thunk";
import { useParams } from "react-router-dom";

const FormCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmit = () => {
    console.log(categoryName);
    dispatch(postCategories({ nameCategory: categoryName }));
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
      
        <button
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
