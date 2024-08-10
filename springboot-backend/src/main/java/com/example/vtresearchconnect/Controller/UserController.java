package com.example.vtresearchconnect.Controller;

import com.example.vtresearchconnect.DTO.SignUpRequest;
import com.example.vtresearchconnect.Entity.Lab;
import com.example.vtresearchconnect.Entity.Professor;
import com.example.vtresearchconnect.Entity.User;
import com.example.vtresearchconnect.Repository.*;
import com.example.vtresearchconnect.Service.EmailService;
import com.example.vtresearchconnect.Service.UserService;
import com.example.vtresearchconnect.Util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.vtresearchconnect.Entity.Student;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private CollegeRepository collegeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    @Value("${app.confirmation.api.link}")
    private String apiLinkBase;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        String username = loginRequest.getUsername().toLowerCase();
        String password = loginRequest.getPassword();
        User user = userService.findByUsername(username);
        if (user != null && userService.checkPassword(password, user.getPassword())) {
            // Check if the user is a professor and if their approval is pending
            if (user.isPending()) {
                return ResponseEntity.status(403).body(new LoginResponse(false, "Please check your VT Email to complete registration.\n" +
                        "Check Junk or Spam Folder if it isn't in your Inbox.", "LOGGED_OUT"));
            }

            String token = jwtUtil.generateToken(username, user.getRole());
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            return ResponseEntity.ok().headers(headers).body(new LoginResponse(true, "Login Success!", user.getRole()));
        } else {
            return ResponseEntity.status(401).body(new LoginResponse(false, "Invalid credentials, please try again or sign up", "LOGGED_OUT"));
        }
    }

    @PostMapping("/signup")
    @ResponseBody
    @Transactional
    public ResponseEntity<SignupResponse> signup(@RequestBody SignUpRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new SignupResponse(false, "An account already exists with that Email."));
        }
        // Verify email for professors
        if (!signupRequest.getEmail().endsWith("@vt.edu")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SignupResponse(false, "Email must be a valid VT email, ending with @vt.edu"));
        }

        User newUser = new User();
        newUser.setUsername(signupRequest.getUsername().toLowerCase());
        newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        newUser.setRole(signupRequest.getRole().toUpperCase());
        newUser = userRepository.save(newUser);

        if ("PROFESSOR".equalsIgnoreCase(newUser.getRole())) {
            Professor professor = new Professor();
            professor.setUser(newUser);
            professor.setFirstName(signupRequest.getFirstName());
            professor.setLastName(signupRequest.getLastName());
            professor.setEmail(signupRequest.getEmail().toLowerCase());
            professor.setCollege(collegeRepository.findById(signupRequest.getCollegeId()).orElse(null)); // Handle null appropriately
            professorRepository.save(professor);


            // Handle lab creation
            if (signupRequest.getLabName() != null && signupRequest.getLabUrl() != null && signupRequest.getLabDescription() != null) {
                Lab lab = new Lab();
                lab.setName(signupRequest.getLabName());
                lab.setUrl(signupRequest.getLabUrl());
                lab.setDescription(signupRequest.getLabDescription());
                lab.setPrincipleInvestigator(professor.getFirstName() + " " + professor.getLastName());
                lab.setMajor(majorRepository.findById(signupRequest.getMajorId()).orElse(null));
                lab = labRepository.save(lab);
                // Associate lab with professor
                professor.setLab(lab);
                professorRepository.save(professor);
                //labService.createLab(lab, professor.getFirstName(), professor.getLastName(), signupRequest.getCollegeId());
            }
        } else if ("STUDENT".equalsIgnoreCase(newUser.getRole())) {
            Student student = new Student();
            student.setUser(newUser);
            student.setFirstName(signupRequest.getFirstName());
            student.setLastName(signupRequest.getLastName());
            student.setEmail(signupRequest.getEmail().toLowerCase());
            student.setYear(signupRequest.getYear());
            student.setMajor(majorRepository.findById(signupRequest.getMajorId()).orElse(null)); // Handle null appropriately
            student.setAboutMe(signupRequest.getAboutMe());
            studentRepository.save(student);
        }

        // Generate the signup token
        String signupToken = jwtUtil.generateSignupToken(signupRequest.getEmail().toLowerCase());
        // Construct the confirmation link
        String apiLink = apiLinkBase + signupToken;
        // Construct the email body
        String emailBody = "<p>Congratulations on your successful signup!</p>" +
                "<p>Please <a href=\"" + apiLink + "\">click here</a> to complete your registration</p>";
        // Send the email
        emailService.sendEmail(
                signupRequest.getEmail().toLowerCase(),
                "Welcome to VT Research Connect",
                emailBody
        );

        return ResponseEntity.ok(new SignupResponse(true, "Signup successful"));
    }

    @GetMapping("/confirmation/{token}")
    @ResponseBody
    @Transactional
    public ResponseEntity<SignupResponse> confirmation(@PathVariable String token) {
        try {

            System.out.println("Received Token: " + token);
            // Extract username from the token
            String username = jwtUtil.extractUsername(token);
            // Validate the token
            if (jwtUtil.validateToken(token, username)) {
                // Token is valid, find the user by username
                User user = userRepository.findByUsername(username);
                if (user != null && user.isPending()) {
                    // Update pending status
                    user.setPending(false);
                    userRepository.save(user);
                    jwtUtil.invalidateToken(token);
                    // Return success response
                    return ResponseEntity.ok(new SignupResponse(true, "Confirmation successful, pending status updated"));
                } else {
                    // User not found or already confirmed
                    return ResponseEntity.ok(new SignupResponse(false, "User not found or already confirmed"));
                }
            } else {
                // Token is invalid or expired, return failure response
                return ResponseEntity.ok(new SignupResponse(false, "Invalid or expired token"));
            }
        } catch (Exception e) {
            // Handle any exceptions (e.g., token parsing errors)
            return ResponseEntity.ok(new SignupResponse(false, "Invalid token"));
        }
    }


    // Helper class to map login request JSON body
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private Boolean success;
        private String message;
        private String role;

        public LoginResponse(Boolean success, String message, String role) {
            this.success = success;
            this.message = message;
            this.role = role;
        }

        public Boolean getSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public String getRole() {
            return role;
        }
    }


    public static class SignupResponse {
        private Boolean success;
        private String message;

        public SignupResponse(Boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public Boolean getSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }
    }
}
