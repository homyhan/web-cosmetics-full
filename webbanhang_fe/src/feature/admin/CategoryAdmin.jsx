import React, { useCallback, useEffect, useState } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../booking/thunk';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteCategory, fetchCatePagiList, fetchCatesByName } from './thunk';
import Swal from 'sweetalert2';
import _ from 'lodash';
import { Pagination } from 'antd';

const CategoryAdmin = () => {

    const navigate = useNavigate();
    const [keySearch, setKeySearch] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParam, setSearchParam] = useSearchParams();

    const dispatch = useDispatch();
    const categories = useSelector(state=>state.admin.categories);
    useEffect(()=>{
      const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
        // dispatch(fetchCategories);
        dispatch(fetchCatePagiList(page-1, 8))
    },[searchParam]);

    const debouncedSearch = useCallback(
      _.debounce((term) => {
        dispatch(fetchCatesByName(term, 0, 8));
      }, 500), // 500ms debounce time
      [dispatch]
    );
  
    const handleChange = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    };

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
          // await dispatch(fetchCategories);
          
          await Swal.fire({
            title: "Deleted!",            
            icon: "success",
            showConfirmButton:false,
            timer: 1000
          });
          const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
          await dispatch(fetchCatePagiList(page-1, 8))

        }
      });
    }
    
  return (
    <LayoutAdmin>
      <div className='mb-3'>
      {/* <input
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          className="form-control"
          type="text"
          placeholder="search"
        /> */}
        <input
        type="text"
        className="form-control"
        placeholder="search by name"
        value={searchTerm}
        onChange={handleChange}
      />
      </div><br></br>
        <div style={{textAlign:'right', marginBottom:'20px'}}><button className="add-button" onClick={()=>{navigate("/admin/add-category")}}>Add Category New</button></div> 
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
          {categories?.content?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key+1}</td>
                <td>{item.nameCategory}</td>
                <td>{item?.product?.length}</td>
                
                <td className="action-buttons">
                  <button className="edit-button" onClick={()=>{navigate("/admin/edit-category/"+item?.id)}}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="delete-button" onClick={()=>{handleDeleteCate(item?.id)}}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {categories?.totalElements >8 ? <Pagination
        className="text-center my-4"
        current={searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1}
        pageSize={8}
        total={categories?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />: ''}
      
    </LayoutAdmin>
  )
}

export default CategoryAdmin