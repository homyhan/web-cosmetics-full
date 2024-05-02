import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../booking/thunk';
import { useNavigate } from 'react-router-dom';
import { deleteCategory } from './thunk';
import Swal from 'sweetalert2'

const CategoryAdmin = () => {

    const navigate = useNavigate();
    const [keySearch, setKeySearch] = useState("");

    const dispatch = useDispatch();
    const categories = useSelector(state=>state.admin.categories);
    useEffect(()=>{
        dispatch(fetchCategories);
    },[]);

    const handleDeleteCate = (id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteCategory(id));
          await dispatch(fetchCategories);
          Swal.fire({
            title: "Deleted!",            
            icon: "success"
          });
        }
      });
    }
    
  return (
    <LayoutAdmin>
      <div className='mb-3'>
      <input
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          className="form-control"
          type="text"
          placeholder="search"
        />
      </div>
        <div style={{textAlign:'right', marginBottom:'20px'}}><button onClick={()=>{navigate("/admin/add-category")}}>Add Category New</button></div> 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name category</th>            
            <th scope="col">Quantity</th>            
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key+1}</td>
                <td>{item.nameCategory}</td>
                <td></td>
                
                <td>
                  <button onClick={()=>{navigate("/admin/edit-category/"+item?.id)}}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={()=>{handleDeleteCate(item?.id)}}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </LayoutAdmin>
  )
}

export default CategoryAdmin