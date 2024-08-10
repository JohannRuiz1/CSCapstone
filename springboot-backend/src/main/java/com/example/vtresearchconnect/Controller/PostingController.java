package com.example.vtresearchconnect.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.vtresearchconnect.DTO.PostingDTO;
import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Service.EmailService;
import com.example.vtresearchconnect.Service.PostingService;
import com.example.vtresearchconnect.Service.StudentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/postings")
public class PostingController {

    @Autowired
    private PostingService postingService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailService emailService;

    // Get all postings
    @GetMapping
    public List<PostingDTO> getAllPostings() {
        var postings = postingService.findAllPostings();
        return postings.stream()
            .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
            .collect(Collectors.toList());
    }

    // Get a single posting by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostingDTO> getPostingById(@PathVariable Long id) {
        PostingDTO posting = postingService.findPostingById(id);
        return ResponseEntity.ok(posting);
    }

    // Create a new posting
    @PostMapping
    public ResponseEntity<PostingDTO> createPosting(@RequestBody PostingDTO postingDTO) {
        String labName = postingDTO.getLabName();

        List<StudentDTO> students = studentService.getAllStudents();
        for(StudentDTO student: students){
            if(student.getSubscriptions().contains(labName)){
                String emailBody = "<p> " + labName + " had a posting created titled " + postingDTO.getName() + "</p>";
                emailService.sendEmail(
                    student.getEmail().toLowerCase(),
                    "VT Research Connect Subscription Notification: Posting",
                    emailBody
                );
            }
        }

        PostingDTO createdPosting = postingService.createPosting(postingDTO);
        return ResponseEntity.ok(createdPosting);
    }

    // Update an existing posting
    @PutMapping("/{id}")
    public ResponseEntity<PostingDTO> updatePosting(@PathVariable Long id, @RequestBody PostingDTO postingDTO) {
        PostingDTO updatedPosting = postingService.updatePosting(id, postingDTO);
        return ResponseEntity.ok(updatedPosting);
    }

    // Delete a posting
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePosting(@PathVariable Long id) {
        postingService.deletePosting(id);
        return ResponseEntity.ok().build();
    }
}
