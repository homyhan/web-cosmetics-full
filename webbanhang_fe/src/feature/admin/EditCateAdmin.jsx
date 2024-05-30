import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { getCategory, updateCategory } from "./thunk";
import Swal from "sweetalert2";

const EditCateAdmin = () => {
  const { selectedCate } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const params = useParams();
  const idCate = params?.id;
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(
    selectedCate?.nameCategory || ""
  );

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await dispatch(
      updateCategory(idCate, { nameCategory: categoryName })
    );
    await Swal.fire({
      position: "Center",
      icon: "success",
      title: res,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getCategory(idCate));
  }, []);

  useEffect(() => {
    setCategoryName(selectedCate?.nameCategory || "");
  }, [selectedCate]);
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
        Save
      </button>
    </LayoutAdmin>
  );
};

export default EditCateAdmin;
