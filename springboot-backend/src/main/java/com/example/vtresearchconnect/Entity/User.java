package com.example.vtresearchconnect.Entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity(name = "app_user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    @Column(name = "role")
    private String role;

    @Column(name = "pending", nullable = false)
    private boolean pending = true;

}
