import React, { useEffect } from 'react';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetBanners } from '../booking/thunk'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { deleteBanner } from './thunk';
import Swal from 'sweetalert2'

const BannerAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const banners = useSelector(state => state.admin.banners);

    useEffect(() => {
        dispatch(fetBanners);
    }, [dispatch]);

    const handleDeleteBanner = (id)=>{
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
            await dispatch(deleteBanner(id));
            await dispatch(fetBanners);
            Swal.fire({
              title: "Deleted!",            
              icon: "success"
            });
          }
        });
      }

    return (
        <LayoutAdmin>
            <div style={{textAlign:'right', marginBottom:'20px'}}><button onClick={()=>{navigate("/admin/add-banner")}}>Add New Banner</button></div> 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name Banner</th>
                        <th scope="col">Content</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {banners?.map((item, key) => {
                        return (
                            <tr key={item?.id}>
                                <td>{key + 1}</td>
                                <td>{item.name_banner}</td>
                                <td>{item.content}</td>
                                <td>
                                    <img style={{width:'100px'}} src={item?.img} alt="" />
                                </td>
                                <td>
                                    <button onClick={()=>{navigate("/admin/edit-banner/"+item?.id)}}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={()=>{handleDeleteBanner(item?.id)}}>
                                        <i className="fa-solid fa-trash"></i>
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

export default BannerAdmin;
