import React, { useCallback, useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../booking/thunk";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import _ from 'lodash';
import { deleteProduct, fetchProdsByName, fetchProdsList } from "./thunk";
import { Pagination } from "antd";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.booking.products);
  const {listProdsPage} = useSelector(state=>state.admin);
  const [searchParam, setSearchParam] = useSearchParams();
  const [keySearch, setKeySearch] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // dispatch(fetchProducts);
    const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
    dispatch(fetchProdsList(page-1, 8));
  }, [dispatch, searchParam]);
  const handleDeleteProduct = (id) => {
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
        await dispatch(deleteProduct(id));
        const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
        await dispatch(fetchProdsList(page-1, 8));
        await Swal.fire({
          title: "Deleted!",
          icon: "success",
          showConfirmButton: false,
          timer:1000
        });
      }
    });
  };

  const handleEdit = (id) => {    
    navigate("/admin/edit-product/" + id);
  };
  const debouncedSearch = useCallback(
    _.debounce((term) => {
      dispatch(fetchProdsByName(term, 0, 8));
    }, 500), 
    [dispatch]
  );

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };
  const formatCurrencyVND = (number) => {
    var formattedAmount = number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    formattedAmount = formattedAmount?.replace("₫", "");
    return formattedAmount;
  };
  return (
    <LayoutAdmin>
      <div>
        {/* <input
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          className="form-control mb-3"
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
      </div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={() => {
            navigate("/admin/add-product");
          }}
        >
          Add Product New
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name product</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {/* .filter((item) => {
              return keySearch.toLowerCase()===''?item: item?.nameProd?.toLowerCase().includes(keySearch);
            }) */}
          {listProdsPage?.content?.map((item, key) => {
              return (
                <tr key={item?.id}>
                  <td>{key + 1}</td>
                  <td>{item.nameProd}</td>
                  <td>
                    <img style={{ width: "100px" }} src={item?.img} alt="" />
                  </td>
                  <td>{formatCurrencyVND(item?.price)}</td>
                  <td className="truncate-multiline" dangerouslySetInnerHTML={{ __html: item?.description }} />
                  <td>{item?.quantity}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(item?.id);
                        console.log(item);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteProduct(item?.id);
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
        pageSize={8}
        total={listProdsPage?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />

         
    </LayoutAdmin>
  );
};

export default HomeAdmin;
