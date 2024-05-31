package web.webbanhang.dto;

import java.util.Date;

public class CartDTO {
    private int id;
    private int userId;
    private ProductDTO product;
    private int quantity;
    private Date orderDate;

    public CartDTO(){

    }

    public CartDTO(int id, int userId, ProductDTO product, int quantity, Date orderDate) {
        this.id = id;
        this.userId = userId;
        this.product = product;
        this.quantity = quantity;
        this.orderDate = orderDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    @Override
    public String toString() {
        return "CartDTO{" +
                "id=" + id +
                ", userId=" + userId +
                ", product=" + product +
                ", quantity=" + quantity +
                ", orderDate=" + orderDate +
                '}';
    }
}
