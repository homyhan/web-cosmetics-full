package web.webbanhang.dto;

public class ProductDTO {
    private int id;
    private String nameProd;
    private double price;
    private String img;
    private int quantity;
    private String description;
    private CategoryDTO category;

    public ProductDTO(){

    }

    public ProductDTO(int id, String nameProd, double price, String img, int quantity, String description, CategoryDTO category) {
        this.id = id;
        this.nameProd = nameProd;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
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

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", nameProd='" + nameProd + '\'' +
                ", price=" + price +
                ", img='" + img + '\'' +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +
                ", category=" + category +
                '}';
    }
}
