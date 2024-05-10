package web.webbanhang.category;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanhang.jpa.CategoryJpa;
import web.webbanhang.product.Product;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    private CategoryJpa categoryRepository;

    public CategoryController(CategoryJpa categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/category")
    public ResponseEntity<String> createCategory(@RequestBody Category category){
        if (categoryRepository.existsByNameCategory(category.getNameCategory())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Danh mục đã tồn tại");
        }
       Category cateSaved= categoryRepository.save(category);
        if (cateSaved != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Thêm danh mục thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm danh mục thất bại - Lỗi không xác định");
        }
    }

    @GetMapping("/category")
    public List<Category> getListCategory(){
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    public Category getCategoryById(@PathVariable int id){
        Optional<Category> c = categoryRepository.findById(id);

        return c.get();
    }


    @PutMapping("/category/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable int id, @RequestBody Category updatedCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (!optionalCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Category existingCategory = optionalCategory.get();

//        if(categoryRepository.existsByNameCategory(updatedCategory.getNameCategory())){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Danh mục đã tồn tại");
//        }

        existingCategory.setNameCategory(updatedCategory.getNameCategory());

        Category newCategory = categoryRepository.save(existingCategory);
        if (newCategory != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Sửa danh mục thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sửa danh mục thất bại - Lỗi không xác định");
        }
//        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (!optionalCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Category categoryToDelete = optionalCategory.get();
        categoryRepository.delete(categoryToDelete);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/search/{keyword}")
    public ResponseEntity<List<Category>> searchCategoriesByName(@PathVariable String keyword) {
        try {
            // Xử lý chuỗi keyword
            keyword = keyword.toLowerCase().replaceAll("\\s+", ""); // Chuyển thành chữ thường và loại bỏ khoảng trắng

            // Tìm category bằng tên tương ứng
            List<Category> categories = categoryRepository.findByNameCategoryContainingIgnoreCase(keyword);

            if (categories.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            System.err.println("Error searching categories by name: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
