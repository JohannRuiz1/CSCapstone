package com.example.vtresearchconnect.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok annotation to generate getters, setters, and other methods
@Entity
@Table(name = "professor")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
