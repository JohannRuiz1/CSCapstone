package com.example.vtresearchconnect.Service;

import com.example.vtresearchconnect.Entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        System.out.println("Fetched user from database: " + user);
        return user;

    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


}
