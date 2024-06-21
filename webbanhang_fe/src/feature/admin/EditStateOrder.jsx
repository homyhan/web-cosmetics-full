import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { fetchDetailOrder, updateStateOrder } from "./thunk";
import Swal from "sweetalert2";

const EditStateOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.admin.detail);
  const [stateOrderId, setStateOrderId] = useState("");
  const orders = useSelector(state => state.admin.orders);
  useEffect(() => {
    dispatch(fetchDetailOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (detail && detail.stateOrder) {
      setStateOrderId(detail.stateOrder.id);
    }
  }, [detail]);

  const handleChange = (event) => {
    setStateOrderId(event.target.value);
  };

  const handleSave = async () => {
    try {
      const data = { stateOrderId: parseInt(stateOrderId, 5) };
      await dispatch(updateStateOrder(orderId, data));
      Swal.fire("Success", "Order state updated successfully", "success");
      navigate("/admin/orders");
    } catch (error) {
      Swal.fire("Error", "Error updating order state", "error");
    }
  };

  return (
    <LayoutAdmin>
      <div className="mb-3">
        <label className="form-label">Cập nhật trạng thái đơn hàng</label>
        <input
          type="text"
          className="form-control"
          value={stateOrderId}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </LayoutAdmin>
  );
};

export default EditStateOrder;
