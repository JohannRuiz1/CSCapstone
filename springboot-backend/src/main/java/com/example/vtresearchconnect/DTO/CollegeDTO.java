package com.example.vtresearchconnect.DTO;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CollegeDTO {
    private Long id;
    private String name;
    private List<MajorDTO> majors; 

    public CollegeDTO(){

    }

    public CollegeDTO(Long id, String name){
        this.id = id;
        this.name = name;
        this.majors = null;
    }

    public CollegeDTO(Long id, String name, List<MajorDTO> majors){
        this.id = id;
        this.name = name;
        this.majors = majors;
    }

    // Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MajorDTO> getMajors() {
        return majors;
    }

    public void setMajors(List<MajorDTO> majors){
        this.majors = majors;
    }
}
