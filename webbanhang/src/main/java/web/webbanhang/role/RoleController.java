package web.webbanhang.role;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import web.webbanhang.jpa.RoleJpa;
import web.webbanhang.user.User;

@RestController
public class RoleController {
	
	private RoleJpa roleRepository;

	public RoleController(RoleJpa roleRepository) {
		super();
		this.roleRepository = roleRepository;
	}

	@PostMapping("/roles")
	public ResponseEntity<String> createRoles(@RequestBody Role role) {
		Role existingRole = roleRepository.findByNameRole(role.getNameRole());
		if (existingRole != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Role đã tồn tại");
		}
		roleRepository.save(role);
		return ResponseEntity.status(HttpStatus.OK).body("Thêm role mới thành công");
	}
	@GetMapping("/roles")
	public List<Role> retrieveAllUser(){
		return roleRepository.findAll();
	}
	@GetMapping("/roles/{id}")
	public Role getRoleById(@PathVariable int id){
		Role role = roleRepository.findById(id).get();
		return role;
	}

	@DeleteMapping("/roles/{id}")
	public ResponseEntity<String> deleteRoleById(@PathVariable int id) {
		Optional<Role> roleOptional = roleRepository.findById(id);
		if (roleOptional.isPresent()) {
			roleRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Xóa role thành công");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy role có ID: " + id);
		}
	}


	@PutMapping("/roles/{id}")
	public ResponseEntity<String> updateRole(@PathVariable int id, @RequestBody Role updatedRole) {
		Optional<Role> roleOptional = roleRepository.findById(id);
		if (!roleOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy role có ID: " + id);
		}

		Role existingRole = roleOptional.get();

		Role roleWithSameName = roleRepository.findByNameRole(updatedRole.getNameRole());
		if (roleWithSameName != null ) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Role name đã tồn tại");
		}

		existingRole.setNameRole(updatedRole.getNameRole());
//		existingRole.setRole(updatedRole.getRole());
		roleRepository.save(existingRole);

		return ResponseEntity.status(HttpStatus.OK).body("Cập nhật role thành công");
	}


}