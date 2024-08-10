package com.example.vtresearchconnect.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.vtresearchconnect.DTO.CommentDTO;
import com.example.vtresearchconnect.DTO.DiscussionDTO;
import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Service.DiscussionService;
import com.example.vtresearchconnect.Service.EmailService;
import com.example.vtresearchconnect.Service.StudentService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<DiscussionDTO> getAllDiscussionsWithComments() {
        List<DiscussionDTO> discussions = discussionService.getAllDiscussionsWithComments();
        return discussions.stream()
            .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
            .collect(Collectors.toList());
    }

    @GetMapping("/id/{id}")
    public DiscussionDTO getDiscussionById(@PathVariable long id) {
        return discussionService.getDiscussionById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addDiscussion(@RequestBody DiscussionDTO discussionDTO) {
        try{
            discussionService.addDiscussion(discussionDTO); // Assuming you have a method in your service layer to add a discussion
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }

        String labName = discussionDTO.getLabName();

        List<StudentDTO> students = studentService.getAllStudents();
        for(StudentDTO student: students){
            if(student.getSubscriptions().contains(labName) && student.getId() != discussionDTO.getStudent().getId()){
                String emailBody = "<p> " + labName + " had a discussion created by " + discussionDTO.getStudent().getFirstName() + " " + discussionDTO.getStudent().getLastName()+ "!</p>";
                emailService.sendEmail(
                    student.getEmail().toLowerCase(),
                    "VT Research Connect Subscription Notification: Discussion",
                    emailBody
                );
            }
        }


        return ResponseEntity.ok().build();
    }

    @PostMapping("/addComment/{discussionId}")
    public ResponseEntity<Void> addComment(@PathVariable long discussionId, @RequestBody CommentDTO commentDTO) {
        discussionService.addComment(commentDTO, discussionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable long id) {
        try {
            discussionService.deleteDiscussion(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long commentId) {
        try {
            discussionService.deleteComment(commentId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}