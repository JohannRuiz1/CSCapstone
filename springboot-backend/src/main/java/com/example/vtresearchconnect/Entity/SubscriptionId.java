package com.example.vtresearchconnect.Entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class SubscriptionId implements Serializable {

    private Long studentId;
    private Long labId;

    public SubscriptionId(){
        
    }

    public SubscriptionId(long studentId, long labId){
        this.studentId =  studentId;
        this.labId = labId;
    }

    // Getters and Setters, equals() and hashCode()
    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getLabId() {
        return labId;
    }

    public void setLabId(Long labId) {
        this.labId = labId;
    }
}
