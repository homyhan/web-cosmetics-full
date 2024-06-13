package web.webbanhang.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.webbanhang.order.Orders;
import web.webbanhang.user.User;

import java.util.List;

public interface OrderJpa extends JpaRepository<Orders, Integer> {
    List<Orders> findByUser(User user);
    @Query("SELECT o FROM Orders o WHERE o.user.id = :userId")
    Page<Orders> findByUserId(@Param("userId") int userId, Pageable pageable);
}
