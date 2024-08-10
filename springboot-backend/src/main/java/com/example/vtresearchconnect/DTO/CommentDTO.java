package com.example.vtresearchconnect.DTO;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentDTO {
    private Long id;
    private String content;
    private Timestamp createdAt;
    private String studentName;

    // Constructor with all fields
    public CommentDTO(Long id, String content, Timestamp createdAt, String studentName) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.studentName = studentName;
    }

    // Default constructor
    public CommentDTO() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
