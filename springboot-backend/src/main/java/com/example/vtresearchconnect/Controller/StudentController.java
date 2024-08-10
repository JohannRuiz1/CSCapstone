package com.example.vtresearchconnect.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<StudentDTO> getAllStudents() {
        List<StudentDTO> students = studentService.getAllStudents();
        return students;
    }

    @GetMapping("/fullname/{studentName}")
    public StudentDTO getStudentByFullName(@PathVariable("studentName") String studentName) {
        return studentService.getStudentByFullName(studentName);
    }

    @GetMapping("/email/{email}")
    public StudentDTO getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    @GetMapping("/id/{id}")
    public StudentDTO getStudentById(@PathVariable long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping("/add")
    public long addStudent(@RequestBody StudentDTO studentDTO) {
        return studentService.addStudent(studentDTO); // Assuming you have a method in your service layer to add a discussion
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable long id, @RequestBody StudentDTO studentDTO) {
        StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO);
        if (updatedStudent != null) {
            return ResponseEntity.ok(updatedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
