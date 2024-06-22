import React, { useCallback, useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteBanner, fetBanners, fetchBannersByName } from "./thunk";
import _ from 'lodash';
import Swal from "sweetalert2";
import { Pagination } from "antd";

const BannerAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.admin.banners);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
    dispatch(fetBanners(page-1, 4));
  }, [dispatch, searchParam]);

  const handleDeleteBanner = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteBanner(id));
        const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 4) : 1;
        await dispatch(fetBanners(page-1, 4));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      }
    });
  };
  const debouncedSearch = useCallback(
    _.debounce((term) => {
      dispatch(fetchBannersByName(term, 0, 4));
    }, 500), 
    [dispatch]
  );

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <LayoutAdmin>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="search by name"
          value={searchTerm}
          onChange={handleChange}
        />
      </div><br></br>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button className="add-button"
          onClick={() => {
            navigate("/admin/add-banner");
          }}
        >
          Add New Banner
        </button>
      </div>
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
          {banners?.content?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key + 1}</td>
                <td>{item.name_banner}</td>
                <td>{item.content}</td>
                <td>
                  <img style={{ width: "100px" }} src={item?.img} alt="" />
                </td>
                <td className="action-buttons">
                  <button className="edit-button"
                    onClick={() => {
                      navigate("/admin/edit-banner/" + item?.id);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="delete-button"
                    onClick={() => {
                      handleDeleteBanner(item?.id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="text-center my-4"
        current={searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1}
        pageSize={4}
        total={banners?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />
    </LayoutAdmin>
  );
};

export default BannerAdmin;
