package com.example.vtresearchconnect.DTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MajorDTO {
    private Long id;
    private String name;
    private String college;


    public MajorDTO(){

    }

    public MajorDTO(Long id, String name){
        this.id = id;
        this.name = name;
    }

    public MajorDTO(Long id, String name, String college){
        this.id = id;
        this.name = name;
        this.college = college;
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

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }
}
