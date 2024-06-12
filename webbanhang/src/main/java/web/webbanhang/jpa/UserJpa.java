package web.webbanhang.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import web.webbanhang.user.User;

import java.util.List;
import java.util.Optional;

public interface UserJpa extends JpaRepository<User, Integer>{

    User findByEmail(String email);

    List<User> findByFullNameContainingIgnoreCase(String keyword);
    Page<User> findByFullNameContaining(String fullName, Pageable pageable);
}
