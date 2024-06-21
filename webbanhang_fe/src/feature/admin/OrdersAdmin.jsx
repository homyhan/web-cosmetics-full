import React, { useCallback, useEffect, useState } from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchOrders, fetchOrdersByUserID, updateStateOrder } from "./thunk";
import _ from 'lodash';
import Swal from "sweetalert2";
import { Pagination } from "antd";


const OrdersAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.admin.orders);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
    dispatch(fetchOrders(page-1, 8)); // Fetch orders when component mounts
  }, [dispatch, searchParam]);

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      dispatch(fetchOrdersByUserID(term, 0, 8));
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
    
  const handleUpdateState = async (orderId) => {
    try {
      const data = { stateOrderId: 2 }; // Example: 2 represents the new state (e.g., approved)
      const result = await dispatch(updateStateOrder(orderId, data));
      if (result) {
        // Show success message if update is successful
        Swal.fire('Success', 'Order state updated successfully', 'success');
        const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
        dispatch(fetchOrders(page-1, 8)); 
      } else {
        // Show error message if update fails
        Swal.fire('Error', 'Failed to update order state', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to update order state', 'error');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const data = { stateOrderId: 5 }; // Example: 2 represents the new state (e.g., approved)
      const result = await dispatch(updateStateOrder(orderId, data));
      if (result) {
        // Show success message if update is successful
        Swal.fire('Success', 'Order state updated successfully', 'success');
        const page = searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1;
        dispatch(fetchOrders(page-1, 8)); 
      } else {
        // Show error message if update fails
        Swal.fire('Error', 'Failed to update order state', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to update order state', 'error');
    }
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
        {orders?.content?.map((order, index) => (
            <tr key={order.id}>
              <th scope="row">{index + 1}</th>
              <td>{order.user.id}</td>
              <td>{order.user.fullName}</td>
              <td>{order.user.phone}</td>
              <td>{order.user.email}</td>
              <td>{formatCurrencyVND(order.totalPrice)}</td>
              <td>{order.stateOrder.state_name}</td>
              <td>
              {order.stateOrder.state !== 5 && ( // Chỉ hiển thị button khi trạng thái là 1
                                    <button onClick={()=>{navigate("/admin/edit-stateOrder/"+order?.id)}} >
                                       <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                )}
                {order.stateOrder.state === 1 && ( // Chỉ hiển thị button khi trạng thái là 1
                                    <button onClick={() => handleUpdateState(order.id)} >
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                )}
                <button onClick={()=>{navigate("/admin/order-detail/"+order?.id)}}>
                          <i className="fa-solid fa-eye"></i>
                        </button>
                {order.stateOrder.state === 1 && (
                  <button onClick={() => handleCancelOrder(order.id)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="text-center my-4"
        current={searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1}
        pageSize={8}
        total={orders?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />
      
    </LayoutAdmin>
  )
}

export default OrdersAdmin;