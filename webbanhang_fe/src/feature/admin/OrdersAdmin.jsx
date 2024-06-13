import React, { useCallback, useEffect, useState } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchOrders } from "./thunk";
import _ from 'lodash';


const OrdersAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.admin.orders);

  useEffect(() => {
    dispatch(fetchOrders); // Fetch orders when component mounts
  }, [dispatch]);

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
      <div className='mb-3'>
        <input
        type="text"
        className="form-control"
        placeholder="search by name"
      />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã khách hàng</th>            
            <th scope="col">Tên khách hàng</th>  
            <th scope="col">Số điện thoại</th>            
            <th scope="col">Email</th>             
            <th scope="col">Tổng tiền</th> 
            <th scope="col">Trạng thái</th>        
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => (
            <tr key={order.id}>
              <th scope="row">{index + 1}</th>
              <td>{order.user.id}</td>
              <td>{order.user.fullName}</td>
              <td>{order.user.phone}</td>
              <td>{order.user.email}</td>
              <td>{formatCurrencyVND(order.totalPrice)}</td>
              <td>{order.stateOrder.state_name}</td>
              <td>
                <button >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={()=>{navigate("/admin/order-detail/"+order?.id)}}>
                          <i className="fa-solid fa-eye"></i>
                        </button>
                <button>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </LayoutAdmin>
  )
}

export default OrdersAdmin;