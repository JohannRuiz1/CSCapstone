package com.example.vtresearchconnect.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfessorDTO {
    // Getters and Setters
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String college; // Representing College as a String
    private LabDTO lab;
    private Long userId;


    public ProfessorDTO() {
    }

    public ProfessorDTO(Long id, String firstName, String lastName, String email, String college, LabDTO lab, Long userId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.college = college;
        this.lab = lab;
        this.userId = userId;
    }

    public ProfessorDTO(Long id, String firstName, String lastName, String email, String college) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.college = college;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public LabDTO getLab(){
        return lab;
    }

    public void setLab(LabDTO lab){
        this.lab = lab;
    }
}
