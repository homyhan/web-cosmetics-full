import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../admin/thunk";
import { addProduct, getCategory } from "./thunk";
import { cosmeticsServ } from "../../services/cosmeticsServ";
import Swal from 'sweetalert2';
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const FormAddProduct = () => {
    const [value, setValue] = useState('');
    const [nameProd, setNameProd] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState({});
    const [imgUrl, setImgUrl] = useState('');
    const navigate = useNavigate();
    


    const dispatch = useDispatch();
    const categories = useSelector(state=>state.admin.listCate);

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      
      [{ 'indent': '-1'}, { 'indent': '+1' }],          
      [{ 'direction': 'rtl' }],                         
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         
    ];

    const module ={
      toolbar: toolbarOptions
    }

    useEffect(()=>{
        dispatch(fetchCategories);
    },[]);

    const handleSelectCate = async (id)=>{
        const res = await cosmeticsServ.getCategory(id);
        setCategory({"nameCategory": res?.data?.nameCategory});
    }
   
    const handleChangeFile = (e) => {
      const imageFile = e.target.files[0];
    
      const storageRef = ref(storage, `imagesProduct/${imageFile.name}`);

      uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImgUrl(url);
            })
            .catch((error) => {
              console.error("Error URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error upload img:", error);
        });
    };

     const handleAdd = async ()=>{
        const newProduct = {
            nameProd,
            price,
            img: imgUrl,
            quantity,
            description: value,
            category,
        };
        const res = await dispatch(addProduct(newProduct))
        await Swal.fire({
          position: "center",
          icon: "success",
          title: res,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(-1)
        
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
          {/* <input type="text" className="form-control" value={img} onChange={(e) => setImg(e.target.value)}/> */}
          <input type="file" className="form-control" onChange={(e)=>{handleChangeFile(e)}}/>
          <img src={imgUrl} alt="" />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>
        

        <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <ReactQuill modules={module} theme="snow" value={value} onChange={setValue}></ReactQuill>
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
