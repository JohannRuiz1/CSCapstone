package com.example.vtresearchconnect.Controller;

import com.example.vtresearchconnect.Service.SubscriptionService;
import com.example.vtresearchconnect.DTO.LabDTO;
import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Service.LabService;
import com.example.vtresearchconnect.Service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private LabService labService;

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribeToLab(@RequestParam Long studentId, @RequestParam String labName) {
        StudentDTO studentDTO = studentService.getStudentById(studentId);
        LabDTO labDTO = labService.getLabByName(labName);
        if (studentDTO != null && labDTO != null) {
            Long labId = labDTO.getId();
            subscriptionService.addSubscription(studentId, labId);

            return ResponseEntity.ok("Successfully subscribed.");
        } else {
            return ResponseEntity.badRequest().body("Student or Lab not found.");
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribeFromLab(@RequestParam Long studentId, @RequestParam String labName) {
        if (studentService.existsById(studentId) && labService.existsByName(labName)) {
            Long labId = labService.getLabByName(labName).getId();
            subscriptionService.removeSubscription(studentId, labId);
            return ResponseEntity.ok("Successfully unsubscribed.");

        } else {
            return ResponseEntity.badRequest().body("Student or Lab not found.");
        }
    }
}
