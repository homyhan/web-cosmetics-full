package web.webbanhang.comment;

import web.webbanhang.product.Product;
import web.webbanhang.user.User;

import java.time.LocalDateTime;

public class CommentRequest {
    private int userId;
    private int productId;
    private String contentComment;
    private int quantityStart;

    private LocalDateTime dateTime;

    public CommentRequest() {
    }

    public CommentRequest(int userId, int productId, String contentComment, int quantityStart, LocalDateTime dateTime) {
        this.userId = userId;
        this.productId = productId;
        this.contentComment = contentComment;
        this.quantityStart = quantityStart;
        this.dateTime = dateTime;
    }


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getContentComment() {
        return contentComment;
    }

    public void setContentComment(String contentComment) {
        this.contentComment = contentComment;
    }

    public int getQuantityStart() {
        return quantityStart;
    }

    public void setQuantityStart(int quantityStart) {
        this.quantityStart = quantityStart;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public String toString() {
        return "CommentRequest{" +
                "userId=" + userId +
                ", productId=" + productId +
                ", contentComment='" + contentComment + '\'' +
                ", quantityStart=" + quantityStart +
                ", dateTime=" + dateTime +
                '}';
    }
}
