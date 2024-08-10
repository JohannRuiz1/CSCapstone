package com.example.vtresearchconnect.DTO;


public class SignUpRequest {
    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
    private String year; // For students, values like "freshman", "sophomore", etc.
    private Long majorId; // ID for the major, applicable for students
    private Long collegeId; // ID for the college, applicable for professors
    private String aboutMe;
    private String labName;
    private String labUrl;
    private String labDescription;
    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getLabUrl() {
        return labUrl;
    }

    public void setLabUrl(String labUrl) {
        this.labUrl = labUrl;
    }

    public String getLabDescription() {
        return labDescription;
    }

    public void setLabDescription(String labDescription) {
        this.labDescription = labDescription;
    }

    // Default constructor
    public SignUpRequest() {
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public Long getMajorId() {
        return majorId;
    }

    public void setMajorId(Long majorId) {
        this.majorId = majorId;
    }

    public Long getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(Long collegeId) {
        this.collegeId = collegeId;
    }
    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }
    // toString method for debugging purposes
    @Override
    public String toString() {
        return "SignupRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", year='" + year + '\'' +
                ", majorId=" + majorId +
                ", collegeId=" + collegeId +
                ", aboutMe='" + aboutMe + '\'' +
                '}';
    }
}

