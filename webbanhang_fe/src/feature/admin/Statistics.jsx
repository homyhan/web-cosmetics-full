import React, { useEffect } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import '../../components/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleById, getRoleById, getRoles } from './thunk';
import Swal from 'sweetalert2';

const Statistics = () => {
    
  return (
    <LayoutAdmin>
        
    </LayoutAdmin>
  )
}

export default Statistics;