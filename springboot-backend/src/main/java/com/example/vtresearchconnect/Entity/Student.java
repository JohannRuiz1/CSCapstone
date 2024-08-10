package com.example.vtresearchconnect.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok annotation to generate getters, setters, and other methods
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "year", nullable = false)
    private String year;

    @Column(name = "about_me", columnDefinition = "TEXT")
    private String aboutMe;

    @ManyToOne
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
