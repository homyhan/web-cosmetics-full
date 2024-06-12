package web.webbanhang.banners;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanhang.category.Category;
import web.webbanhang.jpa.BannerJpa;

import java.util.List;
import java.util.Optional;

@RestController
public class BannersController {
    private BannerJpa bannerJpa;

    public BannersController(BannerJpa bannerJpa) {
        this.bannerJpa = bannerJpa;
    }

    @PostMapping("/banner")
    public ResponseEntity<String> createBanner(@RequestBody Banners banners) {
        Banners addedBanner = bannerJpa.save(banners);
        if (addedBanner != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Thêm banner mới thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm banner mới thất bại - Lỗi không xác định");
        }
    }
    @GetMapping("/banners")
    public ResponseEntity<List<Banners>> getAllBanners() {
        try {
            List<Banners> banners = bannerJpa.findAll();
            return ResponseEntity.ok(banners);
        } catch (Exception e) {
            System.err.println("Error retrieving users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/banner/{id}")
    public Banners getBannerById(@PathVariable int id){
        Banners banner = bannerJpa.findById(id).get();
        return banner;
    }

    @PutMapping("/banners/{id}")
    public ResponseEntity<String> updateBanner(@PathVariable int id, @RequestBody Banners updatedBanner) {
        Optional<Banners> optionalBanner = bannerJpa.findById(id);

        if (!optionalBanner.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Banners existingBanner = optionalBanner.get();

        existingBanner.setName_banner(updatedBanner.getName_banner());
        existingBanner.setImg(updatedBanner.getImg());
        existingBanner.setContent(updatedBanner.getContent());

        Banners newBanner = bannerJpa.save(existingBanner);
        if (newBanner != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Chỉnh sửa thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Chỉnh sửa thất bại - Lỗi không xác định");
        }
    }

    @DeleteMapping("/banners/{id}")
    public ResponseEntity<String> deleteBanner(@PathVariable int id) {
        Optional<Banners> optionalBanner = bannerJpa.findById(id);

        if (!optionalBanner.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Banners bannerToDelete = optionalBanner.get();
        bannerJpa.delete(bannerToDelete);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/searchBanner")
    public ResponseEntity<Page<Banners>> searchBannersByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
            ) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Banners> banners = bannerJpa.findByCustomQuery(name, pageable);
            return ResponseEntity.ok(banners);
        } catch (Exception e) {
            System.err.println("Error searching banners by name: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/bannersPage")
    public ResponseEntity<Page<Banners>> getAllBanners(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Banners> banners = bannerJpa.findAll(pageable);
            return ResponseEntity.ok(banners);
        } catch (Exception e) {
            System.err.println("Error retrieving banners: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
