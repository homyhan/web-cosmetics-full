package web.webbanhang.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


    @GetMapping("/searchCate")
    public ResponseEntity<Page<Category>> searchCateByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Category> categories = categoryRepository.findByNameCategoryContainingIgnoreCase(name, pageable);
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/categoriesPage")
    public ResponseEntity<Page<Category>> retrieveAllCate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<Category> categories = categoryRepository.findAll(pageRequest);
            System.out.println("Number of products: " + categories.getTotalElements());
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
