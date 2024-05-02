import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../booking/thunk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProduct } from "./thunk";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.booking.products);
  const [keySearch, setKeySearch] = useState("");
  useEffect(() => {
    dispatch(fetchProducts);
  }, []);
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
        await dispatch(fetchProducts);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate("/admin/edit-product/" + id);
  };
  return (
    <LayoutAdmin>
      <div>
        <input
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          className="form-control mb-3"
          type="text"
          placeholder="search"
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
          {products
            ?.filter((item) => {
              return keySearch.toLowerCase()===''?item: item?.nameProd?.toLowerCase().includes(keySearch);
            })
            .map((item, key) => {
              return (
                <tr key={item?.id}>
                  <td>{key + 1}</td>
                  <td>{item.nameProd}</td>
                  <td>
                    <img style={{ width: "100px" }} src={item?.img} alt="" />
                  </td>
                  <td>{item?.price}</td>
                  <td dangerouslySetInnerHTML={{ __html: item?.description }} />
                  <td>{item?.quantity}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(item?.id);
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
    </LayoutAdmin>
  );
};

export default HomeAdmin;
