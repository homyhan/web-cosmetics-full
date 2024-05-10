package web.webbanhang.user;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;

import web.webbanhang.category.Category;
import web.webbanhang.jpa.RoleJpa;
import web.webbanhang.jpa.UserJpa;
import web.webbanhang.product.Product;
import web.webbanhang.role.Role;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@RestController
public class UserController {
	private UserJpa userRepository;	
	private RoleJpa roleRepository;

	
	public UserController(UserJpa userRepository, RoleJpa roleRepository) {
		
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
	}
	
	@GetMapping("/users")
	public List<User> getListUser(){
		return userRepository.findAll();
	}
//	public ResponseEntity<List<User>> retrieveAllUser() {
//	    try {
//	        List<User> users = userRepository.findAll();
//	        return ResponseEntity.ok(users);
//	    } catch (Exception e) {
//	        System.err.println("Error retrieving users: " + e.getMessage());
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//	    }
//	}


	
//	@PostMapping("/users")
//	public ResponseEntity<User> createUser(@RequestBody User user) {
//        if (user.getRole() == null) {
//            System.out.println("Loi 1");
//        }
//
//
//        Optional<Role> existingRole = roleRepository.findById(user.getRole().getRole()+1);
//        Role role = existingRole.get();
//
//        if (role == null) {
//
//        	System.out.println("Loi 2");
//        }
//        user.setRole(role);
//		User addedUser = userRepository.save(user);
//
//		return ResponseEntity.noContent().build();
//	}
//


//	@PostMapping("/users")
//	public ResponseEntity<User> createUser(@RequestBody User user) {
//		if (user.getRole() == null) {
//			System.out.println("Loi 1");
//			return ResponseEntity.badRequest().build();
//		}
//
//		System.out.println(roleRepository.findByRoleCode(user.getRole().getRole()) );
//
//		Optional<Role> existingRole = roleRepository.findByRoleCode(user.getRole().getRole());
//
//		if (existingRole.isEmpty()) {
//			System.out.println("Loi 2");
//			return ResponseEntity.notFound().build();
//		}
//
//		user.setRole(existingRole.get());
//		User addedUser = userRepository.save(user);
//
//		// Trả về 201 Created và thông tin người dùng đã tạo
//		return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
////		return null;
//	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable int id){
		Optional<User> u = userRepository.findById(id);

		return u.get();
	}

	@GetMapping("/usersPage")
	public ResponseEntity<Page<User>> retrieveUser(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size
	) {
		try {
			PageRequest pageRequest = PageRequest.of(page, size);
			Page<User> users = userRepository.findAll(pageRequest);
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			System.err.println("Error retrieving products: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/users")
	public ResponseEntity<String> createUser(@RequestBody User user) {
		User existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email đã tồn tại");
		}else{
			if (user.getRole() == null) {
				System.out.println("Loi 1");
				return ResponseEntity.badRequest().build();
			}

			Role existingRole = roleRepository.findByRoleCode(user.getRole().getRole());

			if (existingRole == null) {
				System.out.println("Loi 2");
				return ResponseEntity.notFound().build();
			}

			user.setRole(existingRole);
			User addedUser = userRepository.save(user);

			if (addedUser != null) {
				return ResponseEntity.status(HttpStatus.OK).body("Đăng kí thành công");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đăng kí thất bại - Lỗi không xác định");
			}

		}

	}




	// Hien thi thong tin user thông qua e mail
	@GetMapping("/user/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		try {
			//Tìm user thong qua email
			User user = userRepository.findByEmail(email);

			//Check xem user co ton tai khong
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			//Tra ve thong tin user
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			System.err.println("Lỗi khi lấy thông tin người dùng: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	@PostMapping("/login")
	public ResponseEntity<String> login(@Validated @RequestBody LoginRequest userLoginRequest) {
		String email = userLoginRequest.getEmail();
		String password = userLoginRequest.getPassword();

		// Thực hiện logic xác thực ở đây, ví dụ:
		User user = userRepository.findByEmail(email);
		if (user != null && user.getPassword().equals(password)) {
			// Kiểm tra role_id của người dùng
			int roleId = user.getRole().getId();
			if (roleId == 1) {
				// Nếu role_id là 1 (admin), trả về chuỗi "admin"
				return ResponseEntity.ok("admin");
			} else if (roleId == 2) {
				// Nếu role_id là 2 (user), trả về chuỗi "user"
				return ResponseEntity.ok("user");
			}
		}
		// Nếu không tìm thấy người dùng hoặc mật khẩu không chính xác, trả về mã lỗi 401
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không chính xác");
	}

//	@PostMapping("/login")
//	public ResponseEntity<User> loginUser(@RequestParam String email, @RequestParam String password) {
//		try {
//			User user = userRepository.findByEmail(email);
//
//			//Check user co ton tai hay ko
//			if (user == null) {
//				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//			}
//
//			if (!user.getPassword().equals(password)) {
//				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//			}
//
//			return ResponseEntity.ok(user);
//		} catch (Exception e) {
//			System.err.println("Lỗi khi đăng nhập: " + e.getMessage());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}
//	@GetMapping("/users/search/{keyword}")
//	public ResponseEntity<List<User>> searchUsersByName(@PathVariable String keyword) {
//		try {
//			System.out.println("Searching users by keyword: " + keyword);
//			List<User> users = userRepository.findByFullNameContainingIgnoreCase(keyword);
//
//			if (users.isEmpty()) {
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//			}
//
//			return ResponseEntity.ok(users);
//		} catch (Exception e) {
//			System.err.println("Lỗi khi tìm kiếm user theo tên: " + e.getMessage());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}

//	@GetMapping("/users/search/{keyword}")
//	public ResponseEntity<List<User>> searchUsersByName(@PathVariable String keyword) {
//		try {
//			// Xử lý chuỗi keyword
//			keyword = keyword.toLowerCase().replaceAll("\\s+", ""); // Chuyển thành chữ thường và loại bỏ khoảng trắng
//			keyword = java.text.Normalizer.normalize(keyword, java.text.Normalizer.Form.NFD)
//					.replaceAll("\\p{M}", ""); // Loại bỏ dấu
//
//			List<User> users = userRepository.findByFullNameContainingIgnoreCase(keyword);
//
//			if (users.isEmpty()) {
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//			}
//
//			return ResponseEntity.ok(users);
//		} catch (Exception e) {
//			System.err.println("Lỗi khi tìm kiếm user theo tên: " + e.getMessage());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}


	@GetMapping("/users/search/{keyword}")
	public ResponseEntity<List<User>> searchUsersByName(@PathVariable String keyword) {
		try {
			// Chuyển về chữ thường
			keyword = keyword.toLowerCase();

			// Loại bỏ dấu
			keyword = removeAccents(keyword);

			List<User> users = userRepository.findByFullNameContainingIgnoreCase(keyword);

			if (users.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			return ResponseEntity.ok(users);
		} catch (Exception e) {
			System.err.println("Lỗi khi tìm kiếm user theo tên: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// Hàm loại bỏ dấu
	private String removeAccents(String input) {
		String[] accentChars = {"à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ"};
		String[] noAccentChars = {"a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "I", "I", "I", "I", "I", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "Y", "Y", "Y", "Y", "Y", "D"};

		for (int i = 0; i < accentChars.length; i++) {
			input = input.replace(accentChars[i], noAccentChars[i]);
		}

		return input;
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
		try {
			// Tìm người dùng cần cập nhật trong cơ sở dữ liệu
			Optional<User> optionalUser = userRepository.findById(id);

			// Kiểm tra xem người dùng có tồn tại không
			if (!optionalUser.isPresent()) {
				return ResponseEntity.notFound().build();
			}

			User existingUser = optionalUser.get();

			// Cập nhật thông tin người dùng với dữ liệu mới
			existingUser.setFullName(updatedUser.getFullName());
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setAddress(updatedUser.getAddress());
			existingUser.setPhone(updatedUser.getPhone());
			existingUser.setPassword(updatedUser.getPassword());

			// Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
			User update = userRepository.save(existingUser);

			if (update != null) {
				return ResponseEntity.status(HttpStatus.OK).body("Chỉnh sửa thông tin thành công");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Chỉnh sửa thoong tin thất bại - Lỗi không xác định");
			}
		} catch (Exception e) {
			System.err.println("Lỗi khi cập nhật thông tin người dùng: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@PutMapping("/edituser/{id}")
	public ResponseEntity<String> updateUserforAdmin(@PathVariable int id, @RequestBody User updatedUser) {
		try {
			// Tìm người dùng cần cập nhật trong cơ sở dữ liệu
			Optional<User> optionalUser = userRepository.findById(id);

			// Kiểm tra xem người dùng có tồn tại không
			if (!optionalUser.isPresent()) {
				return ResponseEntity.notFound().build();
			}

			User existingUser = optionalUser.get();

			// Cập nhật thông tin người dùng với dữ liệu mới
			existingUser.setFullName(updatedUser.getFullName());
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setAddress(updatedUser.getAddress());
			existingUser.setPhone(updatedUser.getPhone());

			// Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
			User update = userRepository.save(existingUser);

			if (update != null) {
				return ResponseEntity.status(HttpStatus.OK).body("Chỉnh sửa thông tin người dùng thành công");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Chỉnh sửa thông tin thất bại");
			}
		} catch (Exception e) {
			System.err.println("Lỗi khi cập nhật thông tin người dùng: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@PutMapping("/user/{id}")
	public ResponseEntity<String> updateUserStatus(@PathVariable int id, @RequestBody Map<String, Integer> statusMap) {
		try {
			// Tìm người dùng cần cập nhật trạng thái trong cơ sở dữ liệu
			Optional<User> optionalUser = userRepository.findById(id);

			// Kiểm tra xem người dùng có tồn tại không
			if (!optionalUser.isPresent()) {
				return ResponseEntity.notFound().build();
			}

			User user = optionalUser.get();

			// Kiểm tra xem status có tồn tại trong body không
			if (!statusMap.containsKey("status")) {
				return ResponseEntity.badRequest().build();
			}

			int status = statusMap.get("status");

			// Kiểm tra xem trạng thái nhập vào có hợp lệ không (0 hoặc 1)
			if (status == 0) {
				// Vô hiệu hóa người dùng
				user.setStatus(status);
				userRepository.save(user);
				return ResponseEntity.status(HttpStatus.OK).body("Vô hiệu hóa người dùng thành công");
			} else if (status == 1) {
				// Kích hoạt tài khoản người dùng
				user.setStatus(status);
				userRepository.save(user);
				return ResponseEntity.status(HttpStatus.OK).body("Kích hoạt tài khoản thành công");
			} else {
				// Trạng thái không hợp lệ
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Vô hiệu hóa người dùng thất bại");
			}
		} catch (Exception e) {
			System.err.println("Lỗi khi cập nhật trạng thái người dùng: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/users/{id}/password")
	public ResponseEntity<User> changePassword(@PathVariable int id, @RequestBody Map<String, String> passwordMap) {
		try {
			// Tìm người dùng cần thay đổi mật khẩu trong cơ sở dữ liệu
			Optional<User> optionalUser = userRepository.findById(id);

			// Kiểm tra xem người dùng có tồn tại không
			if (!optionalUser.isPresent()) {
				return ResponseEntity.notFound().build();
			}

			User user = optionalUser.get();

			// Kiểm tra xem passwordMap có chứa trường password mới không
			if (!passwordMap.containsKey("password")) {
				return ResponseEntity.badRequest().build();
			}

			String newPassword = passwordMap.get("password");

			// Cập nhật mật khẩu mới cho người dùng
			user.setPassword(newPassword);

			// Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
			userRepository.save(user);

			return ResponseEntity.ok(user);
		} catch (Exception e) {
			System.err.println("Lỗi khi thay đổi mật khẩu: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	private void sendMail(String toEmail, String newPassword){
		final String fromEmail = "cosmetics.com.vn@gmail.com";
		final String password = "fnuhsfaqmfongbzm";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(fromEmail, password);
			}
		});

		try {
			String content = "<!DOCTYPE html>\n" +
					"<html lang=\"en\">\n" +
					"<head>\n" +
					"    <meta charset=\"UTF-8\">\n" +
					"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
					"    <title>Document</title>\n" +
					"</head>\n" +
					"<body>\n" +
					"    <h3>Cosmetics nhận được yêu cầu <span style=\"color: red;\"><b>CẤP LẠI MẬT KHẨU</b></span> từ quý khách</h3>\n" +

					"    <p>Mật khẩu mới được tạo là: "+newPassword+" </p>\n" +
					"    <p>Cảm ơn quý khách đã tin chọn Cosmetics</p>\n" +
					"    <p>Mọi thắc mắc xin vui lòng liên hệ:</p>\n" +
					"    <p>Số điện thoại: 0270399999</p>\n" +
					"    <p>Email: cosmetics.com.vn@gmail.com</p>\n" +
					"</body>\n" +
					"</html>";
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(fromEmail));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
			message.setSubject("THAY ĐỔI MẬT KHẨU");
			message.setContent(content, "text/html; charset=utf-8");
			Transport.send(message);
			System.out.println("Email sent successfully.");
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@PostMapping("/users/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> emailObj) {
		User user = userRepository.findByEmail(emailObj.get("email"));
		String newPass = emailObj.get("newPass");
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại trong hệ thống");
		}
		sendMail(emailObj.get("email"), newPass);
		return ResponseEntity.status(HttpStatus.OK).body("Vui lòng kiểm tra email để đặt lại mật khẩu");
	}

	private String generateRandomString(int length) {
		final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

		SecureRandom random = new SecureRandom();
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			int randomIndex = random.nextInt(CHARACTERS.length());
			sb.append(CHARACTERS.charAt(randomIndex));
		}
		return sb.toString();
	}

	@GetMapping("/generatePass")
	private ResponseEntity<String> generatePassword(){
		String res = generateRandomString(8);
		return  ResponseEntity.status(HttpStatus.OK).body(res);
	}

}
