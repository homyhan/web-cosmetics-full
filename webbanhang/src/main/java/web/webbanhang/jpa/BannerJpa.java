package web.webbanhang.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.webbanhang.banners.Banners;
import web.webbanhang.category.Category;

public interface BannerJpa extends JpaRepository<Banners, Integer> {
//    Page<Banners> findByNameBannerContainingIgnoreCase(String name, Pageable pageable);
//Page<Banners> findByName_bannerContainingIgnoreCase(@Param("name") String name, Pageable pageable);
@Query("SELECT b FROM Banners b WHERE b.name_banner LIKE %:name%")
Page<Banners> findByCustomQuery(String name, Pageable pageable);
}
