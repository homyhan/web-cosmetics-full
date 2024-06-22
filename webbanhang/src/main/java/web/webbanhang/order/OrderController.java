package web.webbanhang.order;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanhang.jpa.OrderDetailJpa;
import web.webbanhang.jpa.OrderJpa;
import web.webbanhang.jpa.StateOrderJpa;
import web.webbanhang.jpa.UserJpa;
import web.webbanhang.stateOrder.StateOrder;
import web.webbanhang.user.User;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class OrderController {
    private UserJpa userJpa;
    private OrderJpa orderJpa;

    private StateOrderJpa stateOrderJpa;
    private OrderDetailJpa orderDetailJpa;

    public OrderController(UserJpa userJpa, OrderJpa orderJpa, StateOrderJpa stateOrderJpa, OrderDetailJpa orderDetailJpa) {
        this.userJpa = userJpa;
        this.orderJpa = orderJpa;
        this.stateOrderJpa = stateOrderJpa;
        this.orderDetailJpa = orderDetailJpa;
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Orders>> getUserOrders(@PathVariable int userId) {
        try {
            Optional<User> optionalUser = userJpa.findById(userId);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            User user = optionalUser.get();
            List<Orders> userOrders = orderJpa.findByUser(user);

            return ResponseEntity.ok(userOrders);
        } catch (Exception e) {
            System.err.println("Error getting user's orders: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/orders")
    public ResponseEntity<Page<Orders>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Orders> allOrders = orderJpa.findAll(pageable);
            return ResponseEntity.ok(allOrders);
        } catch (Exception e) {
            System.err.println("Error getting all orders: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

//    @GetMapping("/orders")
//    public ResponseEntity<List<Orders>> getAllOrders() {
//        try {
//            List<Orders> allOrders = orderJpa.findAll();
//            return ResponseEntity.ok(allOrders);
//        } catch (Exception e) {
//            System.err.println("Error getting all orders: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
    @PutMapping("/orders/{orderId}/state")
    public ResponseEntity<String> updateOrderStatePut(@PathVariable int orderId, @RequestBody Map<String, Integer> requestBody) {
        try {
            // Lay stateOrderId tu requestBody
            int stateOrderId = requestBody.get("stateOrderId");
            Optional<Orders> optionalOrder = orderJpa.findById(orderId);
            //Check xem don hang co ton tai hay khong
            if (!optionalOrder.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Lay don hang
            Orders order = optionalOrder.get();
            //Tim id cua trang thai moi co ton tai trong csdl hay khong
            StateOrder newStateOrder = stateOrderJpa.findById(stateOrderId).orElse(null);
            if (newStateOrder == null) {
                return ResponseEntity.badRequest().body("Invalid state order");
            }

            //Cap nhat lai trang thai moi
            order.setStateOrder(newStateOrder);
            //Luu don hang
            orderJpa.save(order);

            return ResponseEntity.ok("Order state updated successfully");
        } catch (Exception e) {
            System.err.println("Error updating order state: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order state");
        }
    }

    @GetMapping("/order-details/{orderId}")
    public List<OrderDetail> getOrderDetailsByOrderId(@PathVariable int orderId) {
        return orderDetailJpa.findByOrdersId(orderId);
    }

//    @GetMapping("/orderDetail/{productId}")
//    public List<OrderDetail> getOrderDetailsByProductId(@PathVariable int productId) {
//        return orderDetailJpa.findByProductId(productId);
//    }

    public List<OrderDetail> getOrderDetailsByProductId(int productId) {
        return orderDetailJpa.findByProductId(productId);
    }
    @GetMapping("/orderDetail/{productId}/user/{userId}")
    public boolean isUserInOrderDetails(@PathVariable int productId, @PathVariable int userId) {
        List<OrderDetail> orderDetails = getOrderDetailsByProductId(productId);
        return orderDetails.stream()
                .anyMatch(orderDetail -> orderDetail.getOrders().getUser().getId() == userId);
    }

    @GetMapping("/orders/searchByUserId")
    public ResponseEntity<Page<Orders>> searchOrdersByUserId(
            @RequestParam int userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Orders> orders = orderJpa.findByUserId(userId, pageable);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            System.err.println("Error searching orders by user ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/orders/monthly-sales")
    public ResponseEntity<List<Double>> getMonthlySales() {
        try {
            List<Orders> allOrders = orderJpa.findAll();
            double[] monthlySales = new double[12];

            allOrders.forEach(order -> {
                int month = order.getOrderDate().getMonth();
                monthlySales[month] += order.getTotalPrice();
            });

            List<Double> monthlySalesList = Arrays.stream(monthlySales)
                    .boxed()
                    .collect(Collectors.toList());

            return ResponseEntity.ok(monthlySalesList);
        } catch (Exception e) {
            System.err.println("Error calculating monthly sales: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}

