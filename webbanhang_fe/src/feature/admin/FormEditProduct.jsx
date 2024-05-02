import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateCategory, updateProduct } from "./thunk";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../booking/thunk";
import { cosmeticsServ } from "../../services/cosmeticsServ";

const FormEditProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const idProd = params?.id;
  const { selectedProd, categories } = useSelector((state) => state.admin);
  const [cate, setCate] = useState(0);
  const [formData, setFormData] = useState({
    nameProd: selectedProd?.nameProd || "",
    price: selectedProd?.price || "",
    quantity: selectedProd?.quantity || "",
    img: selectedProd?.img || "",
    description: selectedProd?.description || "",
    category: selectedProd?.category || {},
  });

  useEffect(() => {
    dispatch(getProduct(idProd));
    dispatch(fetchCategories);
  }, []);

  useEffect(() => {
    if (selectedProd) {
      setFormData({
        nameProd: selectedProd.nameProd || "",
        price: selectedProd.price || "",
        quantity: selectedProd.quantity || "",
        img: selectedProd.img || "",
        description: selectedProd.description || "",
        category: selectedProd.category || {},
      });
    }
  }, [selectedProd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      category: value
    }))
    setCate(value*1);
  };

  const mapCategoryIdToCategoryObject = (categoryId) => {
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    return { nameCategory: selectedCategory?.nameCategory };
};

  const handleUpdate = async() => {
    const categoryObject = mapCategoryIdToCategoryObject(cate);
    if(cate==0){
      const updatedData = { ...formData, category: {"nameCategory": selectedProd?.category?.nameCategory}  };
     await dispatch(updateProduct(idProd, updatedData))
    }else{
      const updatedData = { ...formData, category: categoryObject };
     await dispatch(updateProduct(idProd, updatedData))
    }
  };

  return (
    <LayoutAdmin>
      <div>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="nameProd"
            value={formData.nameProd}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) =>
              setFormData((prevState) => ({ ...prevState, description: value }))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className="form-select form-control"
            name="categoryId"
            value={formData?.category?.id}
            onChange={handleChangeSelect}
          >
            {categories?.map((item, key) => {
              return (
                <option value={item?.id} key={item?.id}>
                  {item?.nameCategory}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <button onClick={handleUpdate}>Save</button>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default FormEditProduct;
