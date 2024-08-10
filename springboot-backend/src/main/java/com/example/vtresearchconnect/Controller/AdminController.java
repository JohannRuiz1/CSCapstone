package com.example.vtresearchconnect.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.example.vtresearchconnect.DTO.ProfessorDTO;
import com.example.vtresearchconnect.Entity.Professor;
import com.example.vtresearchconnect.Entity.Student;
import com.example.vtresearchconnect.Entity.User;
import com.example.vtresearchconnect.Repository.ProfessorRepository;
import com.example.vtresearchconnect.Repository.StudentRepository;
import com.example.vtresearchconnect.Repository.UserRepository;
import com.example.vtresearchconnect.Service.LabService;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LabService labService;

    @DeleteMapping("/users/{id}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if ("PROFESSOR".equalsIgnoreCase(user.getRole())) {
            Professor professor = professorRepository.findByUserId(user.getId());
            if (professor != null && professor.getLab() != null) {
                labService.deleteLabById(professor.getLab().getId());
            }
            professorRepository.delete(professor); // Ensure professor is deleted
        } else if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            Student student = studentRepository.findByUserId(user.getId());
            studentRepository.delete(student); // Ensure student is deleted
        }

        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }

}
