import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { getUser, updateStatus} from './thunk';
import Swal from 'sweetalert2'

const EditStatusUserAdmin = () => {
    
  const { selectedUser } = useSelector((state) => state.admin);
  const params = useParams();
  const idUser = params?.id;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(selectedUser?.status || "");

  const handleInputChange = (event) => {
    
    setStatus(event.target.value);
  };
  const handleSubmit = async () => {
   const res = await dispatch(updateStatus(idUser, {status: status}))
   Swal.fire({
    position: "Center",
    icon: "success",
    title: res,
    showConfirmButton: false,
    timer: 1500
  });  
  };


  useEffect(() => {    
    dispatch(getUser(idUser));
  }, []);
   
   useEffect(() => {
    setStatus(selectedUser?.status || "");
  }, [selectedUser]);
  return (
    <LayoutAdmin>
    <div className="mb-3">
      <label className="form-label">Status</label>
      <input
        type="text"
        className="form-control"
        value={status}

        onChange={handleInputChange}
      />
    </div>
    
      <button
        className="btn btn-primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        Save
      </button>
    
  </LayoutAdmin>
  )
}

export default EditStatusUserAdmin