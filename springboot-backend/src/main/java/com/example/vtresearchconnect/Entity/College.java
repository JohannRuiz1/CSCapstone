package com.example.vtresearchconnect.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "college")
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
}
