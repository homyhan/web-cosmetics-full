import React, { useEffect } from 'react';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetUsers } from '../booking/thunk';

const DisplayUserAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.users);

    useEffect(() => {
        dispatch(fetUsers);
    }, [dispatch]);

    return (
        <LayoutAdmin>
            <div style={{textAlign:'right', marginBottom:'20px'}}><button onClick={()=>{navigate("/admin/add-user")}}>Add New User</button></div> 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((item, key) => {
                        return (
                            <tr key={item?.id}>
                                <td>{key + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.role ? item.role.nameRole : 'N/A'}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button onClick={()=>{navigate("/admin/edit-info-user/"+item?.id)}}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={()=>{navigate("/admin/edit-status/"+item?.id)}}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </LayoutAdmin>
    );
}

export default DisplayUserAdmin;
