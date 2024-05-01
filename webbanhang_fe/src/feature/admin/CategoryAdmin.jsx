import React, { useEffect } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { fetCategories } from '../booking/thunk';
import { useNavigate } from 'react-router-dom';

const CategoryAdmin = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const categories = useSelector(state=>state.admin.categories);
    useEffect(()=>{
        dispatch(fetCategories);
    },[])
    
  return (
    <LayoutAdmin>
        <div style={{textAlign:'right', marginBottom:'20px'}}><button onClick={()=>{navigate("/admin/add-category")}}>Add Category New</button></div> 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name category</th>            
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key+1}</td>
                <td>{item.nameCategory}</td>
                
                <td>
                  <button onClick={()=>{navigate("/admin/edit-category/"+item?.id)}}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button>
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