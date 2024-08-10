package com.example.vtresearchconnect.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.CommentDTO;
import com.example.vtresearchconnect.DTO.DiscussionDTO;
import com.example.vtresearchconnect.DTO.StudentDTO;
import com.example.vtresearchconnect.Entity.Comment;
import com.example.vtresearchconnect.Entity.Discussion;
import com.example.vtresearchconnect.Entity.Lab;
import com.example.vtresearchconnect.Entity.Student;
import com.example.vtresearchconnect.Repository.CommentRepository;
import com.example.vtresearchconnect.Repository.DiscussionRepository;
import com.example.vtresearchconnect.Repository.LabRepository;
import com.example.vtresearchconnect.Repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiscussionService {

    @Autowired
    private DiscussionRepository discussionRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;

    public DiscussionDTO getDiscussionById(long id){
        Discussion discussion = discussionRepository.findById(id).get();
        return mapDiscussionToDTO(discussion);
    }

    public List<DiscussionDTO> getAllDiscussionsWithComments() {
        List<Discussion> discussions = discussionRepository.findAll();
        return discussions.stream()
                .map(this::mapDiscussionToDTO)
                .collect(Collectors.toList());
    }

    private DiscussionDTO mapDiscussionToDTO(Discussion discussion) {
        List<CommentDTO> commentDTOs = discussion.getComments().stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getCreatedAt(),
                        comment.getStudent().getFirstName() + " " + comment.getStudent().getLastName() // Assuming Student entity has a 'name' property
                ))
                .collect(Collectors.toList());

        StudentDTO student = studentService.mapStudentToDTO(discussion.getStudent());

        return new DiscussionDTO(
                discussion.getId(),
                discussion.getTitle(),
                discussion.getContent(),
                discussion.getCreatedAt(),
                discussion.getLab().getName(), // Assuming Lab entity has a 'name' property
                student, // Assuming Student entity has a 'name' property
                commentDTOs
        );
    }

     public long addDiscussion(DiscussionDTO discussionDTO) {
        Discussion discussion = new Discussion();
        discussion.setTitle(discussionDTO.getTitle());
        discussion.setContent(discussionDTO.getContent());
        discussion.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // Fetch Lab entity by labName
        Lab lab = labRepository.findByName(discussionDTO.getLabName());
        if (lab == null) {
            throw new EntityNotFoundException("Lab with name " + discussionDTO.getLabName() + " not found");
        }
        discussion.setLab(lab);

        Student student = studentRepository.findByFirstNameAndLastName(discussionDTO.getStudent().getFirstName(), discussionDTO.getStudent().getLastName());
        if (student == null) {
            throw new EntityNotFoundException("Student with name " + discussionDTO.getStudent().getFirstName() + " " + discussionDTO.getStudent().getLastName() +" not found");
        }
        discussion.setStudent(student);

        return discussionRepository.save(discussion).getId();
    }

    public void addComment(CommentDTO commentDTO, long discussionId){
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setDiscussionId(discussionId);
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // Fetch Student entity by studentName
        String[] names = commentDTO.getStudentName().split(" ", 2);
        Student student = studentRepository.findByFirstNameAndLastName(names[0], names[1]);

        if (student == null) {
            throw new EntityNotFoundException("Student with name " + commentDTO.getStudentName() + " not found");
        }
        comment.setStudent(student);

        commentRepository.save(comment);

    }

    @Transactional
    public void deleteComment(long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found with id: " + commentId));
        commentRepository.delete(comment);
    }

    public void deleteDiscussion(long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Discussion not found with id: " + id));
        discussionRepository.delete(discussion);
    }


}
