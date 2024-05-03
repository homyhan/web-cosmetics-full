import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../booking/thunk";
import { addProduct, getCategory } from "./thunk";
import { cosmeticsServ } from "../../services/cosmeticsServ";
import Swal from 'sweetalert2'

const FormAddProduct = () => {
    const [value, setValue] = useState('');
    const [nameProd, setNameProd] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState({});
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const categories = useSelector(state=>state.admin.categories);
    useEffect(()=>{
        dispatch(fetchCategories);
    },[]);

    const handleSelectCate = async (id)=>{
        console.log(id);
        // setCategory(id);
        const res = await cosmeticsServ.getCategory(id);
        console.log(res?.data);
        setCategory({"nameCategory": res?.data?.nameCategory});
    }

    const handleAdd = async ()=>{
        const newProduct = {
            nameProd,
            price,
            img,
            quantity,
            description: value,
            category,
        };
        console.log(newProduct);
        const res = await dispatch(addProduct(newProduct))
        Swal.fire({
          position: "center",
          icon: "success",
          title: res,
          showConfirmButton: false,
          timer: 1500
        });
    }

  return (
    <LayoutAdmin>
      <div>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input type="text" className="form-control"  value={nameProd} onChange={(e) => setNameProd(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Hình ảnh</label>
          <input type="text" className="form-control" value={img} onChange={(e) => setImg(e.target.value)}/>
          <input type="file" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>
        

        <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <ReactQuill theme="snow" value={value} onChange={setValue}></ReactQuill>
        </div>
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select onChange={(e) => handleSelectCate(e.target.value)} className="form-select form-control">
            <option defaultValue="0">Select Category</option>
            {categories?.map((item, key)=>{
                return <option value={item?.id} key={item?.id}>{item?.nameCategory}</option>
            })}
            
          </select>
        </div>

        <div className="mb-3">
          <button onClick={()=>{handleAdd()}}>Add</button>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default FormAddProduct;
