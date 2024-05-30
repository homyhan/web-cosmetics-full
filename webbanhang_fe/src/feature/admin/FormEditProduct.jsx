import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateCategory, updateProduct } from "./thunk";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../booking/thunk";
import { cosmeticsServ } from "../../services/cosmeticsServ";
import Swal from "sweetalert2";
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FormEditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      category: value,
    }));
    setCate(value * 1);
  };

  const mapCategoryIdToCategoryObject = (categoryId) => {
    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    return { nameCategory: selectedCategory?.nameCategory };
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleChangeFile = (e) => {
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `imagesProduct/${imageFile.name}`);

    uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setFormData({...formData, img: url});
          })
          .catch((error) => {
            console.error("Error URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error upload img:", error);
      });
  };

  const handleUpdate = async () => {
    const categoryObject = mapCategoryIdToCategoryObject(cate);
    if (cate == 0) {
      const updatedData = {
        ...formData,
        category: { nameCategory: selectedProd?.category?.nameCategory },
      };
      const res = await dispatch(updateProduct(idProd, updatedData));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: res,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(-1)
    } else {
      const updatedData = { ...formData, category: categoryObject };
      const res = await dispatch(updateProduct(idProd, updatedData));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: res,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(-1)
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
          <label className="form-label">Hình ảnh</label>
          <input
            type="file"
            className="form-control"
            name="img"
            onChange={handleChangeFile}
          />
          <img src={formData?.img} alt="" />
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
            modules={module}
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
