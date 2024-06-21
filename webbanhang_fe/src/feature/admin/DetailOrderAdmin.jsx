import React, {useEffect} from 'react'
import LayoutAdmin from '../../HOCs/LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchDetailOrder} from "./thunk";
import _ from 'lodash';


const DetailOrderAdmin = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.admin.detail);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchDetailOrder(orderId)); // Fetch order details when component mounts
    }
  }, [dispatch, orderId]);

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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID đơn hàng</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Giá sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.orders.id}</td>
              <td>{item.orders.address}</td>
              <td>{item.product.nameProd}</td>
              <td>
                <img src={item.product.img} alt={item.product.nameProd} width={100} />
              </td>
              <td>{item.quantity}</td>
              <td>{formatCurrencyVND(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
};

export default DetailOrderAdmin;