package com.example.vtresearchconnect.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.vtresearchconnect.DTO.MajorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Entity.Major;
import com.example.vtresearchconnect.Entity.Student;
import com.example.vtresearchconnect.Repository.MajorRepository;
import com.example.vtresearchconnect.Repository.StudentRepository;
import com.example.vtresearchconnect.Repository.SubscriptionRepository;


@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MajorRepository majorRepository;

    @Autowired
    private MajorService majorService;

    @Autowired
    private LabService labService;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public StudentDTO getStudentById(long id) {
        Student student = studentRepository.findById(id).get();
        return mapStudentToDTO(student);
    }

    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(this::mapStudentToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentByFullName(String studentName) {
        String[] names = studentName.split(" ", 2);
        if (names.length < 2) {
            return null;
        }
        Student student = studentRepository.findByFirstNameAndLastName(names[0], names[1]);
        return mapStudentToDTO(student);
    }

    public StudentDTO getStudentByEmail(String email) {
        Student student = studentRepository.findByEmail(email);
        if (student != null) {
            return mapStudentToDTO(student);
        } else {
            return null;
        }
    }

    public long addStudent(StudentDTO studentDTO) {
        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        student.setYear(studentDTO.getYear());
        student.setAboutMe(studentDTO.getAboutMe());

        Major major = majorRepository.findByName(studentDTO.getMajor().getName());
        student.setMajor(major);
        return studentRepository.save(student).getId();
    }

    public boolean existsById(long id){
        return studentRepository.existsById(id);
    }

    public StudentDTO mapStudentToDTO(Student student) {
        List<Long> subscriptionLabIds  = subscriptionRepository.findByStudentId(student.getId()).stream()
                .map(subscription -> subscription.getLab().getId())
                .collect(Collectors.toList());

        List<String> subscriptionLabNames = new ArrayList<String>();
        for(long id: subscriptionLabIds){
            subscriptionLabNames.add(labService.findLabById(id).getName());
        }

                
        return new StudentDTO(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getYear(),
                student.getAboutMe(),
                majorService.mapMajorToDTO(student.getMajor()),
                subscriptionLabNames,
                student.getUser().getId()
        );
    }


    // Update method to handle student profile updates
    public StudentDTO updateStudent(long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student != null) {
            student.setYear(studentDTO.getYear());
            student.setAboutMe(studentDTO.getAboutMe());

            if (studentDTO.getMajor() != null) {
                Major major = majorRepository.findById(studentDTO.getMajor().getId()).orElse(null);
                student.setMajor(major);
            }

            studentRepository.save(student);
            return mapStudentToDTO(student);
        }
        return null;
    }

}
