package web.webbanhang.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import web.webbanhang.category.Category;
import web.webbanhang.comment.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Product {
    @Id
    @GeneratedValue
    private int id;

    private String nameProd;

    private double price;

    private String img;

    private int quantity;

    private String description;



//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "category_id")
//    @JsonBackReference

    // Trong lớp Product
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
//    @JsonBackReference
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();


    public Product(int id, String nameProd, double price, String img, int quantity, String description, Category category, List<Comment> comments) {
        this.id = id;
        this.nameProd = nameProd;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
        this.description = description;

        this.category = category;
        this.comments = comments;
    }

    public Product() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameProd() {
        return nameProd;
    }

    public void setNameProd(String nameProd) {
        this.nameProd = nameProd;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }






    //    @Override
//    public String toString() {
//        return "Product{" +
//                "id=" + id +
//                ", nameProd='" + nameProd + '\'' +
//                ", price=" + price +
//                ", img='" + img + '\'' +
//                ", quantity=" + quantity +
//                ", description='" + description + '\'' +
//                ", category=" + (category != null ? category.getNameCategory() : "null") +
//                '}';
//    }


    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", nameProd='" + nameProd + '\'' +
                ", price=" + price +
                ", img='" + img + '\'' +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +

                ", category=" + (category != null ? category.getNameCategory() : "null") +
                ", comments=" + comments +
                '}';
    }


}
