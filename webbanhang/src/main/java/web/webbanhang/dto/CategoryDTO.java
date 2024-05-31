package web.webbanhang.dto;

public class CategoryDTO {
    private int id;
    private String nameCategory;

    public CategoryDTO(int id, String nameCategory) {
        this.id = id;
        this.nameCategory = nameCategory;
    }

    public CategoryDTO() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameCategory() {
        return nameCategory;
    }

    public void setNameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
    }

    @Override
    public String toString() {
        return "CategoryDTO{" +
                "id=" + id +
                ", nameCategory='" + nameCategory + '\'' +
                '}';
    }
}
