package com.traveloop.controller;

import com.traveloop.dto.LoginRequest;
import com.traveloop.dto.RegisterRequest;
import com.traveloop.entity.User;
import com.traveloop.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email already exists"));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(Integer.toHexString(request.getPassword().hashCode()));
        user.setFullName(request.getFullName());

        User saved = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("username", saved.getUsername());
        response.put("email", saved.getEmail());
        response.put("fullName", saved.getFullName());
        response.put("message", "Registration successful");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .map(user -> {
                    String hash = Integer.toHexString(request.getPassword().hashCode());
                    if (!hash.equals(user.getPasswordHash())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body((Object) Map.of("error", "Invalid credentials"));
                    }
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", user.getId());
                    response.put("username", user.getUsername());
                    response.put("email", user.getEmail());
                    response.put("fullName", user.getFullName());
                    response.put("message", "Login successful");
                    return ResponseEntity.ok((Object) response);
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid credentials")));
    }
}
