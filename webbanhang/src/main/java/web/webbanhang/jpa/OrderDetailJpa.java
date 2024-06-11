package web.webbanhang.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanhang.order.OrderDetail;

import java.util.List;

public interface OrderDetailJpa extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrdersId(int orderId);

    List<OrderDetail> findByProductId(int productId);
}