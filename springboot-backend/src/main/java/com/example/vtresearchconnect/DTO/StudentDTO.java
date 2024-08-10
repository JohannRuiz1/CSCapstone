package com.example.vtresearchconnect.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StudentDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String year;
    private String aboutMe;
    private MajorDTO major;
    private List<String> subscriptions;
    private Long userId;

    public StudentDTO() {
    }

    public StudentDTO(Long id, String firstName, String lastName, String email, String year, String aboutMe, MajorDTO major, List<String> subscriptions, Long userId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.year = year;
        this.aboutMe = aboutMe;
        this.major = major;
        this.subscriptions = subscriptions;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public MajorDTO getMajor() {
        return major;
    }

    public void setMajor(MajorDTO major){
        this.major = major;
    }

    public List<String> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<String> subscriptions) {
        this.subscriptions = subscriptions;
    }


}