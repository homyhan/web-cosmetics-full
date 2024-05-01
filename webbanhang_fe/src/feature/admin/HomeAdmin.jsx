import React, { useEffect } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../booking/thunk";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.booking.products);
  useEffect(() => {
    dispatch(fetchProducts);
  }, []);
  return (
    <LayoutAdmin>
       <div style={{textAlign:'right', marginBottom:'20px'}}><button>Add Product New</button></div> 
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
          {products?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key+1}</td>
                <td>{item.nameProd}</td>
                <td>
                  <img style={{width:'100px'}} src={item?.img} alt="" />
                </td>
                <td>{item?.price}</td>
                <td>{item?.description}</td>
                <td>{item?.quantity}</td>
                <td>
                  <button>
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
  );
};

export default HomeAdmin;
