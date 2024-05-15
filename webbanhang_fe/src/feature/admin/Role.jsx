import React, { useEffect } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import '../../components/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleById, getRoleById, getRoles } from './thunk';
import Swal from 'sweetalert2';

const Role = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {roles} = useSelector(state=>state.admin);
    useEffect(()=>{
        dispatch(getRoles());
        
    },[])

    const handleEdit = (id)=>{
     
      navigate("/admin/edit-role/"+id);
    }

    const handleDelete = (id)=>{
      Swal.fire({
        title: "Delete it?",        
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await dispatch(deleteRoleById(id));
          Swal.fire({
            title: res.data,            
            icon: res.status == 200?"success":"error",
            showConfirmButton: false,
            timer: 1000
          });
          await dispatch(getRoles());
        }
      });
    }
  return (
    <LayoutAdmin>
        <div className='mb-3'>
      <input
          onChange={(e) => {
            // setKeySearch(e.target.value);
          }}
          className="form-control"
          type="text"
          placeholder="search"
        />
      </div>
        <div style={{textAlign:'right', marginBottom:'20px'}}><button onClick={()=>{navigate("/admin/add-role")}}>Add Role New</button></div> 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name Role</th>            
            <th scope="col">Role</th>            
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody >
          {roles?.map((item, key)=>{
            return <tr key={item?.id}>
             <td >{key+1}</td>
             <td >{item.nameRole}</td>
             <td >{item?.role}</td>
             
             <td >
               <button onClick={()=>{handleEdit(item?.id)}}>
                 <i className="fa-solid fa-pen-to-square"></i>
               </button>
               <button onClick={()=>{handleDelete(item?.id)}}>
                 <i className="fa-solid fa-trash"></i>
               </button>
             </td>
           </tr>
          })}
        </tbody>
      </table>
    </LayoutAdmin>
  )
}

export default Role