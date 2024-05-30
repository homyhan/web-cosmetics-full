package web.webbanhang.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanhang.product.Product;
import web.webbanhang.user.User;

import java.util.List;

public interface ProductJpa extends JpaRepository<Product, Integer>{
    List<Product> findByNameProdContainingIgnoreCase(String keyword);
    Page<Product> findByNameProdContainingIgnoreCase(String name, Pageable pageable);
}
