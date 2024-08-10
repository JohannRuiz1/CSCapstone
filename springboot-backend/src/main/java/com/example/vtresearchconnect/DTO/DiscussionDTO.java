package com.example.vtresearchconnect.DTO;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiscussionDTO {

    private Long id;
    private String title;
    private String content;
    private int numberOfComments;
    private Timestamp createdAt;
    private String labName;
    private StudentDTO student;
    
    private List<CommentDTO> comments;

    public DiscussionDTO(){

    }
    // Constructor with all fields
    public DiscussionDTO(Long id, String title, String content, Timestamp createdAt, String labName, StudentDTO student, List<CommentDTO> comments) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.labName = labName;
        this.student = student;
        this.comments = comments;
        numberOfComments = comments.size();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfComments(){
        return numberOfComments;
    }

    public void setNumberOfComments(int numberOfComments){
        this.numberOfComments = numberOfComments;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student= student;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }
}