package com.example.vtresearchconnect.DTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LabDTO {
    private Long id;
    private String name;
    private String url;
    private String principleInvestigator;
    private String description;
    private MajorDTO major;

    // private String major;
    // private String college;

    public LabDTO() {
        // Default constructor required by Jackson
    }

    public LabDTO(Long id, String name, String url, String principleInvestigator, MajorDTO major, String description) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.principleInvestigator = principleInvestigator;
        this.major = major;
        this.description = description;
        // this.college = college;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPrincipleInvestigator() {
        return principleInvestigator;
    }

    public void setPrincipleInvestigator(String principleInvestigator) {
        this.principleInvestigator = principleInvestigator;
    }

    public MajorDTO getMajor(){
        return major;
    }

    public void setMajor(MajorDTO major){
        this.major = major;
    }

    // public String getMajorName() {
    //     return major;
    // }

    // public void setMajorName(String majorName) {
    //     this.major = majorName;
    // }

    // public String getCollegeName() {
    //     return college;
    // }

    // public void setCollegeName(String collegeName) {
    //     this.college = collegeName;
    // }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
