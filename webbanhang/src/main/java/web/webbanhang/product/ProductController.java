package web.webbanhang.product;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanhang.category.Category;
import web.webbanhang.jpa.CategoryJpa;
import web.webbanhang.jpa.ProductJpa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    private ProductJpa productRepositoty;

    private CategoryJpa categoryRepository;

    public ProductController(ProductJpa productRepositoty, CategoryJpa categoryRepository) {
        this.productRepositoty = productRepositoty;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/products")
    public ResponseEntity<String> createProduct(@RequestBody Product product){
       Category cate = categoryRepository.findByNameCategory(product.getCategory().getNameCategory());

        if (cate == null) {

            System.out.println("Loi 2");
        }

        product.setCategory(cate);
        Product addedProd = productRepositoty.save(product);
        if (addedProd != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Thêm sản phẩm mới thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm sản phẩm mới thất bại - Lỗi không xác định");
        }
//        return ResponseEntity.noContent().build();
    }
    @GetMapping("/products")
    public ResponseEntity<List<Product>> retrieveAllProduct() {
        try {
            List<Product> products = productRepositoty.findAll();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Error retrieving users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @GetMapping("/productsPage")
//    public ResponseEntity<Page<Product>> retrieveAllProduct(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size
//    ) {
//        try {
//            PageRequest pageRequest = PageRequest.of(page, size);
//            Page<Product> products = productRepositoty.findAll(pageRequest);
//            return ResponseEntity.ok(products);
//        } catch (Exception e) {
//            System.err.println("Error retrieving products: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//@GetMapping("/productsPage")
//public ResponseEntity<Page<Product>> retrieveAllProduct(
//        @RequestParam(defaultValue = "0") int page,
//        @RequestParam(defaultValue = "10") int size
//) {
//    try {
//        PageRequest pageRequest = PageRequest.of(page, size);
//        Page<Product> products = productRepositoty.findAll(pageRequest);
//        products.forEach(product -> System.out.println(product)); // In từng sản phẩm ra log
//        System.out.println("------------");
//        System.out.println(products.stream().toList());
//        return ResponseEntity.ok(products);
//    } catch (Exception e) {
//        e.printStackTrace();
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//}

    @GetMapping("/productsPage")
    public ResponseEntity<Page<Product>> retrieveAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<Product> products = productRepositoty.findAll(pageRequest);
            System.out.println("Number of products: " + products.getTotalElements());
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/searchProducts")
    public ResponseEntity<Page<Product>> searchProductsByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> products = productRepositoty.findByNameProdContainingIgnoreCase(name, pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/products1")
    public Page<Product> getProducts(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size) {
        // Tạo đối tượng PageRequest để phân trang và sắp xếp
        PageRequest pageable = PageRequest.of(page, size);

        // Gọi phương thức findAll() của repository để lấy dữ liệu theo trang và kích thước trang
        Page<Product> products = productRepositoty.findAll(pageable);
        products.forEach(product -> System.out.println(product));
        return products;
    }

//    @GetMapping("/products")
//    public ResponseEntity<?> retrieveAllProduct(
//            @RequestParam(required = false, defaultValue = "0") Integer page,
//            @RequestParam(required = false, defaultValue = "10") Integer size
//    ) {
//        try {
//            if (page != null && size != null) {
//                PageRequest pageRequest = PageRequest.of(page, size);
//                Page<Product> products = productRepositoty.findAll(pageRequest);
//                return ResponseEntity.ok(products);
//            } else {
//                List<Product> products = productRepositoty.findAll();
//                return ResponseEntity.ok(products);
//            }
//        } catch (Exception e) {
//            System.err.println("Error retrieving products: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable int id){
        Product prod = productRepositoty.findById(id).get();
        return prod;
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        Optional<Product> optionalProduct = productRepositoty.findById(id);

        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product existingProduct = optionalProduct.get();

        existingProduct.setNameProd(updatedProduct.getNameProd());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setImg(updatedProduct.getImg());
        existingProduct.setQuantity(updatedProduct.getQuantity());

        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setCategory(updatedProduct.getCategory());

        Category updatedCategory = updatedProduct.getCategory();
        if (updatedCategory != null) {
            Category existingCategory = categoryRepository.findByNameCategory(updatedCategory.getNameCategory());
            if (existingCategory == null) {
                return ResponseEntity.badRequest().body("Category not found");
            }
            existingProduct.setCategory(existingCategory);
        }

       Product newProd = productRepositoty.save(existingProduct);
        if (newProd != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Cập nhật sản phẩm thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật sản phẩm thất bại - Lỗi không xác định");
        }
//        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        Optional<Product> optionalProduct = productRepositoty.findById(id);

        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product productToDelete = optionalProduct.get();
        productRepositoty.delete(productToDelete);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products/search/{keyword}")
    public ResponseEntity<List<Product>> searchProductsByName(@PathVariable String keyword) {
        try {
            // Xử lý chuỗi keyword
            keyword = keyword.toLowerCase().replaceAll("\\s+", ""); // Chuyển thành chữ thường và loại bỏ khoảng trắng

            // Tìm sản phẩm bằng tên tương ứng
            List<Product> products = productRepositoty.findByNameProdContainingIgnoreCase(keyword);

            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Error searching products by name: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
